export interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  images: string[];
  rating: number;
  isHot: boolean;
  onsale: boolean;
  salePercent?: number;
}
