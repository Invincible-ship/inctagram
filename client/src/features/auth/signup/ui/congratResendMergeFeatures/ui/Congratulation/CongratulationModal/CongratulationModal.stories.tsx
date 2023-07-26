import type { Meta, StoryObj } from '@storybook/react';
import { CongratulationModal } from '@/features/auth/signup/ui/congratResendMergeFeatures/ui/Congratulation/CongratulationModal/CongratulationModal'

const meta: Meta<typeof CongratulationModal> = {
  component: CongratulationModal,
  title: "signUp/Congratulation/CongratulationModalWindow",
  tags: ['autodocs'],
  argTypes: {
    lng: {
      control: { type: 'radio' },
      options: ['en', 'ru']
    }
  },
  args: {
    onClose: () => { },
    isOpen: true,
    lng: 'ru',
  },
} satisfies Meta<typeof CongratulationModal>

export default meta
type Story = StoryObj<typeof CongratulationModal>;

export const CongratulationModalDefault: Story = {
}