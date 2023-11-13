import successSrc from '../../../../../public/images/confirmation-success.png'
import invalidSrc from '../../../../../public/images/confirmation-invalid.png'
import { CONFIRMATION_STATUS } from '@/features/auth/confirmationEmailViaCode'
import { StaticImageData } from 'next/image'

const propsMap = {
  valid: {
    src: successSrc,
    alt: 'Success confirmation email image',
  },
  inValid: {
    src: invalidSrc,
    alt: 'Invalid confirmation email image',
  },
}

type ImageProps = {
  src: StaticImageData
  alt: string
}

export const getImageProps = (status: CONFIRMATION_STATUS): ImageProps => {
  const state = status == 'invalid' ? 'inValid' : 'valid'

  return {
    src: propsMap[state].src,
    alt: propsMap[state].alt,
  }
}
