import React, {
    ChangeEvent,
    DetailedHTMLProps, forwardRef,
    InputHTMLAttributes,
    KeyboardEvent,
    ReactNode,
} from 'react'
import s from './Input.module.scss'
import '@/shared/styles/variables/common/_form.scss'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPropsType = Omit<DefaultInputPropsType, "type"> & {
    onChangeText?: (value: string) => void;
    onEnter?: () => void;
    error?: ReactNode;
    spanClassName?: string;
    type?: string;
    title?: string;
};

const Input = forwardRef<HTMLInputElement, InputPropsType>(
    (
        {
            onChange,
            onChangeText,
            onKeyPress,
            onEnter,
            error,
            className,
            spanClassName,
            id,
            type,
            title,

            ...restProps
        },
        ref,
    ) => {
        const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
            onChange?.(e);

            onChangeText?.(e.currentTarget.value);
        };
        const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
            onKeyPress?.(e);
            onEnter && // если есть пропс onEnter
            e.key === "Enter" && // и если нажата кнопка Enter
            onEnter() // то вызвать его
        }

        return (
            <div className={s.inputWrapper}>
                <div>{title}</div>
                <input
                    ref={ref}
                    id={id}
                    type={type ? type : "text"}
                    onChange={onChangeCallback}
                    onKeyPress={onKeyPressCallback}
                    className={`${s.styledInput} ${error?.message ? s.errorInput : ""}`}
                    {...restProps}
                    data-testid="input"
                />

                <div id={id ? id + "-span" : undefined}>
                    {error && <span className={`${s.error}`}>{error.message}</span>}
                </div>
            </div>
        );
    },
);
export default Input;