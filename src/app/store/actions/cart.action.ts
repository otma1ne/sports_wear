import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/shared/models/product';

export const handleCarteState = createAction(
  '[Cart Component] handleCartState',
  props<{ state: Product[] }>()
);
