import { AuthInstance } from "@/features/auth/auth.instance";
import { LoginRequestType, LoginResponseType } from "@/features/auth/signin/model/types/types";
import {RegisterParamsType, RegisterResponseType} from "@/features/auth/signup/model/types";

export const authApi = {
  register: (data: RegisterParamsType) => {
    return AuthInstance.post<RegisterResponseType>("registration", data);
  },
  login: (arg: LoginRequestType) => {
    return AuthInstance.post<LoginResponseType>("login", arg);
  },
  forgot: () => {
    return;
  },
  newPassword: () => {
    return;
  },
  me: () => {
    return;
  },
  logout: () => {
    return;
  },
};
