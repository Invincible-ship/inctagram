import { ButtonHTMLAttributes, FC } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

export enum ButtonTheme {
  DEFAULT = "primary",
  SECONDARY = "secondary",
  OUTLINED = "outlined",
  TEXT = "text",
}

interface ButtonProps extends
  ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
}

export const Button: FC<ButtonProps> = ({ className = "", theme = ButtonTheme.DEFAULT, children, ...rest }) => {
  return (
    <button 
      type="button"
      className={
        classNames(cls.Button, {}, [className, cls[theme]])
      }
      {...rest}
    >
      {children}
    </button>
  );
};
