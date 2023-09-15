export enum Routes {
  MAIN = '/',
  // auth routes
  SIGNIN = '/auth/login',
  SIGNUP = '/auth/registration',
  FORGOTPASSWORD = '/auth/forgot-password',
  CONFIRMATION_EMAIL = '/auth/registration/confirmation-email',
  MERGE = '/auth/merge',
  GOOGLE_CLIENT = '/auth/oauth-google-client',
  GITHUB_CLIENT = '/auth/oauth-github-client',
  // user routes
  PROFILE = '/profile',
}
