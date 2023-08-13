import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';

export const handleQuickViewState = createAction(
  '[QuckView Component] handleQuickViewState',
  props<{ state: boolean }>()
);

export const handleQuickProductState = createAction(
  '[QuckView Component] handleQuickProductState',
  props<{ state: Product }>()
);

export const handleAddedInfoState = createAction(
  '[QuckView Component] handleAddedInfoState',
  props<{ state: boolean }>()
);
