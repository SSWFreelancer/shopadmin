export interface ProductImage {
  url: string;
  source: string;
}

export interface ProductSubcategory {
  title: string;
}
export interface Product {
  id: string;
  title: string;
  subcategory: ProductSubcategory;
  quantity: number;
  price: number;
  status: number;
  images: ProductImage[];
}
