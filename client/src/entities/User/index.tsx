export { clearAuthData, setAuthData, userReducer } from './model/slice/userSlice'
export {
  userApi,
  getUserDataByTokenQuery,
  useSignInWithGoogleQuery,
  useSignInWithGithubQuery,
  getUserDataByGithubQuery,
  useResendLinkMutation,
  useConfirmationEmailViaCodeQuery,
} from './api/userApi'
export { initAuthData } from './services/initAuthData'
export { getUserEmail } from './model/selectors/getUserEmail'
export { getUserAuthData } from './model/selectors/getUserAuthData'
export { getIsUserInited } from './model/selectors/getIsUserInited'
export { getIsLoading } from './model/selectors/getIsLoading'
export type { IUserSchema, IUser } from './model/types/types'
