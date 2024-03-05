import type { Meta, StoryFn, StoryObj } from '@storybook/react'

import { ConfirmationEmailViaCode as ConfirmationEmail } from '@/features/auth/confirmationEmailViaCode'
import { useContext } from 'react'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { LanguageIds, Namespaces } from '@/shared/config/i18n/types'
import { LanguageContext } from '@/shared/lib/context/LanguageContext'
import { PageDecorator } from '@/shared/config/storybook/PageDecorator/PageDecorator'

const meta: Meta<typeof ConfirmationEmail> = {
  title: 'pages/ConfirmationEmail',
  decorators: [(Story: StoryFn) => PageDecorator(Story)],
  component: ConfirmationEmail,
}

export default meta
type Story = StoryObj<typeof ConfirmationEmail>

const ConfirmationEmailWrapper = ({ valid }: { valid: boolean }) => {
  const lngId = useContext(LanguageContext) as LanguageIds
  const { t } = useClientTranslation(Namespaces.CONFIRMATION_EMAIL)

  return <ConfirmationEmail isSuccess={valid} lngId={lngId} t={t} email="test@test.com" />
}

export const Valid: Story = {
  render: () => <ConfirmationEmailWrapper valid />,
}

export const Invalid: Story = {
  render: () => <ConfirmationEmailWrapper valid={false} />,
}
