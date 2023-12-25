import { getPostData } from '@/features/createPost/model/selectors/getPostData'
import { createSelector } from '@reduxjs/toolkit'

export const getPostDescription = createSelector(
  getPostData,
  postData => postData.description || '',
)
