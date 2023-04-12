/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IUpdateUser, IUser } from '../../../common/types/user.type';
import userService from '../../../services/user.service';

export interface userState {
  user: IUser | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: userState = {
  user: null,
  status: 'idle'
};

export const getUser = createAsyncThunk('user/getUser', async (id: number) => {
  const { data } = await userService.getUser(id);
  return data;
});

export const removeUser = createAsyncThunk('user/removeUser', async (id: number) => {
  await userService.removeAccount(id);
});

interface IUpdaterequest {
  id: number;
  body: IUpdateUser;
}

export const updateUser = createAsyncThunk('user/updateUser', async (params: IUpdaterequest) => {
  const { data } = await userService.updateUser(params.id, params.body);
  return data;
});

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(removeUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(removeUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeUser.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      });
  }
});

export const selectUser = (state: RootState) => state.user.user;
export const selectUserStatus = (state: RootState) => state.user.status;
export default authSlice.reducer;
