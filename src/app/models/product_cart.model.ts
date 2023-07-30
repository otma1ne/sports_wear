import { Product } from './product.model';

export type ProductCart = Pick<Product, keyof Product> & { quantity: number };
