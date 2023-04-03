/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-function */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IProduct } from '../../../common/types/product.type';
import { STORAGE_KEYS } from '../../../common/consts';
import helperFuncs from '../../../common/utils/helper.funcs';

interface IBagItiem {
  product: IProduct;
  count: number;
}

export interface BagState {
  bagItems: IBagItiem[];
}

const initialState: BagState = {
  bagItems: helperFuncs.getLocalStorageData(STORAGE_KEYS.BAG)
};

export const bagSlice = createSlice({
  name: 'bag',
  initialState,
  reducers: {
    addToBag: (state: BagState, action: PayloadAction<{ item: IBagItiem }>) => {
      if (!action.payload.item.count) return;
      console.log(action.payload.item.product.id);

      const bagItem = state.bagItems.find((el) => el.product.id === action.payload.item.product.id);

      if (!bagItem) {
        state.bagItems.push(action.payload.item);
      } else {
        bagItem.count += action.payload.item.count;
      }

      localStorage.setItem(STORAGE_KEYS.BAG, JSON.stringify(state.bagItems));
    },
    removeFromBag: (state: BagState, action: PayloadAction<{ id: number }>) => {
      state.bagItems =
        state.bagItems?.filter((item) => item.product.id === action.payload.id) || null;

      localStorage.setItem(STORAGE_KEYS.BAG, JSON.stringify(state.bagItems));
    },
    changeCount: (state: BagState, action: PayloadAction<{ id: number; count: number }>) => {
      const item = state.bagItems?.find((item) => item.product.id === action.payload.id);
      if (item) {
        item.count = action.payload.count;
      }
    }
  }
});

export const { addToBag, removeFromBag } = bagSlice.actions;
export const selectBagItems = (state: RootState) => state.bag.bagItems;
export default bagSlice.reducer;
