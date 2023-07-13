export type RegisterParamsType = {
    userName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};
export type RegisterResponseType = {
    id: string;
    userName: string;
    email: string;
    createdAt: string;
};
