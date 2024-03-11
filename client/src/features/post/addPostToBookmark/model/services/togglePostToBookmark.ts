import { IPost } from '@/entities/Post'
import { LOCAL_STORAGE_USER_KEY } from '@/shared/const/localStorage'
import { LocalStorageUser } from '@/shared/types/localStorage'

export const togglePostToBookmark = (post: IPost) => {
  const userLocalStorage = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_USER_KEY) || 'null',
  ) as LocalStorageUser | null

  let data: LocalStorageUser

  if (userLocalStorage) {
    const currentPosts = userLocalStorage?.favorites || []
    const isAlreadyAdded = currentPosts.some(({ id }) => post.id === id)

    if (isAlreadyAdded) {
      data = {
        ...userLocalStorage,
        favorites: currentPosts.filter(({ id }) => id !== post.id),
      }

      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(data))
      return
    }

    data = {
      ...userLocalStorage,
      favorites: [post, ...currentPosts],
    }
  } else {
    data = {
      favorites: [post],
    }
  }

  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(data))
}
