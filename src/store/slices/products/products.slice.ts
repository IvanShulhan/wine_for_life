/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IProduct } from '../../../common/types/product.type';
import productsService from '../../../services/products.service';
import products from '../../../data/data.json';

export interface productsState {
  products: IProduct[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: productsState = {
  products: [],
  status: 'idle'
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (queryParams?: string) => {
    const { data } = await productsService.getAllProducts(queryParams);

    return data;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = 'failed';
        state.products = products;
      });
  }
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsStatus = (state: RootState) => state.products.status;
export default productsSlice.reducer;
