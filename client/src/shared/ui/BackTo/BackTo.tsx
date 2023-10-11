import style from "./BackTo.module.scss";
import Link from "next/link";
import {FC} from "react";
import ArrowBack from '@/shared/assets/icons/arrow-back.svg'
import {LanguageIds} from "@/shared/config/i18n/types";

type Props = {
	link: string
	title: string
	lngId?: LanguageIds
}

export const BackTo: FC<Props> = ({link, title, lngId}) => {
	return (
		<div className={style.backToBlock}>
			<Link
				href={`/${lngId}${link}`}
				className={`b-title bt16 semibold align-center`}
			>
				<div className={`b-title bt14 ${style.arrowAndTextBlock}`}>
					<ArrowBack />
					<p>{title}</p>
				</div>
			</Link>
		</div>

	)
}