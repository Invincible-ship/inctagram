import { Flex } from '@/shared/ui/Stack'
import { PostListCardType } from '../../model/consts/postListCardType'
import { getIsLoading, getLimit, getPostListType } from '../../model/selectors/postListSelectors'
import { getPosts } from '../../model/slice/postListSlice'
import { useSelector } from 'react-redux'
import { PostListItem } from '../PostListItem/PostListItem'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import cls from './PostList.module.scss'
import { FC, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { PostDetailsCardSkeleton } from '@/widgets/PostDetails'
import { PostCardExtendedSkeleton } from '@/entities/Post'

type PostListProps = {
  mobile?: boolean
  className?: string
}

export const PostList: FC<PostListProps> = memo(({ className }) => {
  const posts = useSelector(getPosts.selectAll)
  const type = useSelector(getPostListType)
  const limit = useSelector(getLimit)
  const isLoading = useSelector(getIsLoading)
  const direction = type == PostListCardType.POST_DETAILS ? 'column' : 'row'
  const align = type == PostListCardType.POST_DETAILS ? 'center' : 'start'

  const mods = {
    [cls.postDetails]: type == PostListCardType.POST_DETAILS,
  }

  return (
    <Flex
      data-testid="post-list"
      className={classNames(cls.PostList, mods, [className])}
      direction={direction}
      align={align}
      wrap={type !== PostListCardType.EXTENDED ? 'wrap' : 'nowrap'}
      max
    >
      {posts.map(post => {
        return <PostListItem key={post.id} post={post} type={type} className={cls.item} />
      })}
      {isLoading && getSkeletons(limit, type)}
    </Flex>
  )
})

PostList.displayName = 'PostList'

export const getSkeletons = (length: number, type: PostListCardType = PostListCardType.IMAGE) =>
  Array.from({ length }).map((_, idx) => {
    if (type == PostListCardType.POST_DETAILS) {
      return <PostDetailsCardSkeleton key={idx} />
    }
    if (type == PostListCardType.EXTENDED) {
      return <PostCardExtendedSkeleton key={idx} />
    }

    return <Skeleton key={idx} className="post-list-image-skeleton" />
  })
