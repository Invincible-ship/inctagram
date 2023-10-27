import { SignInWithAuth } from './ui/signIn'
export type { ISignInSchema } from './model/types/types'
export { signInReducer } from './model/slice/signInSlice'
export { getIsLoading as getIsSignInWithEmailLoading } from './model/selectors/getIsLoading'

export default SignInWithAuth
