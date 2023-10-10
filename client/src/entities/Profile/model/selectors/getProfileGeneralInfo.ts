import { getUserAuthData } from '@/entities/User'
import { TGeneralInfo } from '../../../../features/editableProfileSettings/model/types/generalInfo'
import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const getProfileGeneralInfo = createDraftSafeSelector(
  getUserAuthData,
  (user): TGeneralInfo | undefined => {
    if (typeof user !== 'undefined') {
      const { userName, firstName, lastName, birthday, city, aboutMe } = user
      const birthdayToDate = birthday ? new Date(birthday) : undefined

      return {
        userName,
        firstName: firstName == undefined || firstName == null ? '' : firstName,
        lastName: lastName == undefined || lastName == null ? '' : lastName,
        birthday: birthdayToDate,
        city: city || undefined,
        aboutMe: aboutMe || undefined,
      }
    }
  },
)
