import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface AuthPageLogoImageProps {
  className?: string;
  src?: string;
  alt?: string;
}

export default function AuthPageLogoImage({
  className,
  src = "/no_bg_logo.png",
  alt = "",
}: AuthPageLogoImageProps) {
  return (
    <div
      className={twMerge(
        "mb-12 flex h-[204px] w-full max-w-[392px] items-center justify-center rounded-[12px] bg-gray-100",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={144}
        height={144}
        className="h-[144px] w-[144px] shrink-0 object-contain"
        priority
      />
    </div>
  );
}
