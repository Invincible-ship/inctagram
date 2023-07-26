import type { Meta, StoryObj } from '@storybook/react';
import { CongratulationUI } from './CongratulationUI';
import { within } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';

const meta = {
  component: CongratulationUI,
  args: {
    title: 'some title',
    text: 'some text',
    buttonText: 'some button text',
    action: () => { }
  }
} satisfies Meta<typeof CongratulationUI>

export default meta
type Story = StoryObj<typeof meta>

export const CongratulationUiStory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button');
    await userEvent.click(button);
  },

} satisfies Story