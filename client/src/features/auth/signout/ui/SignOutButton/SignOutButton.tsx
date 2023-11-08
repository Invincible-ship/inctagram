import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import SignOutIcon from '@/shared/assets/icons/log-out.svg'
import { TFunction } from 'i18next'
import { CSSProperties, FC } from 'react'
import cls from './SignOutButton.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

type SignOutButtonProps = {
  style?: CSSProperties
  setIsSignOutOpen: (value: boolean) => void
  t: TFunction<string, undefined>
  className?: string
}

export const SignOutButton: FC<SignOutButtonProps> = ({
  setIsSignOutOpen,
  t,
  className,
  style,
}) => {
  return (
    <Button
      style={style}
      className={classNames(cls.btn, {}, [className])}
      theme={ButtonTheme.TEXT}
      onClick={() => setIsSignOutOpen(true)}
    >
      <p className={cls.icon}>
        <SignOutIcon />
      </p>
      <p className={cls.text}>{t('signout')}</p>
    </Button>
  )
}
