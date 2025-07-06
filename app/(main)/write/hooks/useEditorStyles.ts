import { useEffect } from "react";

// Style injection function
const injectEditorStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
    /* 에디터 기본 스타일 */
    .custom-editor-class {
      font-family: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
      padding: 24px;
      height: 100%;
      line-height: 1.6;
      color: #333;
      font-size: 16px;
    }
    
    .custom-block-class {
      line-height: 1.6;
    }
    
    /* BlockNote 컨테이너 스타일 재설정 */
    .bn-container {
      border: none !important;
      box-shadow: none !important;
    }
    
    .bn-editor {
      outline: none !important;
      border: none !important;
    }
    
    .bn-editor:focus-within {
      outline: none !important;
    }
    
    /* ProseMirror 에디터 스타일 */
    .ProseMirror {
      outline: none !important;
      font-family: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #333;
      max-width: 100%;
      word-wrap: break-word;
    }
    
    /* 이미지 스타일 */
    .ProseMirror img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 12px 0;
      display: block;
      min-width: 50px;
      min-height: 50px;
      transition: outline 0.2s ease;
    }
    
    .image-resize-wrapper {
      position: relative;
      display: inline-block;
      max-width: 100%;
      margin: 12px 0;
    }
    
    .image-resize-wrapper img {
      display: block;
      border-radius: 8px;
      max-width: 100%;
      height: auto;
    }
    
    .image-resize-wrapper:hover img {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
    
    /* 헤딩 스타일 */
    .ProseMirror h1 {
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.25;
      margin: 24px 0 16px 0;
      color: #1a1a1a;
    }
    
    .ProseMirror h2 {
      font-size: 1.5rem;
      font-weight: 600;
      line-height: 1.3;
      margin: 20px 0 12px 0;
      color: #2a2a2a;
    }
    
    .ProseMirror h3 {
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.4;
      margin: 16px 0 8px 0;
      color: #3a3a3a;
    }
    
    .ProseMirror p {
      margin: 8px 0;
      line-height: 1.6;
    }
    
    .ProseMirror p.is-empty:first-child::before {
      content: "나만의 그루밍을 공유해보세요.";
      color: #9ca3af;
      float: left;
      height: 0;
      pointer-events: none;
    }
    
    /* 툴바 스타일 */
    .custom-toolbar {
      display: flex;
      align-items: center;
      padding: 16px 24px;
      background-color: #FFFFFF;
      border-radius: 12px;
      gap: 8px;
      width: 100%;
      max-width: 808px;
      margin: 0 auto 12px auto;
      box-shadow: none;
    }
    
    .toolbar-button {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 32px;
      height: 32px;
      padding: 0 6px;
      border: none;
      background: transparent;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      color: #374151;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    
    .toolbar-button:hover {
      background-color: #f3f4f6;
    }
    
    .toolbar-button.active {
      background-color: #dbeafe;
      color: #1d4ed8;
    }
    
    .toolbar-divider {
      width: 1px;
      height: 20px;
      background-color: #DDDDDD;
      margin: 0 12px;
    }
    
    /* 에디터 컨테이너 */
    .editor-container {
      width: 100%;
      max-width: 808px;
      height: 600px;
      border: 1px solid #DDDDDD;
      border-radius: 24px;
      overflow-y: auto;
      background-color: #FFFFFF;
      box-shadow: none;
      margin: 0 auto;
      position: relative;
      transition: all 0.2s ease;
    }
    
    /* 드래그 상태 스타일 */
    .editor-container.drag-active {
      border: 2px dashed #3b82f6;
      background-color: #eff6ff;
    }
    
    .editor-container.drag-active::before {
      content: "이미지를 여기에 드롭하세요";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #3b82f6;
      font-size: 18px;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.95);
      padding: 16px 24px;
      border-radius: 12px;
      z-index: 10;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .editor-container.drag-active::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(59, 130, 246, 0.05);
      border-radius: 24px;
      z-index: 5;
      pointer-events: none;
    }
    
    /* 스크롤바 스타일 */
    .editor-container::-webkit-scrollbar {
      width: 8px;
    }
    
    .editor-container::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    
    .editor-container::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 4px;
    }
    
    .editor-container::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
    
    /* 태그 영역 스크롤바 스타일 */
    .tag-scroll::-webkit-scrollbar {
      width: 4px;
    }
    
    .tag-scroll::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .tag-scroll::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 2px;
    }
    
    .tag-scroll::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }
    
    /* BlockNote 메뉴 숨기기 */
    .bn-slash-menu {
      display: none !important;
    }
    
    .bn-side-menu {
      display: none !important;
    }
  `;

  document.head.appendChild(style);
  return style;
};

export const useEditorStyles = () => {
  useEffect(() => {
    const style = injectEditorStyles();
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);
};
