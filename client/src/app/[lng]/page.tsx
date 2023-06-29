import { SignIn } from '@/features/auth/signIn/ui/signIn'
import { Signup } from '@/features/auth/signup/ui/signup'
import { useServerTranslation } from '@/shared/config/i18n/server'
import { LanguageParams } from '@/shared/config/i18n/types'

const Page = async ({ params: { lng } }: { params: LanguageParams }) => {
	const { t } = await useServerTranslation(lng)

	return (
		<div>
			{t('greeting')}
		</div>
	)
}

export default Page 