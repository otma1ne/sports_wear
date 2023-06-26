export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  images: string[];
  rating: number;
  isHot: boolean;
  isSale: boolean;
  salePercentage?: number;
}
