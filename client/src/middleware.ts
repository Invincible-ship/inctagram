import { NextRequest, NextResponse, userAgent } from 'next/server'
import MobileDetect from 'mobile-detect'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages } from '@/shared/config/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
}

const cookieName = 'i18next'

export function middleware(req: NextRequest) {
  const reqHeaders = new Headers(req.headers)
  // Defining device type
  const md = new MobileDetect(req.headers.get('user-agent') as string)
  const isMobile = JSON.stringify(Boolean(md.mobile()))
  reqHeaders.set('is-mobile', isMobile)
  const reqWithNewHeaders = { request: { headers: reqHeaders } }

  // Defining language
  let lng
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req?.cookies?.get(cookieName)?.value)
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  // Redirect if lng in path is not supported
  if (
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    const searchParams = !!req.nextUrl.searchParams ? `?${req.nextUrl.searchParams.toString()}` : ''
    const response = NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}${searchParams}`, req.url),
    )
    response.headers.set('is-mobile', isMobile)
    return response
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') as string | URL)
    const lngInReferer = languages.find(l => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next(reqWithNewHeaders)
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  return NextResponse.next(reqWithNewHeaders)
}
