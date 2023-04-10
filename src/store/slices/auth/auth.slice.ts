/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ILoginUser, IRegisterUser, IUser } from '../../../common/types/user.type';
import authSerivce from '../../../services/auth.service';
import { STORAGE_KEYS } from '../../../common/consts';

export interface authState {
  user: IUser | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: authState = {
  user: JSON.parse(localStorage.getItem(STORAGE_KEYS.TOKEN) || '[]'),
  status: 'idle'
};

export const registerUser = createAsyncThunk('auth/registerUser', async (body: IRegisterUser) => {
  const answer = await authSerivce.registerUser(body);

  return answer;
});

export const loginUser = createAsyncThunk('auth/loginUser', async (body: ILoginUser) => {
  const { data } = await authSerivce.loginUser(body);

  return data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      state.user = null;
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
      .addCase(registerUser.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const { logout } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export default authSlice.reducer;
