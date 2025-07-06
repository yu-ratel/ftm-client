export interface TrendingPost {
  postId: number;
  ranking: number;
  title: string;
  viewCount: number;
  likeCount: number;
  scrapCount: number;
  imageUrl: string;
}

export interface TrendingUser {
  ranking: number;
  userId: number;
  userName: string;
  userImageUrl: string;
}

/**
 * 게시글 이미지 인터페이스
 */
export interface PostImage {
  postImageId: number;
  imageUrl: string;
}

/**
 * 작성자 정보 인터페이스
 */
export interface Writer {
  userId: number;
  nickname: string;
  imageUrl: string;
}

/**
 * 게시글 상품 이미지 인터페이스
 */
export interface PostProductImage {
  postProductImageId: number;
  imageUrl: string;
}

/**
 * 게시글 상품 인터페이스
 */
export interface PostProduct {
  postProductId: number;
  name: string;
  brand: string;
  hashTags: string[];
  postProductImage: PostProductImage;
}

/**
 * 게시글 상세 정보 인터페이스
 */
export interface PostDetail {
  postId: number;
  title: string;
  content: string;
  groomingCategory: string;
  hashTags: string[];
  viewCount: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  postImages: PostImage[];
  writer: Writer;
  postProducts: PostProduct[];
}
