import React from 'react'
import Ava from '@/shared/assets/images/avatar.png'
import Image from 'next/image'

type PropsType = {
    width?: number
    height?: number
    src?: string
}

const ImageComponent = ({width,height,src}:PropsType) => {
    return (
        <Image
            src={src ? src : Ava}
            width={width ?? 204}
            height={height ?? 204}
            alt="Picture of the author"
        />
    )
}

export default ImageComponent