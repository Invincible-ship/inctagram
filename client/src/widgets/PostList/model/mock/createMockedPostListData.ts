import { IPost } from '@/entities/Post'
import postPictureUrl from '../../../../../public/images/post-card-story.jpg'
import { PostListPage } from '@/widgets/PostList/model/consts/postListPage'
import { PostListCardType } from '@/widgets/PostList/model/consts/postListCardType'
import { postsAdapter } from '@/widgets/PostList/model/slice/postListSlice'
import { PostListSchema } from '@/widgets/PostList/model/types/postListSchema'
import { PostSortField } from '@/shared/const/postSortField'

type Options = {
  page: PostListPage
  type: PostListCardType
  amount?: number
}

export const createMockedPostListData = ({ page, type, amount = 4 }: Options) =>
  postsAdapter.getInitialState<PostListSchema>({
    ids: Array.from({ length: amount }).map((_, idx) => ++idx),
    entities: createEntities(amount),
    postListId: undefined,
    page,
    type,
    isLoading: false,
    error: undefined,
    sort: 'desc',
    sortBy: PostSortField.CREATED,
    lastPostId: undefined,
    limit: 8,
    hasMore: true,
  })

const createEntities = (amount: number) => {
  const entities: { [id: number]: IPost } = {}

  Array.from({ length: amount }).forEach((_, idx) => {
    entities[++idx] = createMockedPostData(++idx)
  })

  return entities
}

const createMockedPostData = (id: number): IPost => ({
  id,
  userName: 'storybook',
  description: '',
  location: '',
  images: [
    {
      url: postPictureUrl as unknown as string,
      width: 640,
      height: 640,
      fileSize: 12345,
      uploadId: '1234',
    },
  ],
  createdAt: new Date(Date.now()).toDateString(),
  updatedAt: new Date(Date.now()).toDateString(),
  ownerId: 1,
  avatarOwner: '',
  owner: {
    firstName: '',
    lastName: '',
  },
})
