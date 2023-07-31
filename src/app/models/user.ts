import { Product } from './product.model';

export interface User {
  username: string;
  email: string;
  password: string;
  cart?: Array<{
    quantity: number;
    product: Product;
  }>;
}
