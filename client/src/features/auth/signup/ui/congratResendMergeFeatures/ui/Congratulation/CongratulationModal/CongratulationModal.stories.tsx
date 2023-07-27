import type { Meta, StoryObj } from '@storybook/react'
import { CongratulationModal } from '@/features/auth/signup/ui/congratResendMergeFeatures/ui/Congratulation/CongratulationModal/CongratulationModal'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof CongratulationModal> = {
  component: CongratulationModal,
  title: 'FEATURES/auth/signup/Congratulation/Modal',
  tags: ['autodocs'],
  argTypes: {
    lng: {
      control: { type: 'radio' },
      options: ['en', 'ru']
    }
  },
  args: {
    onClose: action('clicked'),
    isOpen: true,
    lng: 'ru',
  },
} satisfies Meta<typeof CongratulationModal>

export default meta
type Story = StoryObj<typeof CongratulationModal>

export const CongratulationModalDefault: Story = {
}