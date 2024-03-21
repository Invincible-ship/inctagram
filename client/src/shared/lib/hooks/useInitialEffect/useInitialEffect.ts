import { useEffect } from 'react'

export const useInitialEffect = (callback: () => void, dependencies: any[] = []) => {
  useEffect(() => {
    if (__PROJECT__ !== 'jest' && __PROJECT__ !== 'storybook') {
      const clearSideEffect = callback()

      if (typeof clearSideEffect === 'function') {
        return clearSideEffect
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}
