import { createAction, props } from '@ngrx/store';

export const handleAuthState = createAction(
  '[Header Component] handleCartState',
  props<{ state: boolean }>()
);
