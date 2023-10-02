import { useCallback, useRef } from 'react'

export const useThrottle = (cb: (...args: any[]) => void, delay: number = 500) => {
  const timerRef = useRef<boolean>(false)

  return useCallback(
    (...args: any[]) => {
      if (!timerRef.current) {
        cb(...args)
        timerRef.current = true
      }

      setTimeout(() => (timerRef.current = false), delay)
    },
    [cb, delay],
  )
}
