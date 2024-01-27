import { IPost } from '@/entities/Post'
import postPictureUrl from '../../../../../public/images/post-card-story.jpg'
import { PostListPage } from '@/widgets/PostList/model/consts/postListPage'
import { PostListCardType } from '@/widgets/PostList/model/consts/postListCardType'
import { postsAdapter } from '@/widgets/PostList/model/slice/postListSlice'
import { PostListSchema } from '@/widgets/PostList/model/types/postListSchema'
import { PostSortField } from '@/shared/const/postSortField'

export const createMockedPostListData = (page: PostListPage, type: PostListCardType.IMAGE) =>
  postsAdapter.getInitialState<PostListSchema>({
    ids: ['1', '2', '3', '4'],
    entities: {
      1: createMockedPostData(1),
      2: createMockedPostData(2),
      3: createMockedPostData(3),
      4: createMockedPostData(4),
    },
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

const createMockedPostData = (id: number): IPost => ({
  id: 1,
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
