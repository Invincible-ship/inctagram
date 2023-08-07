import { FC } from 'react'
import s from './emailConfirmation.module.scss'
import { Header } from './MainComponent.Header'
import { TextContent } from './MainComponent.Body'
import { ImageComponent } from './MainComponent.Image'
import { ImageResendLink } from './ImageResendLink'
import { ImageCongratulation } from './ImageCongratulation'
import { ButtonComponent } from './MainComponent.Button'

export const MainComponent: FC<MainComponentProps> = ({
  status,
  email,
  title,
  text,
  buttonText,
  action,
}) => {
  return (
    <>
      <div className={s.emailConfiramtion}>
        <div className={s.wrapper}>
          <div className={s.body}>
            <Header title={title} />
            <TextContent text={text} />
            <ImageComponent>
              {email && <ImageResendLink />}
              {status && <ImageCongratulation />}
            </ImageComponent>
            <ButtonComponent action={action} buttonText={buttonText} />
          </div>
        </div>
      </div>
    </>
  )
}

type MainComponentProps = {
  status?: string
  email?: string
  title: string
  text: string
  buttonText: string
  action: () => void
}
