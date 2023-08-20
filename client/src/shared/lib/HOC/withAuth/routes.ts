import { Routes } from '@/shared/types/routes'

export enum UserRole {
  ADMIN = 'admin',
}

export type RouteRole = 'auth' | 'all' | 'optional'

export type WithAuthOptions = {
  routeRole: RouteRole
  userRole?: UserRole
  redirectTo?: Routes
}
