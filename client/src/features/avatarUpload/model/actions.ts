import * as actionTypes from "./actionTypes";

export const addPersonalInfo = (details) => ({
    type: actionTypes.ADDPERSONALINFO,
    payload: details,
});