import { createStore } from "redux";
import { combineReducers } from "redux";
import {
    personalInfoReducer,
} from "./reducers";
import {configureStore} from "@reduxjs/toolkit";

export const store = createStore(
    combineReducers({
        personalInfoReducer,
    })
);
