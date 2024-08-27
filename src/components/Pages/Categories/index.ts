export interface Subcategory {
  id: string;
  title: string;
  count: number;
}
export interface Category {
  id: string;
  title: string;
  subcategory: Subcategory[];
  count: number;
  isOpen?: boolean;
}
