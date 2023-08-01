import { createAction, props } from '@ngrx/store';

export const handleAuthState = createAction(
  '[Auth Component] handleAuthState',
  props<{ state: boolean }>()
);

export const handleUserState = createAction(
  '[Auth Component] handleUserState',
  props<{ state: string }>()
);
