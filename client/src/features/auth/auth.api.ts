import {AuthInstance} from "@/features/auth/auth.instance";


export const authApi = {
  register: (data: RegisterParamsType) => {
    return AuthInstance.post<RegisterResponseType>("registration", data);
  },
  login: (arg: LoginRequestType) => {
    return AuthInstance.post<LoginResponseType>('login', arg)
  },
  forgot: () => {
    return
  },
  newPassword: () => {
    return
  },
  me: () => {
    return
  },
  logout: () => {
    return
  },
};

// Types
export type RegisterParamsType = {
	userName: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}
export type RegisterResponseType = {
	id: string;
	userName: string;
	email: string;
	createdAt: string;
}

