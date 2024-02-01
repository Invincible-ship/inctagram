import { componentRender } from '@/shared/lib/tests/componentRender'
import { PostList } from './PostList'
import { createMockedPostListData } from '@/widgets/PostList/model/mock/createMockedPostListData'
import { PostListPage } from '@/widgets/PostList/model/consts/postListPage'
import { PostListCardType } from '@/widgets/PostList/model/consts/postListCardType'
import { fireEvent, screen } from '@testing-library/react'
import { useSearchParams } from 'next/navigation'
import { MemoryRouterProvider, mockRouter } from '@/shared/lib/tests/mockRouter/mockRouter'

jest.mock('next/navigation')

const ITEMS_LENGTH = 8

const config = {
  page: PostListPage.PROFILE,
  type: PostListCardType.IMAGE,
  amount: ITEMS_LENGTH,
}

const initialState = {
  postList: createMockedPostListData(config),
}

describe('PostList', () => {
  beforeEach(() => {
    useSearchParams.mockReturnValue(new URLSearchParams())
    componentRender(<PostList />, {
      initialState,
      renderOptions: {
        wrapper: MemoryRouterProvider,
      },
    })
  })

  it('post list should render correctly', () => {
    const postListElem = screen.getByTestId('post-list')
    expect(postListElem).toBeInTheDocument()

    const items = postListElem.getElementsByClassName('PostListItem')
    expect(items.length).toBe(ITEMS_LENGTH)
  })

  it('post item should link to right postDetailsId in search params', () => {
    const postListElem = screen.getByTestId('post-list')
    const postItem = postListElem.getElementsByClassName('PostListItem')[0] as HTMLDivElement
    const postLink = postItem.querySelector('.postLink') as HTMLLinkElement
    const postId = postItem.dataset.id

    const sp = postLink.href.slice(postLink.href.indexOf('?'))
    const linkPostId = getPostDetailsId(sp)
    expect(linkPostId).toBe(postId)

    fireEvent.click(postLink)

    const urlPostId = getPostDetailsId(mockRouter.query)
    expect(urlPostId).toBe(postId)
  })
})

const getPostDetailsId = (sp: string | Record<string, any>) =>
  new URLSearchParams(sp).get('postDetailsId')
