import { ThunkConfig } from "@/providers/StoreProvider"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { clearAuthData, userApi } from "@/entities/User"
import { LOCAL_STORAGE_TOKEN_KEY } from "@/shared/const/localStorage"
import { isFetchBaseQueryError } from "@/shared/api/isFetchBaseQueryError"

export const signoutThunk = createAsyncThunk<void, void, ThunkConfig<string>>(
  'auth/logout',
  async (_, { dispatch }) => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
    dispatch(clearAuthData())
    
    try {
      await dispatch(
        userApi.endpoints.signout.initiate()
      ).unwrap()
    } catch(error) {
      if (isFetchBaseQueryError(error)) {
        if (typeof error.data === 'string') {
          throw new Error(error.data)
        }
      }

      throw new Error('Unknown error')
    }
  } 
)