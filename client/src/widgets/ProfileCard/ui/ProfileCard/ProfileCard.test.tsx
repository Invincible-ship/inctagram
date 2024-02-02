import { fireEvent, render, screen } from '@testing-library/react'
import { ProfileCard } from './ProfileCard'
import { IViewer } from '@/entities/Viewer'
import { AvatarSize } from '@/shared/ui/Avatar/Avatar'
import avatarUrl from '../../../../../public/images/avatar-story.jpg'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import { TFunction } from 'i18next'
import { mockRouter, MemoryRouterProvider } from '@/shared/lib/tests/mockRouter/mockRouter'
import { componentRender } from '@/shared/lib/tests/componentRender'
import { Routes } from '@/shared/types/routes'

const mockedProfile: IViewer = {
  id: 1,
  userName: 'John Doe',
  avatars: [{ width: AvatarSize.LARGE, height: AvatarSize.LARGE, fileSize: 1, url: avatarUrl.src }],
  aboutMe: 'About me',
}

const mockedT = jest.fn((s: string) => '') as unknown as TFunction<Namespaces, undefined>

describe('ProfileCard', () => {
  // eslint-disable-next-line prettier/prettier
  it('renders the viewer\'s profile card correctly', async () => {
    render(
      <ProfileCard
        t={mockedT}
        profile={mockedProfile}
        owner={false}
        isLoading={false}
        mobile={false}
      />,
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('About me')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Follow' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send message' })).toBeInTheDocument()

    expect(screen.getByText('2 218')).toBeInTheDocument()
    expect(screen.getByText('2 358')).toBeInTheDocument()
    expect(screen.getByText('2 764')).toBeInTheDocument()
  })

  // eslint-disable-next-line prettier/prettier
  it('renders the owner\'s profile card correctly', () => {
    render(
      <ProfileCard t={mockedT} profile={mockedProfile} owner isLoading={false} mobile={false} />,
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('About me')).toBeInTheDocument()

    expect(screen.getByTestId('settings-btn')).toBeInTheDocument()

    expect(screen.getByText('2 218')).toBeInTheDocument()
    expect(screen.getByText('2 358')).toBeInTheDocument()
    expect(screen.getByText('2 764')).toBeInTheDocument()
  })

  // eslint-disable-next-line prettier/prettier
  it('renders the mobile version viewer\'s profile card correctly', () => {
    render(
      <ProfileCard t={mockedT} profile={mockedProfile} owner={false} isLoading={false} mobile />,
    )

    expect(screen.getByTestId('profile-card')).toHaveClass('directionColumn')

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('About me')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Follow' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send message' })).toBeInTheDocument()

    expect(screen.queryByText('2 218')).toBeInTheDocument()
    expect(screen.queryByText('2 358')).toBeInTheDocument()
    expect(screen.queryByText('2 764')).toBeInTheDocument()
  })

  // eslint-disable-next-line prettier/prettier
  it('renders the mobile version owner\'s profile card correctly', () => {
    render(<ProfileCard t={mockedT} profile={mockedProfile} owner isLoading={false} mobile />)

    expect(screen.getByTestId('profile-card')).toHaveClass('directionColumn')

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('About me')).toBeInTheDocument()

    expect(screen.queryByTestId('settings-btn')).not.toBeInTheDocument()

    expect(screen.getByText('2 218')).toBeInTheDocument()
    expect(screen.getByText('2 358')).toBeInTheDocument()
    expect(screen.getByText('2 764')).toBeInTheDocument()
  })

  it('renders the loading skeleton when isLoading is true', () => {
    render(<ProfileCard t={mockedT} owner isLoading />)

    expect(screen.getByTestId('profile-skeleton')).toBeInTheDocument()
  })

  // eslint-disable-next-line prettier/prettier
  it('link to edit owner\'s profile should be correct', () => {
    componentRender(<ProfileCard t={mockedT} isLoading={false} profile={mockedProfile} owner />, {
      renderOptions: {
        wrapper: MemoryRouterProvider,
      },
    })
    const settingsBtn = screen.getByTestId('settings-btn')

    fireEvent.click(settingsBtn)
    const expectedUrl = `/${LanguageIds.EN}${Routes.PROFILE}/1/edit`

    expect(expectedUrl).toBe(mockRouter.asPath)
  })
})
