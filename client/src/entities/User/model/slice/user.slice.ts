import {createSlice} from "@reduxjs/toolkit"
import {IUserSchema} from "@/entities/User/model/types/types"


const initialState: IUserSchema = {
    authData: {
        id: "",
        userName: "",
        email: "",
        createdAt: ""
    }
}

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            state.authData = action.payload.signUpData
        }
    },
    extraReducers: (builder) => {
    }
})

export const userReducer = slice.reducer
export const userThunks = {}
export const userActions = slice.actions
