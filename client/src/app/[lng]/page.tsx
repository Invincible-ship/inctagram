'use client'

import { getUserAuthData } from '@/entities/User'
import { SignOut } from '@/features/auth/signout'
import { LanguageContext } from '@/shared/lib/context/LanguageContext'
import { LOCAL_STORAGE_USER_ID_KEY } from '@/shared/const/localStorage'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'
import { Routes } from '@/shared/types/routes'
import { Button } from '@/shared/ui/Button/Button'
import { Pagination, usePagination } from '@/shared/ui/Pagination'
import { HStack, VStack } from '@/shared/ui/Stack'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'

const Page = () => {
  const lngId = useContext(LanguageContext)
  const userData = useSelector(getUserAuthData)
  const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY)
  const { currentPage, itemsOnPage, onChangePage, onChangePageAmount } = usePagination()

  return (
    <VStack gap="24">
      <h1>Home page</h1>
      <HStack gap="24" max>
        <Link href={`/${lngId}${Routes.PROFILE}/${userId}/edit?setting=general-info`}>
          <Button>Edit Profile</Button>
        </Link>
        <SignOut />
      </HStack>
      <div>
        <p>User Data: </p>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      </div>

      <Pagination
        itemsLength={1678}
        currentPage={currentPage}
        itemsOnPage={itemsOnPage}
        onChangePage={onChangePage}
        onChangePageAmount={onChangePageAmount}
      />
    </VStack>
  )
}

export default withAuth(Page, { routeRole: 'all' })
