import React from "react";

const NotFoundState = () => {
  return (
    <div className="mx-auto max-w-4xl bg-white p-6">
      <div className="text-center">
        <h2 className="mb-2 text-xl font-bold">게시글을 찾을 수 없습니다</h2>
        <p className="text-gray-600">요청하신 게시글이 존재하지 않습니다.</p>
      </div>
    </div>
  );
};

export default NotFoundState;
