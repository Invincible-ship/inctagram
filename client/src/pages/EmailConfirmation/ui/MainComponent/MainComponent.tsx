'use client'
import { FC, ReactNode } from 'react'
import s from './emailConfirmation.module.scss'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { useClientTranslation } from '@/shared/config/i18n/client'

export const MainComponent: FC<MainComponentProps> = ({
  title,
  text,
  buttonText,
  action,
  icon,
  namespaces,
}) => {
  const { t } = useClientTranslation('', namespaces)
  return (
    <>
      <div className={s.emailConfiramtion}>
        <div className={s.wrapper}>
          <div className={s.body}>
            <Header title={t(title)} />
            <TextContent text={t(text)} />
            <ImageComponent icon={icon} />
            <ButtonComponent action={action} buttonText={t(buttonText)} />
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
  icon: ReactNode
  namespaces: string
}

type HeaderProps = {
  title: string
}
const Header = ({ title }: HeaderProps) => {
  return (
    <>
      <div className={s.title}>
        <h3>{title}</h3>
      </div>
    </>
  )
}

type TextContentProps = {
  text: string
}
const TextContent = ({ text }: TextContentProps) => {
  return (
    <div className={s.content}>
      <p>{text}</p>
    </div>
  )
}

type ImageComponentProps = {
  icon: ReactNode
}
const ImageComponent: FC<ImageComponentProps> = ({ icon }) => {
  return (
    <>
      <div className={s.image}>{icon}</div>
    </>
  )
}

type ButtonComponentProps = {
  action: () => void
  buttonText: string
}

const ButtonComponent: FC<ButtonComponentProps> = ({ action, buttonText }) => {
  return (
    <div className={s.buttons}>
      <Button onClick={action} className={s.btn} theme={ButtonTheme.DEFAULT}>
        {buttonText}
      </Button>
    </div>
  )
}
