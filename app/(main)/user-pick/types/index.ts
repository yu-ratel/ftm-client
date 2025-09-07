/**
 * 유저픽 게시물 API 응답 데이터 (공통)
 */
export interface UserPickPost {
  ranking: number;
  postId: number;
  title: string;
  authorId: number;
  authorName: string;
  viewCount: number;
  likeCount: number;
  scrapCount: number;
  imageUrl: string;
  hashtags: string[];
}

/**
 * PostSection에서 사용하는 게시물 데이터 형태
 */
export interface PostData {
  id: number;
  title: string;
  image: string;
  author: string;
  likes: number;
  bookmarks: number;
  tags?: string[];
  ranking?: number;
}
