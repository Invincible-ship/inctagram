import { HStack } from '@/shared/ui/Stack'
import BookmarkIcon from '@/shared/assets/icons/bookmark-outline.svg'
import FilledBookmarkIcon from '@/shared/assets/icons/bookmark.svg'
import { FC, memo, useMemo, useState } from 'react'
import { IPost } from '@/entities/Post'
import { togglePostToBookmark } from '../model/services/togglePostToBookmark'
import { LOCAL_STORAGE_USER_KEY } from '@/shared/const/localStorage'
import cls from './BookmarkPost.module.scss'
import { TFunction } from 'i18next'
import { Namespaces } from '@/shared/config/i18n/types'
import toast from 'react-hot-toast'
import { LocalStorageUser } from '@/shared/types/localStorage'

type BookmarkPostProps = {
  post: IPost
  t: TFunction<Namespaces, undefined>
  onClick?: (id: number) => void
}

export const BookmarkPost: FC<BookmarkPostProps> = memo(({ post, t, onClick }) => {
  const [_, rerender] = useState({})
  const userLocalStorage = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_USER_KEY) || 'null',
  ) as LocalStorageUser | null

  const isBookmarked = useMemo(() => {
    const favorites = userLocalStorage?.favorites
    if (!favorites) return false

    return favorites.some(({ id }) => post.id == id)
  }, [post, userLocalStorage])

  const handleClick = () => {
    onClick?.(post.id)
    togglePostToBookmark(post)
    toast.success(isBookmarked ? t('features.bookmark.remove') : t('features.bookmark.add'))
    rerender({})
  }

  return (
    <HStack
      className={cls.BookmarkPost}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
      align="center"
    >
      {isBookmarked ? <FilledBookmarkIcon /> : <BookmarkIcon />}
    </HStack>
  )
})

BookmarkPost.displayName = 'BookmarkPost'
