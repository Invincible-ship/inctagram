import { getUserAuthData } from '@/entities/User'
import { TGeneralInfo } from '../types/generalInfo'
import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const getProfileGeneralInfo = createDraftSafeSelector(
  getUserAuthData,
  (user): TGeneralInfo | undefined => {
    if (typeof user !== 'undefined') {
      const { userName, firstName = '', lastName = '', birthday, city, aboutMe } = user
      const birthdayToDate = birthday ? new Date(birthday) : undefined

      return {
        userName,
        firstName,
        lastName,
        birthday: birthdayToDate,
        city,
        aboutMe,
      }
    }
  },
)
