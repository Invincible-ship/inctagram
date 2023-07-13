export type IUser = {
    id: string,
    userName: string,
    email: string,
    createdAt: string
}

export type IUserSchema = {
    authData?: IUser
}