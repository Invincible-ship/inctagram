import successSrc from '../../../../public/images/confirmation-success.png'
import invalidSrc from '../../../../public/images/confirmation-invalid.png'
import { CONFIRMATION_STATUS } from '@/features/auth/resendLink'
import { StaticImageData } from 'next/image'

const propsMap = {
  valid: {
    src: successSrc,
    alt: 'Success confirmation email image',
    wrapperWidth: 432,
  },
  inValid: {
    src: invalidSrc,
    alt: 'Invalid confirmation email image',
    wrapperWidth: 473,
  },
}

type ImageProps = {
  src: string | StaticImageData
  alt: string
  wrapperWidth: number
}

export const getImageProps = (status: CONFIRMATION_STATUS): ImageProps => {
  const state = status == 'invalid' ? 'inValid' : 'valid'

  return {
    src: propsMap[state].src,
    alt: propsMap[state].alt,
    wrapperWidth: propsMap[state].wrapperWidth,
  }
}
