import { createReducer, on } from '@ngrx/store';
import {
  handleCartState,
  handleSearchState,
  handleMenuState,
  handleLoginState,
  handleRegisterState,
} from '../actions/header.action';

export const initialState = {
  isCartOpen: false,
  isSearchOpen: false,
  isMenuOpen: false,
  isLoginOpen: false,
  isRegisterOpen: false,
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
  })),
  on(handleLoginState, (state, action) => ({
    ...state,
    isLoginOpen: action.state,
  })),
  on(handleRegisterState, (state, action) => ({
    ...state,
    isRegisterOpen: action.state,
  }))
);
