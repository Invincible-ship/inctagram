import { createSlice } from '@reduxjs/toolkit';
import { IUserSchema } from '@/entities/User/model/types/types';
import { signupThunk } from '@/features/auth/signup/model/signup';

const initialState: IUserSchema = {
  _inited: false,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action) => {},
    clearAuthData: state => {
      state.authData = undefined;
    },
  },
  extraReducers: builder => {},
});

export const userReducer = slice.reducer;
export const userThunks = {};
export const { setAuthData, clearAuthData } = slice.actions;
