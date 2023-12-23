import { setPostImageFilter } from '@/features/createPost/model/slice/createPostSlice'
import { ImageFilter, ImageVariant } from '@/shared/ui/MyImage/MyImage'
import { CreatePostImage } from '../types/types'
import { base64ToFile } from '@/shared/utils/base64ToFile'

type AdditionalFilter = {
  blendMode?: GlobalCompositeOperation
  background?: string
}

type Filter = {
  major: string
  additional: AdditionalFilter[]
}

const filters: Record<ImageFilter, Filter> = {
  noraml: {
    major: '',
    additional: [],
  },
  clarendon: {
    major: 'contrast(120%) saturate(125%)',
    additional: [
      {
        blendMode: 'overlay',
        background: 'rgba(127, 187, 227, 0.2)',
      },
    ],
  },
  lark: {
    major: 'contrast(.9)',
    additional: [
      {
        blendMode: 'color-dodge',
        background: '#22253f',
      },
      {
        blendMode: 'darken',
        background: 'rgba(242, 242, 242, 0.75)',
      },
    ],
  },
  gingham: {
    major: 'brightness(1.05) hue-rotate(-10deg)',
    additional: [
      {
        blendMode: 'soft-light',
        background: '#e6e6fa',
      },
    ],
  },
  moon: {
    major: 'grayscale(1) contrast(1.1) brightness(1.1)',
    additional: [
      {
        blendMode: 'soft-light',
        background: '#a0a0a0',
      },
      {
        blendMode: 'lighten',
        background: '#383838',
      },
    ],
  },
  aden: {
    major: '',
    additional: [
      {
        blendMode: 'darken',
        background: 'aden-gradient',
      },
    ],
  },
  brannan: {
    major: 'sepia(.5) contrast(1.4)',
    additional: [
      {
        blendMode: 'lighten',
        background: 'rgba(161, 44, 199, 0.11)',
      },
    ],
  },
  inkwell: {
    major: 'sepia(.3) contrast(1.1) brightness(1.1) grayscale(1)',
    additional: [],
  },
  reyes: {
    major: 'sepia(.22) brightness(1.1) contrast(.85) saturate(.75)',
    additional: [
      {
        blendMode: 'soft-light',
        background: 'rgba(239, 205, 173, 0.5)',
      },
    ],
  },
}

const mapOrientationToAspectRatio: Record<Exclude<ImageVariant, ImageVariant.ORIGINAL>, number> = {
  square: 1 / 1,
  narrow: 4 / 5,
  wide: 16 / 9,
}

const isWithAspectRatio = (orientation?: ImageVariant): boolean =>
  orientation != ImageVariant.ORIGINAL

const isWithFilter = (filter?: ImageFilter) => filter != ImageFilter.NORMAL

const isWithScale = (scale?: number) => scale != 1

const isImageModifed = (orientation?: ImageVariant, filter?: ImageFilter, scale?: number) =>
  isWithAspectRatio(orientation) || isWithFilter(filter) || isWithScale(scale)

export const getEditedImages = (images: CreatePostImage[] | []): Promise<File[]> => {
  return new Promise<File[]>(async resolve => {
    const files: File[] = []

    images.forEach(({ file, src, scale, orientation, filter }, index) => {
      const isLastImage = index == images.length - 1

      if (!isImageModifed(orientation, filter, scale)) {
        files.push(file)

        return isLastImage ? setTimeout(() => resolve(files)) : null
      }

      const inputImage = new Image()
      const imageScale = scale as number

      inputImage.onload = function () {
        const outputImage = document.createElement('canvas')

        const { outputWidth, outputHeight, outputX, outputY } = cropImage(
          inputImage,
          orientation as ImageVariant,
          imageScale,
        )

        outputImage.width = outputWidth
        outputImage.height = outputHeight

        const ctx = outputImage.getContext('2d') as CanvasRenderingContext2D

        if (filter) ctx.filter = filters[filter].major

        ctx.drawImage(
          inputImage,
          outputX,
          outputY,
          inputImage.width * imageScale,
          inputImage.height * imageScale,
        )

        if (filter && isWithFilter(filter)) {
          setAdditionalImageFilters(ctx, outputImage, filter)
        }

        const newDataUrl = outputImage.toDataURL('image/jpeg')

        const modifedFile = base64ToFile(newDataUrl, file.name)
        files.push(modifedFile)

        if (isLastImage) resolve(files)
      }

      inputImage.src = src
    })
  })
}

type Position = {
  outputWidth: number
  outputHeight: number
  outputX: number
  outputY: number
}

const cropImage = (
  inputImage: HTMLImageElement,
  orientation: ImageVariant,
  scale: number,
): Position => {
  let aspectRatio: number = 0

  if (isWithAspectRatio(orientation)) {
    aspectRatio =
      mapOrientationToAspectRatio[orientation as Exclude<ImageVariant, ImageVariant.ORIGINAL>]
  }

  const inputWidth = inputImage.naturalWidth
  const inputHeight = inputImage.naturalHeight

  const inputImageAspectRatio = inputWidth / inputHeight

  let outputWidth = inputWidth
  let outputHeight = inputHeight

  if (isWithAspectRatio(orientation)) {
    if (inputImageAspectRatio > aspectRatio) {
      outputWidth = inputHeight * aspectRatio
    } else if (inputImageAspectRatio < aspectRatio) {
      outputHeight = inputHeight / aspectRatio
    }
  }

  const outputX = (outputWidth - inputWidth * scale) * 0.5
  const outputY = (outputHeight - inputHeight * scale) * 0.5

  return {
    outputWidth,
    outputHeight,
    outputX,
    outputY,
  }
}

const setAdditionalImageFilters = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  filter: ImageFilter,
) => {
  filters[filter].additional.forEach(({ blendMode, background }) => {
    if (blendMode) ctx.globalCompositeOperation = blendMode
    if (background) {
      let fill: string | CanvasGradient = background

      if (background == 'aden-gradient') {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop(0, 'rgba(66, 10, 14, 0.2)')
        gradient.addColorStop(1, 'transparent')
        fill = gradient
      }

      ctx.fillStyle = fill
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  })
}
