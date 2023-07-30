import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';

export const handleCartState = createAction(
  '[Header Component] handleCartState',
  props<{ state: boolean }>()
);

export const handleSearchState = createAction(
  '[Header Component] handleSearchState',
  props<{ state: boolean }>()
);

export const handleMenuState = createAction(
  '[Header Component] handleMenuState',
  props<{ state: boolean }>()
);

export const handleLoginState = createAction(
  '[Header Component] handleLoginState',
  props<{ state: boolean }>()
);

export const handleRegisterState = createAction(
  '[Header Component] handleRegisterState',
  props<{ state: boolean }>()
);
