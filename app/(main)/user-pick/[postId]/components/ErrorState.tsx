import React from "react";

interface ErrorStateProps {
  error: Error | null;
}

const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="mx-auto max-w-4xl bg-white p-6">
      <div className="text-center">
        <h2 className="mb-2 text-xl font-bold text-red-600">
          게시글을 불러올 수 없습니다
        </h2>
        <p className="text-gray-600">
          {error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다."}
        </p>
      </div>
    </div>
  );
};

export default ErrorState;
