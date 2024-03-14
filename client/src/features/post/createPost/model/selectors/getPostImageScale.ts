import { getPostImages } from './getPostImages'
import { createSelector } from '@reduxjs/toolkit'

export const getPostImageScale = (id: number) =>
  createSelector(getPostImages, images => {
    return images.find(image => image.id == id)?.scale
  })
