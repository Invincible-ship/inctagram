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