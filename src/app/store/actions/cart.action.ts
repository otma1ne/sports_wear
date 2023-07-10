import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product';

export const handleCarteState = createAction(
  '[Cart Component] handleCartState',
  props<{ state: Product[] }>()
);
