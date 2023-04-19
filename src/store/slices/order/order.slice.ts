/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import orderService from '../../../services/order.service';
import { IOrder } from '../../../common/types/order.type';

export interface orderState {
  status: 'idle' | 'loading' | 'failed';
}

const initialState: orderState = {
  status: 'idle'
};

export const makeOrder = createAsyncThunk('order/makeOrder', async (body: IOrder) => {
  const { data } = await orderService.makeOrder(body);

  return data;
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(makeOrder.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(makeOrder.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const selectOrdertatus = (state: RootState) => state.products.status;
export default orderSlice.reducer;
