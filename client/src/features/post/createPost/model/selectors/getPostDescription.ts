import { getPostData } from './getPostData'
import { createSelector } from '@reduxjs/toolkit'

export const getPostDescription = createSelector(
  getPostData,
  postData => postData.description || '',
)
