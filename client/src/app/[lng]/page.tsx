import { useServerTranslation } from '@/shared/config/i18n/server'
import { LanguageParams } from '@/shared/config/i18n/types'
import {Signup} from "@/features/auth/signup/ui/signup";

const Page = async ({ params: { lng } }: { params: LanguageParams }) => {
  const { t } = await useServerTranslation(lng)

  return (
    <div>
      {t('greeting')}
      <Signup/>
    </div>
  )
}

export default Page
