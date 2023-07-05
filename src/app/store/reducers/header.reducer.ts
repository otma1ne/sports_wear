import { createReducer, on } from '@ngrx/store';
import { handleCartState, handleSearchState,  handleMenuState } from '../actions/header.action';

export const initialState = {
  isCartOpen: false,
  isSearchOpen: false,
  isMenuOpen: false,
};

export const headerReducer = createReducer(
  initialState,
  on(handleCartState, (state, action) => ({
    ...state,
    isCartOpen: action.state,
  })),
  on(handleSearchState, (state, action) => ({
    ...state,
    isSearchOpen: action.state,
  })),
  on(handleMenuState, (state, action) => ({
    ...state,
    isMenuOpen: action.state,
  }))
);
