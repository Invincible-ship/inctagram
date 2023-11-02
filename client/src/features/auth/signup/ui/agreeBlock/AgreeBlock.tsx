import {LanguageIds} from "@/shared/config/i18n/types";
import Link from "next/link";
import {Routes} from "@/shared/types/routes";
import style from "@/features/auth/signup/ui/signup.module.scss";
import {FC} from "react";
import {Checkbox} from "@/shared/ui/Checkbox/Checkbox";

type Props = {
	lngId: LanguageIds
	t: (key: string) => string
	setCheckedAgree: (checkedAgree: boolean) => void
	checkedAgree: boolean
}


export const AgreeBlock: FC<Props> = ({lngId, t, setCheckedAgree, checkedAgree}) => {


	return <div className={`b-title bt12 light ${style.agreeBlock}`}>
		<Checkbox handleAgree={setCheckedAgree} checkedAgree={checkedAgree}/>
			<span>{t('agree.iAgreeTo')} &nbsp;</span>
		<Link
			href={`/${lngId}${Routes.TERMS_OF_SERVICE}`}
			className={`b-title bt12 light ${style.linkRegistration}`}
		>
			<span>{t('agree.termsOfService')}</span>
		</Link>
		<span>&nbsp; {t('agree.and')} &nbsp;</span>
		<Link
			href={`/${lngId}${Routes.PRIVACY_POLICY}`}
			className={`b-title bt12 light ${style.linkRegistration}`}
		>
			<span>{t('agree.privacyPolicy')}</span>
		</Link>
	</div>;
}