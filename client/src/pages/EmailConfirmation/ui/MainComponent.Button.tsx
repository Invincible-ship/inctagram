import { FC } from 'react'
import s from './emailConfiramtion.module.scss'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

type ButtonComponentProps = {
  action: () => void
  buttonText: string
}

export const ButtonComponent: FC<ButtonComponentProps> = ({ action, buttonText }) => {
  return (
    <div className={s.buttons}>
      <Button onClick={action} className={s.btn} theme={ButtonTheme.DEFAULT}>
        {buttonText}
      </Button>
    </div>
  )
}
