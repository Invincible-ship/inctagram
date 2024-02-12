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

type PostListProps = {
  mobile?: boolean
  className?: string
}

export const PostList: FC<PostListProps> = memo(({ className }) => {
  const posts = useSelector(getPosts.selectAll)
  const type = useSelector(getPostListType)
  const limit = useSelector(getLimit)
  const isLoading = useSelector(getIsLoading)
  const direction = type == PostListCardType.IMAGE ? 'row' : 'column'
  const align = type == PostListCardType.EXTENDED ? 'center' : 'start'

  return (
    <Flex
      data-testid="post-list"
      className={classNames(cls.PostList, {}, [className])}
      direction={direction}
      align={align}
      wrap="wrap"
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

const getSkeletons = (length: number, type: PostListCardType) =>
  Array.from({ length }).map((_, idx) => {
    if (type == PostListCardType.EXTENDED) {
      // TODO: add extended card type skeleton
      return <>Extended Skeleton Component</>
    }

    return <Skeleton key={idx} className={cls.skeleton} />
  })
