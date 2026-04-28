"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SectionHeader from "@/app/(main)/components/header/SectionHeader";
import Button from "@/components/ui/Button";
import { EditInfoButton } from "../";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getUserInfo, useUpdateUserInfo } from "../../api";
import { HashTagInfo, UserInfoUpdateData } from "../../types";
import { AGE_OPTIONS } from "../../constants";
import SelectBox from "@/components/ui/SeletBox";
import { openToast } from "@/utils/modal/OpenToast";
import { formatImageUrl } from "@/app/(main)/user-pick/[postId]/utils";
import { useAuthStore } from "@/stores/AuthStore";
import { ROUTES } from "@/constants/routes";

const MAX_PROFILE_IMAGE_SIZE = 10 * 1024 * 1024;
const ALLOWED_PROFILE_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
];

export default function MyPageEditPage() {
  const { setUser, getUser } = useAuthStore();
  const queryClient = useQueryClient();
  const { data: userInfoData } = useSuspenseQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });
  const [selectedInterests, setSelectedInterests] = useState<HashTagInfo[]>(
    userInfoData.hashTagInfo
  );
  const router = useRouter();
  const { mutate: updateUserInfo } = useUpdateUserInfo();
  const { userNickname, ageInfo, imageUrl } = userInfoData;
  const [selectedAge, setSelectedAge] = useState<string>(ageInfo?.description);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>(
    formatImageUrl(imageUrl)
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!profileImagePreview.startsWith("blob:")) return;

    return () => {
      URL.revokeObjectURL(profileImagePreview);
    };
  }, [profileImagePreview]);

  const handleProfileImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!ALLOWED_PROFILE_IMAGE_TYPES.includes(file.type)) {
      openToast(
        "업로드 실패",
        "10MB 이하 PNG, JPG, SVG 파일만 업로드할 수 있습니다.",
        3000
      );
      e.target.value = "";
      return;
    }

    if (file.size > MAX_PROFILE_IMAGE_SIZE) {
      openToast("업로드 실패", "10MB 이하 파일만 업로드할 수 있습니다.", 3000);
      e.target.value = "";
      return;
    }

    setProfileImageFile(file);
    setProfileImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nickname = ((formData.get("nickname") as string) || "").trim();
    const payload: UserInfoUpdateData = {
      nickname: nickname || userNickname,
      age:
        AGE_OPTIONS.find((option) => option.description === selectedAge)
          ?.value || null,
      hashtags: selectedInterests
        .filter((tag) => tag.isSelected)
        .map((tag) => tag.value),
      imageAction: profileImageFile ? "UPLOAD" : undefined,
    };

    const requestData = new FormData();

    requestData.append(
      "data",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );

    if (profileImageFile) {
      requestData.append("imageFile", profileImageFile);
    }

    updateUserInfo(requestData, {
      onSuccess: async () => {
        const freshUserInfo = await queryClient.fetchQuery({
          queryKey: ["userInfo"],
          queryFn: getUserInfo,
        });
        const currentUser = getUser();

        if (currentUser) {
          setUser({
            ...currentUser,
            id: freshUserInfo.userId,
            nickname: freshUserInfo.userNickname,
            profileImageUrl: formatImageUrl(freshUserInfo.imageUrl),
          });
        }

        openToast("회원정보 수정 성공", "정상적으로 수정되었습니다.", 3000);
        router.back();
      },
      onError: () => {
        openToast(
          "회원정보 수정 실패",
          "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
          3000
        );
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-12">
      <SectionHeader title="회원정보 수정" />
      <section>
        <div className="flex gap-5">
          <div className="relative size-20 overflow-hidden rounded-full bg-gray-200">
            {profileImagePreview ? (
              <Image
                src={profileImagePreview}
                alt="profile"
                fill
                className="object-cover"
              />
            ) : null}
          </div>
          <h3 className="text-sm leading-6">
            프로필 사진 변경
            <p className="text-gray-500">
              10MB 이하 PNG, JPG, SVG를 올려주세요.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml"
              className="hidden"
              onChange={handleProfileImageChange}
            />
            <Button
              type="button"
              onClick={handleProfileImageUpload}
              className="mt-1 w-44 rounded-[10px] font-bold"
            >
              사진 업로드
            </Button>
          </h3>
        </div>
        <div className="flex w-full justify-end">
          <Link
            href={ROUTES.ACCOUNT_DELETE}
            className="w-fit text-end text-sm text-[#6f7c90] underline"
          >
            계정 삭제하기
          </Link>
        </div>
      </section>

      <section className="text-sm">
        {/* main section */}
        <div className="grid grid-cols-2 gap-x-12">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">유저네임*</h3>
            <input
              type="text"
              placeholder={userNickname}
              name="nickname"
              className="w-full rounded-md border border-gray-200 bg-gray-100/50 p-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">연령대</h3>
            <SelectBox
              selectedOption={selectedAge}
              onSelect={setSelectedAge}
              placeholder="연령대를 선택해주세요"
              options={AGE_OPTIONS.map((option) => option.description)}
            />
          </div>
        </div>

        {/* sub section */}
        <div className="mt-6">
          <h3 className="font-semibold">나의 구르밍 관심</h3>
          <div className="mt-2 grid grid-cols-2 gap-x-12 gap-y-2">
            {selectedInterests?.map((tag) => (
              <EditInfoButton
                key={tag.value}
                hashTagInfo={tag}
                onSelect={setSelectedInterests}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="flex justify-center text-sm">
        <Button type="submit" className="w-44 rounded-[10px] font-bold">
          저장하기
        </Button>
      </section>
    </form>
  );
}
