import type { Meta, StoryObj } from '@storybook/react'
import { PostDetails } from '@/widgets/PostDetails/ui/PostDetails'
import { Button } from '@/shared/ui/Button/Button'
import { useState } from 'react'

const meta: Meta<typeof PostDetails> = {
  title: 'widgets/PostDetails',
  component: PostDetails,
}

export default meta
type Story = StoryObj<typeof PostDetails>

export const Page: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(true)
    const handleClose = () => {
      setIsOpen(false)
    }
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <Button onClick={() => setIsOpen(true)}>Trigger</Button>
        <PostDetails onClose={handleClose} isOpen={isOpen} />
      </div>
    )
  },
}
