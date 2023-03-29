import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface CounterState {
  goods: string[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  goods: ['aaa'],
  status: 'idle'
};

export const fetchGoods = createAsyncThunk(
  'counter/fetchCount',
  async () => {}
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(incrementAsync.pending, (state) => {})
  }
});

export const {} = counterSlice.actions;
export const selectCount = (state: RootState) => state.products.goods;
export default counterSlice.reducer;
