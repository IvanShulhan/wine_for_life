/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { RootState } from '../../app/store';
import { ILoginUser, IRegisterUser, IUser } from '../../../common/types/user.type';
import authSerivce from '../../../services/auth.service';
import { STORAGE_KEYS } from '../../../common/consts';

export interface authState {
  user: IUser | null;
  status: 'idle' | 'loading' | 'failed';
}

const getUserFromToken = (srt: string): IUser | null => {
  return srt.length ? jwt_decode(srt) : null;
};

const initialState: authState = {
  user: getUserFromToken(localStorage.getItem(STORAGE_KEYS.TOKEN) || ''),
  status: 'loading'
};

export const registerUser = createAsyncThunk('auth/registerUser', async (body: IRegisterUser) => {
  await authSerivce.registerUser(body);
});

export const loginUser = createAsyncThunk('auth/loginUser', async (body: ILoginUser) => {
  const { data } = await authSerivce.loginUser(body);
  localStorage.setItem(STORAGE_KEYS.TOKEN, JSON.stringify(data.token));

  return getUserFromToken(data.token);
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      state.user = null;
    },
    resetAuthStatus: (state) => {
      state.status = 'loading';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const { logout, resetAuthStatus } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export default authSlice.reducer;
