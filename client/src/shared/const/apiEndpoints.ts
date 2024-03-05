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
export const FORGOT_PASSWORD_ENDPOINT = '/api/v1/auth/password-recovery'
export const CREATE_NEW_PASSWORD_ENDPOINT = '/api/v1/auth/new-password'

// PROFILE ENDPOINTS
export const PROFILE_ENDPOINT = '/api/v1/users/profile'
export const PROFILE_AVATARS_ENDPOINT = '/api/v1/users/profile/avatar'
export const DELETE_PROFILE_AVATARS_ENDPOINT = '/api/v1/users/profile/avatar'
export const GET_USER_PROFILE = '/api/v1/users'
export const GET_PROFILE_FOLLOWERS = (userName: string) => `/api/v1/users/${userName}/followers`
export const GET_PROFILE_FOLLOWING = (userName: string) => `/api/v1/users/${userName}/following`
export const GET_ALL_PROFILES = '/api/v1/users'

// POST ENDPOINTS
export const UPLOAD_POST_IMAGE_ENDPOINT = '/api/v1/posts/image'
export const CREATE_POST_ENDPOINT = '/api/v1/posts'
export const DELETE_POST_IMAGE_ENDPOINT = '/api/v1/posts/image'
export const DELETE_POST_ENDPOINT = '/api/v1/posts'

// VIEWER ENDPOINTS
export const GET_PUBLIC_USER_PROFILE = '/api/v1/public-user/profile'
export const GET_USERS_TOTAL_COUNT = '/api/v1/public-user'
export const GET_POSTS_BY_PROFILE_ID = '/api/v1/public-posts/user'
export const GET_ALL_POSTS = '/api/v1/public-posts/all'

// SUBSCRIPTION ENDPOINTS
export const GET_CURRENT_SUBSCRIPTIONS = '/api/v1/subscriptions/current-subscriptions'
export const GET_SUBSCRIPTION_COST = '/api/v1/subscriptions/cost-of-subscriptions'
export const GET_ALL_PAYMENTS = '/api/v1/subscriptions/my-payments'
export const CREATE_SUBSCRIPTION = '/api/v1/subscriptions'
export const CANCEL_AUTO_RENEWAL = '/api/v1/subscriptions/canceled-auto-renewal'
