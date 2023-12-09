import { CSSProperties } from 'react'

export const getFilterOriginalStyles = (src: string): Promise<CSSProperties> => {
  return new Promise<CSSProperties>(resolve => {
    const image = new Image()
    image.src = src

    const calculateFilterInset = (width: string, height: string): string => {
      let inset: string = ''
      const widthNumber = parseFloat(width)
      const heightNumber = parseFloat(height)

      if (widthNumber < 100) inset = `0 0 0 ${(100 - widthNumber) / 2}%`
      if (heightNumber < 100) inset = `${(100 - heightNumber) / 2}% 0 0 0`

      return inset
    }

    image.onload = function () {
      const self = this as HTMLImageElement
      const { width, height } = self

      const filterOriginalWidth = width < height ? `${(width / height) * 100}%` : '100%'
      const filterOriginalHeight = height < width ? `${(height / width) * 100}%` : '100%'
      const filterInset = calculateFilterInset(filterOriginalWidth, filterOriginalHeight)

      return resolve({
        width: filterOriginalWidth,
        height: filterOriginalHeight,
        inset: filterInset,
      })
    }
  })
}
