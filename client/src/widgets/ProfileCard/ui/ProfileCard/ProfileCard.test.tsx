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
import { IUser, IUserSchema } from '@/entities/User'
import { ProfileSettingValue } from '@/features/editableProfileGeneralInfo'

const mockedProfile: IViewer = {
  id: 1,
  userName: 'John Doe',
  avatars: [{ width: AvatarSize.LARGE, height: AvatarSize.LARGE, fileSize: 1, url: avatarUrl.src }],
  aboutMe: 'About me',
}

const mockedUser: (owner?: boolean) => DeepPartial<IUserSchema> = owner => ({
  authData: {
    userId: owner ? 1 : 10,
  },
})

jest.mock('next/navigation', () => ({
  useParams: jest.fn().mockImplementation(() => ({ id: '1' })),
}))

const renderProfileCard = ({
  owner,
  mobile,
  isLoading,
}: {
  owner?: boolean
  mobile?: boolean
  isLoading?: boolean
}) => {
  return componentRender(
    <ProfileCard
      isLoading={isLoading}
      profile={mockedProfile}
      mobile={mobile}
      isAuthorized={true}
    />,
    {
      initialState: { user: mockedUser(owner) },
      renderOptions: {
        wrapper: MemoryRouterProvider,
      },
    },
  )
}

describe('ProfileCard', () => {
  // eslint-disable-next-line prettier/prettier
  it('renders the viewer\'s profile card correctly', async () => {
    renderProfileCard({ owner: false })

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('About me')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Follow' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send message' })).toBeInTheDocument()

    expect(screen.getByText('profile.following')).toBeInTheDocument()
    expect(screen.getByText('profile.followers')).toBeInTheDocument()
    expect(screen.getByText('profile.publications')).toBeInTheDocument()
  })

  // eslint-disable-next-line prettier/prettier
  it('renders the owner\'s profile card correctly', () => {
    renderProfileCard({ owner: true })

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('About me')).toBeInTheDocument()

    expect(screen.getByTestId('settings-btn')).toBeInTheDocument()

    expect(screen.getByText('profile.following')).toBeInTheDocument()
    expect(screen.getByText('profile.followers')).toBeInTheDocument()
    expect(screen.getByText('profile.publications')).toBeInTheDocument()
  })

  // eslint-disable-next-line prettier/prettier
  it('renders the mobile version viewer\'s profile card correctly', () => {
    renderProfileCard({ owner: false, mobile: true })

    expect(screen.getByTestId('profile-card')).toHaveClass('directionColumn')

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('About me')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Follow' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send message' })).toBeInTheDocument()

    expect(screen.queryByText('profile.following')).toBeInTheDocument()
    expect(screen.queryByText('profile.followers')).toBeInTheDocument()
    expect(screen.queryByText('profile.publications')).toBeInTheDocument()
  })

  // eslint-disable-next-line prettier/prettier
  it('renders the mobile version owner\'s profile card correctly', () => {
    renderProfileCard({ owner: true, mobile: true })

    expect(screen.getByTestId('profile-card')).toHaveClass('directionColumn')

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('About me')).toBeInTheDocument()

    expect(screen.queryByTestId('settings-btn')).not.toBeInTheDocument()

    expect(screen.getByText('profile.following')).toBeInTheDocument()
    expect(screen.getByText('profile.followers')).toBeInTheDocument()
    expect(screen.getByText('profile.publications')).toBeInTheDocument()
  })

  it('renders the info container skeleton when isLoading is true', () => {
    renderProfileCard({ isLoading: true })

    expect(screen.getByTestId('post-info-skeleton')).toBeInTheDocument()
  })

  // eslint-disable-next-line prettier/prettier
  it('link to edit owner\'s profile should be correct', () => {
    renderProfileCard({ owner: true })
    const settingsBtn = screen.getByTestId('settings-btn')

    fireEvent.click(settingsBtn)

    const qp = new URLSearchParams({ setting: ProfileSettingValue.GENERAL_INFO })
    const expectedUrl = `/${LanguageIds.EN}${Routes.PROFILE}/1/edit?${qp.toString()}`

    expect(expectedUrl).toBe(mockRouter.asPath)
  })
})
