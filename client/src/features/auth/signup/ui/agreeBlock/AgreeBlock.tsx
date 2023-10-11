import {LanguageIds} from "@/shared/config/i18n/types";
import Link from "next/link";
import {Routes} from "@/shared/types/routes";
import style from "@/features/auth/signup/ui/signup.module.scss";
import {FC} from "react";
import {Checkbox} from "@/shared/ui/Checkbox/Checkbox";

type Props = {
	lngId: LanguageIds
	t: (key: string) => string
	checkboxHandler: (checked: boolean) => void
}


export const AgreeBlock: FC<Props> = ({lngId, t, checkboxHandler}) => {

	const handleAgree = (check: boolean) => {
		checkboxHandler(check);
	};

	return <div className={`b-title bt12 light align-center ${style.agreeBlock}`}>
		<Checkbox handleAgree={handleAgree}/>
		{t('agree.iAgreeTo')} &nbsp;
		<Link
			href={`/${lngId}${Routes.TERMS_OF_SERVICE}`}
			className={`b-title bt12 light ${style.linkRegistration}`}
		>
			<span>{t('agree.termsOfService')}</span>
		</Link>
		&nbsp; {t('agree.and')} &nbsp;
		<Link
			href={`/${lngId}${Routes.PRIVACY_POLICY}`}
			className={`b-title bt12 light ${style.linkRegistration}`}
		>
			<span>{t('agree.privacyPolicy')}</span>
		</Link>
	</div>;
}