import { createSlice } from '@reduxjs/toolkit';
import { signupThunk } from '@/features/auth/signup/model/signup';
import { ISignUpSchema } from '../types/types';

const initialState: ISignUpSchema = {
  isLoading: false
}

const slice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    dummyReducer: state => {
      return ;
    },
  },
  extraReducers: builder => {
    builder.addCase(signupThunk.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(signupThunk.fulfilled, state => {
      state.isLoading = false;
    });

    builder.addCase(signupThunk.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const signupReducer = slice.reducer;
