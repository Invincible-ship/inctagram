import { getProfileData } from '@/entities/Profile'
import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const getProfileGeneralInfo = createDraftSafeSelector(getProfileData, profile => {
  if (!profile) return

  const { userName, firstName, lastName, dateOfBirth, city, aboutMe } = profile
  const birthdayToDate = dateOfBirth ? new Date(dateOfBirth) : undefined

  return {
    userName,
    firstName: firstName == null ? '' : firstName,
    lastName: lastName == null ? '' : lastName,
    dateOfBirth: birthdayToDate,
    city: city || undefined,
    aboutMe: aboutMe || undefined,
  }
})
