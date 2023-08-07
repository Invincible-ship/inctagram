import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import SignOutIcon from '@/shared/assets/icons/log-out.svg'
import { TFunction } from 'i18next'
import { FC } from 'react'
import cls from './SignOutButton.module.scss'

type SignOutButtonProps = {
  setIsSignOutOpen: (value: boolean) => void;
  t: TFunction<string, undefined>
}

export const SignOutButton: FC<SignOutButtonProps> = (
  { setIsSignOutOpen, t }
) => {
  return (
    <Button
      className={cls.btn}
      theme={ButtonTheme.TEXT}
      onClick={() => setIsSignOutOpen(true)}
    >
      <p className={cls.icon}><SignOutIcon /></p>
      <p className={cls.text}>{t('signout')}</p>
    </Button>
  )
}