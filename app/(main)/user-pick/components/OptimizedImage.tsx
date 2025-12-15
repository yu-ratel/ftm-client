"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  onLoad?: () => void;
  onError?: () => void;
  enableHoverEffect?: boolean;
  lazy?: boolean; // 레이지 로딩 옵션
}

export default function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  priority = false,
  className = "",
  objectFit = "cover",
  onLoad,
  onError,
  enableHoverEffect = false,
  lazy = true, // 기본값 true로 레이지 로딩 활성화
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority); // priority면 즉시 로딩
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer를 사용한 레이지 로딩
  useEffect(() => {
    if (priority || !lazy) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // 한번 로딩되면 observer 해제
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "200px", // 뷰포트 200px 전에 미리 로딩 시작 (부드러운 스크롤 경험)
        threshold: 0.01, // 1%만 보여도 로딩 시작
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority, lazy]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const objectFitClass =
    objectFit === "cover"
      ? "object-cover"
      : objectFit === "contain"
        ? "object-contain"
        : objectFit === "fill"
          ? "object-fill"
          : objectFit === "none"
            ? "object-none"
            : "object-scale-down";

  return (
    <div
      ref={containerRef}
      className="netflix-image-container group relative h-full w-full overflow-hidden"
    >
      {/* 로딩 스켈레톤 - 넷플릭스 스타일 */}
      {!isInView && (
        <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-br from-gray-200/60 via-gray-300/70 to-gray-200/60">
          <div className="netflix-shimmer absolute inset-0" />
        </div>
      )}


      {/* 에러 상태 */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <svg
              className="h-10 w-10 opacity-60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs font-medium">이미지 로드 실패</span>
          </div>
        </div>
      )}

      {/* 실제 이미지 - 넷플릭스 스타일 트랜지션 */}
      {!hasError && isInView && (
        <>
          <Image
            src={src}
            alt={alt}
            fill={fill}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            sizes={sizes}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            onLoad={handleLoad}
            onError={handleError}
            className={` ${className} ${objectFitClass} netflix-image ${isLoading ? "scale-105 opacity-0" : "scale-100 opacity-100"} ${enableHoverEffect ? "group-hover:scale-110" : ""} `}
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
          />
          {/* 호버 시 어두운 오버레이 (넷플릭스 스타일) */}
          {enableHoverEffect && (
            <div className="netflix-overlay pointer-events-none absolute inset-0 bg-black/0 transition-all duration-300 ease-out group-hover:bg-black/20" />
          )}
        </>
      )}

      <style jsx global>{`
        .netflix-image-container {
          background: linear-gradient(
            135deg,
            rgba(20, 20, 20, 0.1) 0%,
            rgba(30, 30, 30, 0.05) 100%
          );
        }

        .netflix-shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.03) 20%,
            rgba(255, 255, 255, 0.05) 40%,
            rgba(255, 255, 255, 0.03) 60%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 200% 100%;
          animation: netflix-shimmer 2s ease-in-out infinite;
        }

        @keyframes netflix-shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .netflix-image {
          transition:
            transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform, opacity;
        }

        .netflix-overlay {
          transition: background-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* 부드러운 하드웨어 가속 */
        .netflix-image,
        .netflix-overlay {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-font-smoothing: subpixel-antialiased;
        }
      `}</style>
    </div>
  );
}
