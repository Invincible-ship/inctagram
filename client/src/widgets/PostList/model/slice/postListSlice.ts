import {
  PayloadAction,
  createAction,
  createEntityAdapter,
  createSlice,
  Action,
} from '@reduxjs/toolkit'
import { PostListSchema } from '../types/postListSchema'
import {
  IPost,
  createdPostMatcher,
  deletePostMatcher,
  updatePostByIdMatcher,
} from '@/entities/Post'
import { StateSchema } from '@/app/providers/StoreProvider'
import { PostSortField } from '@/shared/const/postSortField'
import { fetchPostsByProfileId } from '../services/fetchPostsByProfileId'
import { fetchAllPosts } from '../services/fetchAllPosts'
import { PostListPage } from '../consts/postListPage'
import { PostListCardType } from '../consts/postListCardType'
import { initPostList } from '../services/initPostList'
import { PostListResponse } from '@/entities/Viewer'
import { stringToDateTime } from '@/shared/utils/stringToDateTime'

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
  page: undefined,
  type: undefined,
  isLoading: false,
  error: undefined,
  sort: 'desc',
  sortBy: PostSortField.CREATED,
  totalCount: undefined,
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
    removePost: (state, { payload }: PayloadAction<number>) => {
      postsAdapter.removeOne(state, payload)
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

        const limit = type == PostListCardType.EXTENDED ? 5 : 8
        state.limit = limit
      })
      .addMatcher(postsPending, state => {
        state.isLoading = true
      })
      .addMatcher(postsFulfilled, (state, { payload: postsData }) => {
        state.isLoading = false

        const { items: posts } = postsData
        const lastPost = posts[posts.length - 1]
        const hasMore = postsData.totalCount > state.ids.length + posts.length
        state.totalCount = postsData.totalCount
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
      .addMatcher(deletePostMatcher, (state, payload) => {
        const id = payload.meta.arg.originalArgs
        postsAdapter.removeOne(state, String(id))
      })
      .addMatcher(updatePostByIdMatcher, (state, payload) => {
        const { id, description } = payload.meta.arg.originalArgs
        postsAdapter.updateOne(state, { id, changes: { description } })
      })
  },
})

export const { reducer: postListReducer } = postListSlice
export const { resetPostListState, setPostListId, addPosts, removePost } = postListSlice.actions
