import { Inter } from 'next/font/google'
import '@/shared/styles/index.scss'
import '@/shared/styles/variables/common.scss'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
  title: 'Inctagram | Social Media Service',
  description: 'Chat and share ',
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default RootLayout
