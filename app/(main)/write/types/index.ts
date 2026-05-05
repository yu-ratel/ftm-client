export interface Product {
  id: number;
  img: string;
  brand: string;
  title: string;
  tags: string[];
  imageFile?: File; // 상품 이미지 파일 추가
  /** 수정 페이지 전용: 기존 상품 이미지 ID. 이미지 변경/삭제 시 deleteProductImageId 로 사용. */
  originalImageId?: number;
}

export interface ProductCategory {
  label: string;
  subcategories: string[];
}
