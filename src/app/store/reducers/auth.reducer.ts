import { createReducer, on } from '@ngrx/store';
import { handleAuthState, handleUserState } from '../actions/auth.action';

export const initialState = {
  isAuth: false,
  userId: '',
};

export const authReducer = createReducer(
  initialState,
  on(handleAuthState, (state, action) => ({
    ...state,
    isAuth: action.state,
  })),
  on(handleUserState, (state, action) => ({
    ...state,
    userId: action.state,
  }))
);
