import {AuthInstance} from "@/features/auth/auth.instance"
import {ArgRegisterType} from "@/features/auth/signup/model/slice/types/signUp"
import {LoginRequestType, LoginResponseType} from "@/features/auth/signin/model/types/types"

export const authApi = {
  register: (arg: any) => {
    return AuthInstance.post<any>("registration", arg)
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
}

// Types
