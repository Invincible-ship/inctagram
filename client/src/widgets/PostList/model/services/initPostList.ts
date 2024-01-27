import { getPostListId } from '../selectors/postListSelectors'
import { PostListPage } from '../consts/postListPage'
import { resetPostListState, setPostListId } from '../slice/postListSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/providers/StoreProvider'

type InitPostListProps = {
  page: PostListPage
  currentId?: string
}

export const initPostList = createAsyncThunk<
  PostListPage | void,
  InitPostListProps,
  ThunkConfig<void>
>('postList/initPostList', ({ page, currentId }, { dispatch, getState }) => {
  const prevId = getPostListId(getState())

  if (prevId == currentId) return

  dispatch(resetPostListState())
  if (currentId) dispatch(setPostListId(currentId))

  return page
})