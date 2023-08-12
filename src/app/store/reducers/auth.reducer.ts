import { createReducer, on } from '@ngrx/store';
import {
  handleAuthState,
  handleEmailState,
  handleUserState,
  handleUsernameState,
} from '../actions/auth.action';

export const initialState = {
  isAuth: false,
  userId: '',
  email: '',
  username: '',
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
  })),
  on(handleUsernameState, (state, action) => ({
    ...state,
    username: action.state,
  })),
  on(handleEmailState, (state, action) => ({
    ...state,
    email: action.state,
  }))
);
