import { NextRequest, NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages } from '@/shared/config/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
}

const cookieName = 'i18next'

export function middleware(req: NextRequest) {
  let lng
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req?.cookies?.get(cookieName)?.value)
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  // Redirect if lng in path is not supported
  if (
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    const searchParams = req.nextUrl.searchParams
    return NextResponse.redirect(
      new URL(
        `/${lng}${req.nextUrl.pathname}${!!searchParams ? `?${searchParams.toString()}` : ''}`,
        req.url,
      ),
    )
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') as string | URL)
    const lngInReferer = languages.find(l => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  return NextResponse.next()
}
