import { OrientationValue } from '../../types/types'
import { CSSProperties } from 'react'

const squareOrientataionStyles: CSSProperties = {
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}

const narrowOrientataionStyles: CSSProperties = {
  inset: '0 0 0 10%',
  width: '80%',
  height: '100%',
  objectFit: 'cover',
}

const wideOrientataionStyles: CSSProperties = {
  inset: '21.875% 0 0 0',
  width: '100%',
  height: '56.25%',
  objectFit: 'cover',
}

export class ImageOrientation {
  private $image: HTMLImageElement
  private originalStyles: CSSProperties

  constructor(image: HTMLImageElement) {
    this.$image = image
    this.originalStyles = this.getOriginalStyles()
  }

  private getOriginalStyles(): CSSProperties {
    const styles = getComputedStyle(this.$image)

    return {
      inset: styles.getPropertyValue('inset'),
      width: styles.getPropertyValue('width'),
      height: styles.getPropertyValue('height'),
      objectFit: 'contain',
    }
  }

  public setOrientation(orientation: OrientationValue) {
    switch (orientation) {
      case 'original':
        return this.setStyles(this.originalStyles)
      case 'square':
        return this.setStyles(squareOrientataionStyles)
      case 'narrow':
        return this.setStyles(narrowOrientataionStyles)
      case 'wide':
        return this.setStyles(wideOrientataionStyles)
    }
  }

  private setStyles(styles: CSSProperties) {
    Object.keys(styles).forEach((key: string) => {
      // @ts-ignore
      this.$image.style[key] = styles[key]
    })
  }
}
