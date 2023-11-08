import '@/shared/styles/index.scss'
import '@/shared/styles/variables/common.scss'
import { StoryFn } from '@storybook/react'
import { Inter } from 'next/font/google'

const inter = Inter({
  weight: ['400', '500', '600', '700', '900'],
  subsets: ['cyrillic', 'latin'],
})

export const StyleDecorator = (StoryComponent: StoryFn) => {
  return (
    <div className={`app ${inter.className}`}>
      <div className="app-container">
        <div className="page-container">
          <StoryComponent />
        </div>
      </div>
    </div>
  )
}
