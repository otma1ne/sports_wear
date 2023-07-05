import { createAction, props } from '@ngrx/store';

export const handleNewsletterState = createAction(
  '[Header Component] handleNewsletterState',
  props<{ state: boolean }>()
);

