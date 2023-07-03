import { Meta, Story } from '@storybook/react';
import { Header } from './Header';

const meta: Meta = {
    title: 'widgets/Header',
    component: Header,
};

export default meta;

const Template: Story = (args) => <Header {...args} />;

export const InctagramHeader = Template.bind({});
InctagramHeader.args = {
    lng: 'ru',
};
