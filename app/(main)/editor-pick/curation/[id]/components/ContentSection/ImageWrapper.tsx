import Image from "next/image";

interface Props {
  src: string;
  className?: string;
}

export default function ImageWrapper({ src, className }: Props) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt="큐레이션 이미지"
        fill
        className="rounded-[20px] object-cover"
      />
    </div>
  );
}
