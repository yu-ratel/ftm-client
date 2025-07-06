"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPostDetail } from "../../api/post";
import { PostDetail } from "../../types/PostType";
import {
  LoadingState,
  ErrorState,
  NotFoundState,
  PostHeader,
  PostContent,
  RecommendedProducts,
} from "./components";

interface PostDetailPageProps {
  params: {
    postId: string;
  };
}

const PostDetailPage = ({ params }: PostDetailPageProps) => {
  const { postId } = params;

  // TanStack Query를 사용한 게시글 상세 데이터 조회
  const {
    data: postData,
    isLoading,
    error,
  } = useQuery<PostDetail>({
    queryKey: ["post", postId],
    queryFn: () => getPostDetail(postId),
    enabled: !!postId, // postId가 있을 때만 쿼리 실행
  });

  // 로딩 상태
  if (isLoading) {
    return <LoadingState />;
  }

  // 에러 상태
  if (error) {
    return <ErrorState error={error} />;
  }

  // 데이터가 없는 경우
  if (!postData) {
    return <NotFoundState />;
  }

  return (
    <div className="mx-auto max-w-4xl bg-white p-6">
      <PostHeader postData={postData} />
      <PostContent postData={postData} />
      <RecommendedProducts postData={postData} />
    </div>
  );
};

export default PostDetailPage;
