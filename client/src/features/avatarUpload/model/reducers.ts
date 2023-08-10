import * as actionTypes from "./actionTypes";

const initialPersonalInfoState = {
    personalInfo: {
        profileImg: "",
    },
};

export const personalInfoReducer = (
    state = initialPersonalInfoState,
    action
) => {
    switch (action.type) {
        case actionTypes.ADDPERSONALINFO:
            return {
                ...state,
                personalInfo: { ...state.personalInfo, ...action.payload },
            };
        default:
            return state;
    }
};