import { Routes } from '@/shared/types/routes'
import { ReactNode } from 'react'

export enum UserRole {
  ADMIN = 'admin',
}

export type RouteRole = 'auth' | 'all' | 'optional'

export type WithAuthOptions = {
  routeRole: RouteRole
  userRole?: UserRole
  redirectTo?: Routes
  fallback?: ReactNode
}
