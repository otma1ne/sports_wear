export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  images: string[];
  rating: number;
  isHot: boolean;
  onsale: boolean;
  salePercentage?: number;
}
