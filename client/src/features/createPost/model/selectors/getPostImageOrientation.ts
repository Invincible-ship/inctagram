import { getPostImages } from './getPostImages'
import { createSelector } from '@reduxjs/toolkit'

export const getPostImageOrientation = (id: number) =>
  createSelector(getPostImages, images => {
    return images.find(image => image.id == id)?.orientation
  })
