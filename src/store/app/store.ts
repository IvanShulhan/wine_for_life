import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from '../slices/products/products.slice';
import bagReducer from '../slices/bag/bag.slice';
import authReducer from '../slices/auth/auth.slice';
import userReducer from '../slices/user/user.slice';
import orderReducer from '../slices/order//order.slice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    bag: bagReducer,
    auth: authReducer,
    user: userReducer,
    order: orderReducer
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
