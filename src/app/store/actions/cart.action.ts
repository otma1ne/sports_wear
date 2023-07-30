import { createAction, props } from '@ngrx/store';
import { ProductCart } from 'src/app/models/product_cart.model';

export const handleCarteState = createAction(
  '[Cart Component] handleCartState',
  props<{ state: ProductCart[] }>()
);
