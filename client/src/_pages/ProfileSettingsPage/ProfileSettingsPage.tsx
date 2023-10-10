'use client'

import { EditableProfileSettings } from '@/features/editableProfileSettings/ui/EditableProfileSettings/EditableProfileSettings'
import { withAuth } from '@/shared/lib/HOC/withAuth/withAuth'

const ProfileSettingsPage = () => {
  return <EditableProfileSettings />
}

export default withAuth(ProfileSettingsPage, { routeRole: 'all' })
