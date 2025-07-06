import { useEffect } from "react";

export const useImageResize = () => {
  useEffect(() => {
    const addResizeHandles = () => {
      const images = document.querySelectorAll(".ProseMirror img");
      images.forEach((img) => {
        if (!img.parentElement?.classList.contains("image-resize-wrapper")) {
          wrapImageWithResizeHandles(img as HTMLImageElement);
        }
      });
    };

    const wrapImageWithResizeHandles = (img: HTMLImageElement) => {
      const wrapper = document.createElement("div");
      wrapper.className = "image-resize-wrapper";
      wrapper.style.position = "relative";
      wrapper.style.display = "inline-block";
      wrapper.style.maxWidth = "100%";

      // 이미지를 감싸기
      img.parentNode?.insertBefore(wrapper, img);
      wrapper.appendChild(img);

      // 리사이즈 핸들 생성
      const handles = ["nw", "ne", "sw", "se", "n", "s", "w", "e"];
      handles.forEach((direction) => {
        const handle = document.createElement("div");
        handle.className = `resize-handle ${direction}`;
        handle.style.cssText = `
          position: absolute;
          background: #3b82f6;
          border: 2px solid white;
          border-radius: 50%;
          width: 12px;
          height: 12px;
          opacity: 0;
          transition: opacity 0.2s ease;
          cursor: ${direction.includes("n") ? "n" : direction.includes("s") ? "s" : ""}${direction.includes("w") ? "w" : direction.includes("e") ? "e" : ""}-resize;
          z-index: 10;
        `;

        // 핸들 위치 설정
        if (direction.includes("n")) handle.style.top = "-6px";
        if (direction.includes("s")) handle.style.bottom = "-6px";
        if (direction.includes("w")) handle.style.left = "-6px";
        if (direction.includes("e")) handle.style.right = "-6px";
        if (direction === "n" || direction === "s") {
          handle.style.left = "50%";
          handle.style.transform = "translateX(-50%)";
        }
        if (direction === "w" || direction === "e") {
          handle.style.top = "50%";
          handle.style.transform = "translateY(-50%)";
        }

        wrapper.appendChild(handle);

        // 리사이즈 이벤트 핸들러
        let isResizing = false;
        let startX = 0;
        let startY = 0;
        let startWidth = 0;
        let startHeight = 0;

        handle.addEventListener("mousedown", (e) => {
          e.preventDefault();
          isResizing = true;
          startX = e.clientX;
          startY = e.clientY;
          startWidth = parseInt(
            document.defaultView?.getComputedStyle(img).width || "0"
          );
          startHeight = parseInt(
            document.defaultView?.getComputedStyle(img).height || "0"
          );

          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        });

        const handleMouseMove = (e: MouseEvent) => {
          if (!isResizing) return;

          const deltaX = e.clientX - startX;
          const deltaY = e.clientY - startY;
          let newWidth = startWidth;
          let newHeight = startHeight;

          // 방향에 따른 크기 조정
          if (direction.includes("e")) newWidth = startWidth + deltaX;
          if (direction.includes("w")) newWidth = startWidth - deltaX;
          if (direction.includes("s")) newHeight = startHeight + deltaY;
          if (direction.includes("n")) newHeight = startHeight - deltaY;

          // 최소/최대 크기 제한
          newWidth = Math.max(50, Math.min(800, newWidth));
          newHeight = Math.max(50, Math.min(600, newHeight));

          // 비율 유지는 모서리 핸들(대각선)에서만 적용
          const aspectRatio = startWidth / startHeight;
          const isCornerHandle = direction.length === 2; // nw, ne, sw, se는 길이가 2

          if (isCornerHandle) {
            // 모서리 핸들: 비율 유지하면서 크기 조정
            if (direction.includes("e") || direction.includes("w")) {
              newHeight = newWidth / aspectRatio;
            } else {
              newWidth = newHeight * aspectRatio;
            }
            // 비율 유지 후 다시 최소/최대 크기 제한 적용
            newWidth = Math.max(50, Math.min(800, newWidth));
            newHeight = Math.max(50, Math.min(600, newHeight));
          }
          // 가장자리 핸들(n, s, w, e)은 해당 방향만 조정하므로 추가 처리 없음

          img.style.width = `${newWidth}px`;
          img.style.height = `${newHeight}px`;
        };

        const handleMouseUp = () => {
          isResizing = false;
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
      });

      // 호버 시 핸들 표시
      wrapper.addEventListener("mouseenter", () => {
        wrapper.querySelectorAll(".resize-handle").forEach((handle) => {
          (handle as HTMLElement).style.opacity = "1";
        });
      });

      wrapper.addEventListener("mouseleave", () => {
        wrapper.querySelectorAll(".resize-handle").forEach((handle) => {
          (handle as HTMLElement).style.opacity = "0";
        });
      });
    };

    // 에디터 내용이 변경될 때마다 이미지 체크
    const observer = new MutationObserver(addResizeHandles);
    const editorElement = document.querySelector(".ProseMirror");
    if (editorElement) {
      observer.observe(editorElement, { childList: true, subtree: true });
    }

    // 초기 이미지들에 핸들 추가
    addResizeHandles();

    return () => {
      observer.disconnect();
    };
  }, []);
};
