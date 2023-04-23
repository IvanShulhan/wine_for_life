/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import orderService from '../../../services/order.service';
import { IOrder } from '../../../common/types/order.type';

export interface IOrderState {
  status: 'idle' | 'loading' | 'failed' | 'success';
}

const initialState: IOrderState = {
  status: 'idle'
};

export const makeOrder = createAsyncThunk('order/makeOrder', async (body: IOrder) => {
  await orderService.makeOrder(body);
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderStatus(state: IOrderState) {
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(makeOrder.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(makeOrder.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const { resetOrderStatus } = orderSlice.actions;
export const selectOrdertatus = (state: RootState) => state.order.status;
export default orderSlice.reducer;
