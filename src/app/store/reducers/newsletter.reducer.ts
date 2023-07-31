import { createReducer, on } from '@ngrx/store';
import { handleNewsletterState } from '../actions/newsletter.action';

export const initialState = {
  isNewsletterOpen: false,
};

export const newsletterReducer = createReducer(
  initialState,
  on(handleNewsletterState, (state, action) => ({
    ...state,
    isNewsletterOpen: action.state,
  })),
);
