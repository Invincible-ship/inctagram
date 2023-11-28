import { useCallback, useState } from 'react'

export const useCroppingImageTool = (cls: {
  readonly [key: string]: string
}): {
  isActive: boolean
  handleIconClick: () => void
  mods: Record<string, boolean>
} => {
  const [isActive, setIsActive] = useState<boolean>(false)

  const handleIconClick = useCallback(() => setIsActive(prev => !prev), [])

  const mods = {
    [cls.active]: isActive,
  }

  return { isActive, handleIconClick, mods }
}
