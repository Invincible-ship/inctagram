import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle'
import { useEffect, useState } from 'react'

export const useInternetConection = (frequency: number): boolean => {
  const [isConnectionExist, setIsConnectionExist] = useState(true)

  const throttledCheckConnection = useThrottle(() => {
    const connection = window.navigator.onLine

    if (isConnectionExist != connection) setIsConnectionExist(connection)
  }, frequency)

  useEffect(() => {
    throttledCheckConnection()
  }, [throttledCheckConnection])

  return isConnectionExist
}
