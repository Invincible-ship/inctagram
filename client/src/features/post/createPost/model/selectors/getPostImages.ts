import { getPostData } from './getPostData'
import { createSelector } from '@reduxjs/toolkit'

export const getPostImages = createSelector(getPostData, postData => postData.images)
