import { FC, ReactNode } from 'react'
import s from './../../SignUpAdditionPagesStyles/SignUpAdditionPages.module.scss'

export const CommonBlock: FC<CommonBlockProps> =
    ({ email, title, text, textSecondPart, children }) => {
        return <>
            <div className={s.accountMerging}>
                <div className={s.wrapper}>
                    <div className={s.body}>
                        <Title titleText={title} />
                        <div className={s.content}>
                            <p>{text} {email} {textSecondPart}</p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    }

const Title = ({ titleText }: TitleProps) => {
    return <div className={s.title}>
        <h3>{titleText}</h3>
    </div>
}

//========================================================================================================================================================

type CommonBlockProps = {
    title: string
    text: string | any
    textSecondPart?: string | any
    children?: ReactNode
    email?: string
}
type TitleProps = {
    titleText: string;
}
export type SignUpAdditionPagespProps = {
    lng: string,
    buttonAction?: () => void
}