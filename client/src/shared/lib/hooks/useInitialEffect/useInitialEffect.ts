import { useEffect } from 'react'

export const useInitialEffect = (callback: () => void, dependencies: any[] = []) => {
  useEffect(() => {
    if (__PROJECT__ !== 'jest' && __PROJECT__ !== 'storybook') {
      callback()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}
