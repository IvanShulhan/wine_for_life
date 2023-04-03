import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from '../slices/products/products.slice';
import bagSlice from '../slices/bag/bag.slice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    bag: bagSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
