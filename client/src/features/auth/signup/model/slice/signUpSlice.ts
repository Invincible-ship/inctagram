import { createSlice } from '@reduxjs/toolkit';
import { signupThunk } from '@/features/auth/signup/model/signup';

const slice = createSlice({
  name: 'signup',
  initialState: {
    isLoading: false,
  },
  reducers: {
    dummyReducer: state => {
      return state;
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
