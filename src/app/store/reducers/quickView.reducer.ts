import { createReducer, on } from '@ngrx/store';
import {
  handleQuickProductState,
  handleQuickViewState,
} from '../actions/quickView.action';

export const initialState = {
  showQuickView: false,
  product: {},
};

export const quickViewReducer = createReducer(
  initialState,
  on(handleQuickViewState, (state, action) => ({
    ...state,
    showQuickView: action.state,
  })),
  on(handleQuickProductState, (state, action) => ({
    ...state,
    product: action.state,
  }))
);
