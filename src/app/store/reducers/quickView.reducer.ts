import { createReducer, on } from '@ngrx/store';
import {
  handleAddedInfoState,
  handleQuickProductState,
  handleQuickViewState,
} from '../actions/quickView.action';

export const initialState = {
  showQuickView: false,
  showAddedInfo: false,
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
  })),
  on(handleAddedInfoState, (state, action) => ({
    ...state,
    showAddedInfo: action.state,
  }))
);
