export interface Product {
  id: number;
  img: string;
  brand: string;
  title: string;
  tags: string[];
  imageFile?: File; // 상품 이미지 파일 추가
}

export interface ProductCategory {
  label: string;
  subcategories: string[];
}
