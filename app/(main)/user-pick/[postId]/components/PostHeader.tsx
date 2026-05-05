import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { PostDetail } from "../../../types/PostType";
import { formatDate, formatImageUrl } from "../utils";
import { useBookmark } from "@/hooks/useBookmark";
import { useLike } from "@/hooks/useLike";
import { useAuthStore } from "@/stores/AuthStore";
import { openToast } from "@/utils/modal/OpenToast";
import { openConfirm } from "@/utils/modal/OpenConfirm";
import { openAlert } from "@/utils/modal/OpenAlert";
import { deletePost } from "../../../api/post";
import OptimizedImage from "../../components/OptimizedImage";

interface PostHeaderProps {
  postData: PostDetail;
}

const PostHeader = ({ postData }: PostHeaderProps) => {
  const { handleBookmark, isLoading: bookmarkLoading } = useBookmark();
  const { handleLike, isLoading: likeLoading } = useLike({
    postId: postData.postId,
  });
  const { user } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);
  console.log("postData", postData);

  // 북마크 핸들러 래핑
  const onBookmarkClick = () => {
    handleBookmark(postData.postId, postData.userBookmarkYn || false);
  };

  // 현재 사용자가 작성자인지 확인
  const isWriter = user && postData.writer.userId === user.id;

  // 수정 페이지로 이동
  const handleEdit = () => {
    router.push(`/user-pick/${postData.postId}/edit`);
  };

  // 게시글 삭제 (확인 → API 호출 → 캐시 무효화 → /user-pick 이동)
  const handleDelete = () => {
    if (isDeleting) return;

    openConfirm(
      "게시글을 삭제하시겠습니까?\n삭제한 게시글은 복구할 수 없습니다.",
      async () => {
        try {
          setIsDeleting(true);
          await deletePost(postData.postId);

          // 삭제된 상세 캐시는 즉시 제거 (재방문/뒤로가기 시 stale 표시 방지)
          queryClient.removeQueries({
            queryKey: ["post", String(postData.postId)],
          });

          // 목록/사이드바 쿼리 prefix 무효화 → mount 시 fresh fetch
          // active 쿼리는 즉시 refetch가 트리거되므로 await으로 완료 보장
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: ["userPickPopularPosts"] }),
            queryClient.invalidateQueries({ queryKey: ["userPickBiblePosts"] }),
            queryClient.invalidateQueries({ queryKey: ["userPickTopBookmarks"] }),
            queryClient.invalidateQueries({ queryKey: ["groomingStoryPosts"] }),
            queryClient.invalidateQueries({ queryKey: ["trendingPosts"] }),
            queryClient.invalidateQueries({ queryKey: ["trendingUsers"] }),
          ]);

          openToast("삭제 완료", "게시글이 삭제되었습니다.", 3000);
          // App Router 캐시까지 무효화한 뒤 목록으로 이동
          router.refresh();
          router.push("/user-pick");
        } catch (error) {
          console.error("게시글 삭제 실패:", error);
          openAlert("게시글 삭제에 실패했습니다. 다시 시도해주세요.");
        } finally {
          setIsDeleting(false);
        }
      },
      undefined,
      "삭제",
      "취소"
    );
  };

  // 공유하기: Web Share API 우선, 미지원시 클립보드 복사 fallback
  const handleShare = async () => {
    if (typeof window === "undefined") return;

    const shareUrl = window.location.href;
    const shareData: ShareData = {
      title: postData.title,
      text: postData.title,
      url: shareUrl,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        // 사용자가 공유 시트를 닫은 경우는 조용히 종료
        if ((error as Error).name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      openToast(
        "링크 복사 완료",
        "공유 링크가 클립보드에 복사되었습니다.",
        3000
      );
    } catch {
      openToast(
        "공유 실패",
        "링크 복사에 실패했습니다. 잠시 후 다시 시도해주세요.",
        3000
      );
    }
  };
  return (
    <>
      {/* 제목과 수정/삭제 버튼 */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-pretendard text-xl font-bold leading-tight tracking-normal text-primary sm:text-2xl">
          {postData.title}
        </h1>

        {/* 수정/삭제 버튼 - 작성자만 표시 */}
        {isWriter && (
          <div className="flex items-center gap-4">
            {/* 수정 버튼 */}
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-800"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              수정
            </button>

            {/* 삭제 버튼 */}
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3,6 5,6 21,6" />
                <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
              {isDeleting ? "삭제 중..." : "삭제"}
            </button>
          </div>
        )}
      </div>

      {/* 태그 섹션 */}
      <div className="mb-6 flex flex-wrap gap-1">
        {postData.hashtags.map((tag: string, index: number) => (
          <div
            key={index}
            className="relative flex flex-row items-center justify-center gap-3 rounded-md border border-solid border-[transparent] bg-[#e1e1e7] pb-1.5 pl-2 pr-2 pt-1.5"
          >
            <div className="relative text-left font-['Pretendard-Medium',_sans-serif] text-[10px] font-medium leading-none text-[#374254]">
              {tag}
            </div>
          </div>
        ))}
      </div>

      {/* 작성자 정보와 액션 버튼 */}
      <div className="mb-8 flex items-center justify-between">
        {/* 작성자 정보 */}
        <div className="flex items-center gap-3">
          {/* 프로필 이미지 */}
          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-[#d9d9d9]">
            {postData.writer.imageUrl && (
              <OptimizedImage
                src={formatImageUrl(postData.writer.imageUrl)}
                alt={postData.writer.nickname}
                fill
                objectFit="cover"
              />
            )}
          </div>

          {/* 작성자 정보 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium text-primary">
                {postData.writer.nickname}
              </span>
              <span className="text-sm text-secondary">
                {postData.groomingCategory}
              </span>
            </div>
            <span className="text-sm text-secondary">
              {formatDate(postData.createdAt)}
            </span>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex gap-2">
          {/* 좋아요 버튼 */}
          <button
            onClick={handleLike}
            className="flex flex-col items-center rounded p-2 hover:bg-gray-50"
            disabled={likeLoading}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={`${postData.userLikeYn ? "text-blue-600" : "text-[#374254]"}`}
            >
              <path
                d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                fill={postData.userLikeYn ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* <span className="text-xs text-gray-500">{postData.likeCount}</span> */}
          </button>

          {/* 스크랩 버튼 */}
          <button
            onClick={onBookmarkClick}
            className="flex flex-col items-center rounded p-2 hover:bg-gray-50"
            disabled={bookmarkLoading}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={`${postData.userBookmarkYn ? "text-blue-600" : "text-[#374254]"}`}
            >
              <path
                d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
                fill={postData.userBookmarkYn ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* 공유 버튼 */}
          <button
            type="button"
            onClick={handleShare}
            aria-label="공유하기"
            className="flex flex-col items-center rounded p-2 hover:bg-gray-50"
          >
            <Image src="/fi_upload.png" alt="공유" width={24} height={24} />
          </button>
        </div>
      </div>

      {/* 구분선 */}
      <hr className="mb-8 border-t border-gray-200" />
    </>
  );
};

export default PostHeader;
