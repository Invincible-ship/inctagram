import {AuthInstance} from "@/features/auth/auth.instance"
import {ArgRegisterType} from "@/features/auth/signup/model/slice/types/signUp"

export const authApi = {
  register: (arg: any) => {
    return AuthInstance.post<any>("registration", arg)
  },
  login: () => {
    return
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
