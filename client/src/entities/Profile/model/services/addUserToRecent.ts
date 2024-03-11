import { ProfileSearchType } from '@/entities/Profile/model/types/types'
import { LOCAL_STORAGE_USER_KEY } from '@/shared/const/localStorage'
import { LocalStorageUser } from '@/shared/types/localStorage'

export const addUserToRecent = (user: ProfileSearchType) => {
  const userLocalStorage = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_USER_KEY) || 'null',
  ) as LocalStorageUser | null

  let data: LocalStorageUser

  if (userLocalStorage) {
    const recent = userLocalStorage.search?.recent || []
    const isAlreadyAdded = recent.some(({ id }) => user.id === id)

    if (isAlreadyAdded) return

    data = {
      ...userLocalStorage,
      search: {
        ...userLocalStorage.search,
        recent: [user, ...recent],
      },
    }
  } else {
    data = {
      search: {
        recent: [user],
      },
    }
  }

  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(data))
}
