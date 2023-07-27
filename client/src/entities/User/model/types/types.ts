export type IUser = {
    isAuthorized: boolean,
    id: string,
    userName: string,
    email: string,
    createdAt: string
}

export type IUserSchema = {
    authData?: IUser,
    _inited: boolean
}