import { createReducer, on } from '@ngrx/store';
import { handleCarteState } from '../actions/cart.action';
import { Product } from 'src/app/models/product.model';

export interface State {
  cart: Product[];
}

export const initialState: State = {
  cart: [],
};

export const cartReducer = createReducer(
  initialState,
  on(handleCarteState, (state, action) => ({
    ...state,
    cart: action.state,
  }))
);
