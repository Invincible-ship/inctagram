import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { PostListSchema } from '../types/postListSchema'
import { IPost, createdPostMatcher, deletePostMatcher } from '@/entities/Post'
import { StateSchema } from '@/providers/StoreProvider'
import { PostSortField } from '@/shared/const/postSortField'
import { fetchPostsByProfileId } from '../services/fetchPostsByProfileId'
import { PostListPage } from '../consts/postListPage'
import { PostListCardType } from '../consts/postListCardType'
import { initPostList } from '../services/initPostList'
import { stringToDateTime } from '@/shared/utils/stringToDateTime'

export const postsAdapter = createEntityAdapter<IPost>({
  selectId: post => post.id,
  sortComparer: (a, b) => stringToDateTime(b.createdAt) - stringToDateTime(a.createdAt),
})

export const getPosts = postsAdapter.getSelectors<StateSchema>(state => {
  return state.postList || postsAdapter.getInitialState()
})

const initialState = postsAdapter.getInitialState<PostListSchema>({
  ids: [],
  entities: {},
  postListId: undefined,
  page: PostListPage.HOME,
  type: PostListCardType.IMAGE,
  isLoading: false,
  error: undefined,
  sort: 'desc',
  sortBy: PostSortField.CREATED,
  lastPostId: undefined,
  limit: 8,
  hasMore: true,
})

export const postListSlice = createSlice({
  name: 'postList',
  initialState,
  reducers: {
    addPosts: (state, { payload }: PayloadAction<IPost[]>) => {
      postsAdapter.addMany(state, payload)
    },
    setPostListId: (state, { payload }: PayloadAction<string>) => {
      state.postListId = payload
    },
    resetPostListState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(initPostList.fulfilled, (state, { payload: page }) => {
        if (!page) return

        state.page = page

        const type = page == PostListPage.HOME ? PostListCardType.EXTENDED : PostListCardType.IMAGE
        state.type = type

        const limit = type == PostListCardType.IMAGE ? 8 : 5
        state.limit = limit
      })
      .addCase(fetchPostsByProfileId.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchPostsByProfileId.fulfilled, (state, { payload: postsData }) => {
        state.isLoading = false

        const { items: posts } = postsData
        const lastPost = posts[posts.length - 1]
        const hasMore = postsData.totalCount > state.ids.length + posts.length
        state.lastPostId = lastPost?.id
        state.hasMore = hasMore

        postsAdapter.addMany(state, posts)
      })
      .addCase(fetchPostsByProfileId.rejected, (state, error) => {
        state.isLoading = false
        state.error = error.payload
      })
      .addMatcher(createdPostMatcher, (state, { payload }) => {
        postsAdapter.addOne(state, payload)
      })
      .addMatcher(deletePostMatcher, (state, payload) => {
        const id = String(payload.meta.arg)
        postsAdapter.removeOne(state, id)
      })
  },
})

export const { reducer: postListReducer } = postListSlice
export const { resetPostListState, setPostListId, addPosts } = postListSlice.actions
