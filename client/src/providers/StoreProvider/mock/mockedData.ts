import { IUserSchema } from '@/entities/User'

export const user: DeepPartial<IUserSchema> = {
  authData: {
    userName: 'storybook',
    userId: 1,
    email: 'storybook',
  },
}
