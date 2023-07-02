import { classNames } from "@/shared/lib/classNames/classNames"
import { FC } from "react"
import cls from './Overlay.module.scss'

type OverlayProps = {
  className?: string;
  onClick?: () => void;
}

export const Overlay: FC<OverlayProps> = (
  { className, onClick }
) => {
  return (
    <div 
      className={classNames(cls.Overlay, {}, [className])}
      onClick={onClick}
    />
  )
} 