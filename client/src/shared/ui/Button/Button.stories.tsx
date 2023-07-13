import type { Meta, StoryObj } from "@storybook/react"

import { Button, ButtonTheme } from "./Button"
import {action} from "@storybook/addon-actions"

const meta: Meta<typeof Button> = {
  title: "shared/Button",
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: () => <Button theme={ButtonTheme.DEFAULT}>Button</Button>,
}

export const SecondaryTypescript: Story = {
  render: () => <Button theme={ButtonTheme.SECONDARY}>Button</Button>,
}

export const Outlined: Story = {
  render: () => <Button theme={ButtonTheme.OUTLINED}>Button</Button>,
}

const Callback = (...params: any) => {
  action('Button Text clicked')(params)
}

export const Text: Story = {
  render: () => <Button theme={ButtonTheme.TEXT} onClick={Callback}>Button</Button>,
}
