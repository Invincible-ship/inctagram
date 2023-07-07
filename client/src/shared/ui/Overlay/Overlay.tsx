import { classNames } from "@/shared/lib/classNames/classNames"
import { FC, memo } from "react"
import cls from './Overlay.module.scss'

type OverlayProps = {
  className?: string;
  onClick?: () => void;
}

// eslint-disable-next-line
export const Overlay: FC<OverlayProps> = memo((
  { className, onClick }
) => (
  <div 
      className={classNames(cls.Overlay, {}, [className])}
      onClick={onClick}
    />
))