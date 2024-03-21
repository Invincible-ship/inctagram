import { getPostListId } from '../selectors/postListSelectors'
import { PostListPage } from '../consts/postListPage'
import { resetPostListState, setPostListId } from '../slice/postListSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { setUpdatedPostList } from '@/widgets/PostDetails'
import { PostListCardType } from '../consts/postListCardType'
import { InitPostListPayload } from '../types/postListSchema'

type InitPostListProps = {
  type: PostListCardType
  page: PostListPage
  currentId?: string
}

export const initPostList = createAsyncThunk<
  InitPostListPayload | void,
  InitPostListProps,
  ThunkConfig<void>
>('postList/initPostList', ({ page, type, currentId }, { dispatch, getState }) => {
  const prevId = getPostListId(getState())

  // prevent reseting state if the same profile page
  if (currentId != undefined && prevId == currentId) return

  dispatch(resetPostListState())
  dispatch(setUpdatedPostList(false))
  if (currentId) dispatch(setPostListId(currentId))

  return { page, type }
})
