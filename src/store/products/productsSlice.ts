/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-function */
import data from '../../data/data.json';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { IProduct } from '../../common/types/product.type';

export interface CounterState {
  products: IProduct[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  products: data,
  status: 'idle'
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(incrementAsync.pending, (state) => {})
  }
});

export const {} = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products.products;
export default productsSlice.reducer;
