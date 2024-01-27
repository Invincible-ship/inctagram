// AUTH ENDPOINTS
export const SIGN_OUT_ENDPOINT = '/api/v1/auth/logout'
export const SIGN_UP_ENDPOINT = '/api/v1/auth/registration'
export const CONFIRMATION_REGISTRATION = '/api/v1/auth/registration-confirmation'
export const RESEND_LINK_ENDPOINT = '/api/v1/auth/registration-email-resending'
export const SIGN_IN_ENDPOINT = '/api/v1/auth/login'
export const ME_ENDPOINT = '/api/v1/auth/me'
export const SIGN_IN_WITH_GOOGLE_ENDPOINT = '/api/v1/auth/google/login'
export const SIGN_IN_WITH_GITHUB_ENDPOINT = '/api/v1/auth/github/login'
export const UPDATE_TOKENS_ENDPOINT = '/api/v1/auth/update-tokens'

// PROFILE ENDPOINTS
export const PROFILE_ENDPOINT = '/api/v1/users/profile'
export const PROFILE_AVATARS_ENDPOINT = '/api/v1/users/profile/avatar'
export const DELETE_PROFILE_AVATARS_ENDPOINT = '/api/v1/users/profile/avatar'

// POST ENDPOINTS
export const POST_BY_ID_ENDPOINT = '/api/v1/posts/p'
export const ALL_POSTS_ENDPOINT = '/api/v1/posts/all'
export const POST_BY_USER_ID_ENDPOINT = '/api/v1/posts/user'
export const UPLOAD_POST_IMAGE_ENDPOINT = '/api/v1/posts/image'
export const CREATE_POST_ENDPOINT = '/api/v1/posts'
export const DELETE_POST_IMAGE_ENDPOINT = '/api/v1/posts/image'
export const DELETE_POST_ENDPOINT = '/api/v1/posts'

// VIEWER ENDPOINTS
export const GET_PUBLIC_USER_PROFILE = '/api/v1/public-user/profile'
export const GET_POSTS_BY_PROFILE_ID = '/api/v1/public-posts/user'
