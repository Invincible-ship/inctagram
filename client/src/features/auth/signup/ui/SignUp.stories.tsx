import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import { SignUp, SignUpProps } from './signup';
import { createReduxStore } from 'src/providers/StoreProvider/config/store';
import {
  PasswordWrapper,
  PasswordWrapperProps,
} from 'src/shared/ui/PasswordWrapper/PasswordWrapper';

export default {
  title: 'Components/SignUp',
  component: SignUp,
} as Meta;

type SignUpStoryProps = SignUpProps & {
  isLoading: boolean;
  isError?: boolean;
  error: string;
};

const store = createReduxStore();

const Template: Story<SignUpStoryProps> = args => (
  <Provider store={store}>
    <SignUp {...args} />
  </Provider>
);

export const Default = Template.bind({});
Default.args = {
  lng: 'en',
  isLoading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  lng: 'en',
  isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
  lng: 'en',
  isError: true,
  error: 'Error message',
};

export const PasswordWrapperExample: Story<PasswordWrapperProps> = args => (
  <div style={{ width: '280px' }}>
    <PasswordWrapper {...args} />
  </div>
);

PasswordWrapperExample.args = {
  id: 'password',
  className: 'password',
  placeholder: 'Password',
  type: 'password',
  title: 'Password',
  toggleShowPassword: () => {},
};

PasswordWrapperExample.parameters = {
  controls: { hideNoControlsWarning: true },
};
