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

const mockedProfile: IViewer = {
  id: 1,
  userName: 'John Doe',
  avatars: [],
  aboutMe: 'About me',
}

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => new URLSearchParams()),
  useParams: jest.fn(() => ({ id: '1' })),
  usePathname: jest.fn(() => ''),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
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
    componentRender(<ProfilePage profile={mockedProfile} />, { initialState })
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
  })
})
