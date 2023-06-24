// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
