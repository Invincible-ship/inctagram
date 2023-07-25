import {createSlice} from "@reduxjs/toolkit"


// const login = createAppAsyncThunk<LoginResponseType, LoginRequestType>("auth/login", async (arg, thunkAPI) => {
//   return thunkTryCatch(thunkAPI, async () => {
//     try {
//       const res = await authApi.login(arg)
//       authActions.setAccessToken(res.data.accessToken)
//     } catch (err) {
//       authActions.setUnauthorized(true)
//     }
//   })
// })


const slice = createSlice({
  name: "signIn",
  initialState: {
    isLoggedIn: false,
    // accessToken: '' as string,
    // unauthorized: true
  },
  reducers: {
    setIsLoggedIn: (state: { isLoggedIn: boolean }, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
  extraReducers: (builder) => {
  },
})

export const authReducer = slice.reducer
// export const authThunks = {register}
export const authActions = slice.actions
