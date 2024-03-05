import { StateSchema } from '@/app/providers/StoreProvider'

export const getIsLoading = (state: StateSchema) => {
  return state.postList.isLoading
}
export const getIsError = (state: StateSchema) => {
  return state.postList.error
}
export const getSortOrder = (state: StateSchema) => {
  return state.postList.sort
}
export const getSort = (state: StateSchema) => {
  return state.postList.sortBy
}
export const getLimit = (state: StateSchema) => {
  return state.postList.limit
}
export const getLastPostId = (state: StateSchema) => {
  return state.postList.lastPostId
}
export const getHasMore = (state: StateSchema) => {
  return state.postList.hasMore
}
export const getPage = (state: StateSchema) => {
  return state.postList.page
}
export const getPostListType = (state: StateSchema) => {
  return state.postList.type
}
export const getPostListId = (state: StateSchema) => {
  return state.postList.postListId
}
export const getTotalCount = (state: StateSchema) => {
  return state.postList.totalCount
}
