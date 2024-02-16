import { LanguageIds } from '@/shared/config/i18n/types'
import Link from 'next/link'
import { Routes } from '@/shared/types/routes'
import style from '@/features/auth/signup/ui/signup.module.scss'
import { FC } from 'react'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { UseFormGetValues } from 'react-hook-form'
import { FormSchemaType } from '../../lib/validationConstants/validationConstants'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { setDefaultFormValues } from '../../model/slice/signUpSlice'

type Props = {
  lngId: LanguageIds
  t: (key: string) => string
  setCheckedAgree: (checkedAgree: boolean) => void
  checkedAgree: boolean
  getValues: UseFormGetValues<FormSchemaType>
}

export const AgreeBlock: FC<Props> = ({ lngId, t, setCheckedAgree, checkedAgree, getValues }) => {
  const dispatch = useAppDispatch()
  const saveFormValues = () => dispatch(setDefaultFormValues(getValues()))

  return (
    <div className={`b-title bt12 light ${style.agreeBlock}`}>
      <Checkbox handleAgree={setCheckedAgree} checked={checkedAgree} />
      <span>{t('agree.iAgreeTo')} &nbsp;</span>
      <span onClick={saveFormValues}>
        <Link
          href={`/${lngId}${Routes.TERMS_OF_SERVICE}`}
          className={`b-title bt12 light ${style.linkRegistration}`}
        >
          <span>{t('agree.termsOfService')}</span>
        </Link>
      </span>
      <span>&nbsp; {t('agree.and')} &nbsp;</span>
      <span onClick={saveFormValues}>
        <Link
          href={`/${lngId}${Routes.PRIVACY_POLICY}`}
          className={`b-title bt12 light ${style.linkRegistration}`}
        >
          <span>{t('agree.privacyPolicy')}</span>
        </Link>
      </span>
    </div>
  )
}
