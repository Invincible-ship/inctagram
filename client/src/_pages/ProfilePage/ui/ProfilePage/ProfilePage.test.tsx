import { componentRender } from '@/shared/lib/tests/componentRender'
import { ProfilePage } from './ProfilePage'
import { screen } from '@testing-library/react'
import { IViewer, useGetPublicUserProfileQuery } from '@/entities/Viewer'
import {
  PostListCardType,
  PostListPage,
  createMockedPostListData,
  fetchPostsByProfileId,
  initPostList,
} from '@/widgets/PostList'

type HookResponse = {
  data: IViewer
  isLoading: boolean
}

const mockedProfile: HookResponse = {
  data: {
    id: 1,
    userName: 'test',
    aboutMe: 'About Me',
    avatars: [],
  },
  isLoading: false,
}

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => new URLSearchParams()),
  useParams: jest.fn(() => ({ id: '1' })),
  usePathname: jest.fn(() => ''),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}))
jest.mock('../../../../entities/Viewer', () => ({
  ...jest.requireActual('../../../../entities/Viewer'),
  useGetPublicUserProfileQuery: jest.fn((id: string) => mockedProfile),
}))
jest.mock('../../../../widgets/PostList', () => ({
  ...jest.requireActual('../../../../widgets/PostList'),
  initPostList: jest.fn((props: any) => ({
    type: '',
    payload: {},
  })),
  fetchPostsByProfileId: jest.fn((id: string) => ({
    type: '',
    payload: {},
  })),
}))

const initialState = {
  postList: createMockedPostListData({
    page: PostListPage.PROFILE,
    type: PostListCardType.IMAGE,
    amount: 8,
  }),
}

describe('Profile Page', () => {
  beforeEach(() => {
    componentRender(<ProfilePage />, { initialState })
  })

  it('should render correctly', () => {
    expect(screen.getByTestId('profile-page')).toBeInTheDocument()
    expect(screen.getByTestId('profile-card')).toBeInTheDocument()
    expect(screen.getByTestId('post-list')).toBeInTheDocument()
  })

  it('should initialize correctly', () => {
    expect(initPostList).toHaveBeenCalledTimes(1)
    expect(initPostList).toHaveBeenCalledWith({ page: PostListPage.PROFILE, currentId: '1' })
    expect(fetchPostsByProfileId).toHaveBeenCalledTimes(1)
    expect(fetchPostsByProfileId).toHaveBeenCalledWith('1')
    expect(useGetPublicUserProfileQuery).toHaveBeenCalledTimes(2)
    expect(useGetPublicUserProfileQuery).toHaveBeenCalledWith('1')
  })
})
