import {
  PayloadAction,
  createAction,
  createEntityAdapter,
  createSlice,
  Action,
} from '@reduxjs/toolkit'
import { PostListSchema } from '../types/postListSchema'
import { IPost, createdPostMatcher } from '@/entities/Post'
import { StateSchema } from '@/providers/StoreProvider'
import { PostSortField } from '@/shared/const/postSortField'
import { fetchPostsByProfileId } from '../services/fetchPostsByProfileId'
import { fetchAllPosts } from '../services/fetchAllPosts'
import { PostListPage } from '../consts/postListPage'
import { PostListCardType } from '../consts/postListCardType'
import { initPostList } from '../services/initPostList'
import { PostListResponse } from '@/entities/Viewer'

const stringToDateTime = (s: string) => new Date(s).getTime()

export const postsAdapter = createEntityAdapter<IPost>({
  selectId: post => post.id,
  sortComparer: (a, b) => stringToDateTime(b.createdAt) - stringToDateTime(a.createdAt),
})

export const getPosts = postsAdapter.getSelectors<StateSchema>(state => {
  return state.postList || postsAdapter.getInitialState()
})

export const setPostsFromServer = createAction<PostListResponse>('set-posts-from-server')

const postsPending = (action: Action<unknown>) =>
  fetchPostsByProfileId.pending.match(action) || fetchAllPosts.pending.match(action)
const postsFulfilled = (action: Action<unknown>) =>
  fetchPostsByProfileId.fulfilled.match(action) ||
  fetchAllPosts.fulfilled.match(action) ||
  setPostsFromServer.match(action)
const postsRejected = (action: Action<unknown>) =>
  fetchPostsByProfileId.rejected.match(action) || fetchAllPosts.rejected.match(action)

const initialState = postsAdapter.getInitialState<PostListSchema>({
  ids: [],
  entities: {},
  postListId: undefined,
  page: PostListPage.HOME,
  type: PostListCardType.EXTENDED,
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

        // const type = page == PostListPage.HOME ? PostListCardType.EXTENDED : PostListCardType.IMAGE
        state.type = PostListCardType.IMAGE

        // const limit = type == PostListCardType.IMAGE ? 8 : 5
        state.limit = 8
      })
      .addMatcher(postsPending, state => {
        state.isLoading = true
      })
      .addMatcher(postsFulfilled, (state, { payload: postsData }) => {
        state.isLoading = false

        const { items: posts } = postsData
        const lastPost = posts[posts.length - 1]
        const hasMore = postsData.totalCount > state.ids.length + posts.length
        state.lastPostId = lastPost?.id
        state.hasMore = hasMore

        postsAdapter.addMany(state, posts)
      })
      .addMatcher(postsRejected, (state, error) => {
        state.isLoading = false
        state.error = error.payload
      })
      .addMatcher(createdPostMatcher, (state, { payload }) => {
        postsAdapter.addOne(state, payload)
      })
  },
})

export const { reducer: postListReducer } = postListSlice
export const { resetPostListState, setPostListId, addPosts } = postListSlice.actions
