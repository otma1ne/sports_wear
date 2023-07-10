import { createReducer, on } from '@ngrx/store';
import { handleAuthState } from '../actions/auth.action';

export const initialState = {
  isAuth: false,
};

export const authReducer = createReducer(
  initialState,
  on(handleAuthState, (state, action) => ({
    ...state,
    isAuth: action.state,
  }))
);
