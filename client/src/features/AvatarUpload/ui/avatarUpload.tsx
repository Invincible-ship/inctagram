'use client'

import React, { createRef, FC, useState } from 'react'
import 'cropperjs/dist/cropper.css'
import './avatarUpload.scss'
import { Cropper, ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { Modal } from '@/shared/ui/Modal/Modal'

// this transforms file to base64
const file2Base64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result?.toString() || '')
    reader.onerror = error => reject(error)
  })
}

type avatarUploadProps = {
  lng: string
  setCroppedImage: (value: string) => void
  setOriginalImage: (value: string) => void
  round?: boolean
  width?: number
  aspect: number
  color?: string
  sizeLimit?: number
  cropend?: Event
  isOpen?: boolean
  onClose?: () => void
}

// type avatarUpload = {
//     lng: string;
//
// }
// {lng}
// : FC<avatarUpload>
export const AvatarUpload: FC<avatarUploadProps> = props => {
  // ref of the file input
  const fileRef = createRef<HTMLInputElement>()

  // the selected image
  const [uploaded, setUploaded] = useState(null as string | null)

  // the resulting cropped image
  const [cropped, setCropped] = useState(null as string | null)

  // the reference of cropper element
  const cropperRef = createRef<ReactCropperElement>()

  const onFileInputChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const file = e.target?.files?.[0]
    if (file) {
      file2Base64(file).then(base64 => {
        setUploaded(base64)
      })
    }
  }

  const onCrop = () => {
    const imageElement: any = cropperRef?.current
    const cropper: any = imageElement?.cropper
    setCropped(cropper.getCroppedCanvas().toDataURL())
  }
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div>
            <p>Add a Profile Photo</p>
            <p onClick={handleCloseModal}>x</p>
          </div>
          {uploaded ? (
            <div>
              <Cropper
                src={uploaded}
                style={{ height: 400, width: 400 }}
                autoCropArea={1}
                aspectRatio={1}
                viewMode={3}
                guides={false}
                ref={cropperRef}
              />
              <button onClick={onCrop}>Crop</button>
            </div>
          ) : (
            <div>
              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileRef}
                onChange={onFileInputChange}
                accept="image/png,image/jpeg,image/gif"
              />
              <button onClick={() => fileRef.current?.click()}>Select from Computer</button>
            </div>
          )}
        </Modal>
      )}
      {cropped && <img src={cropped} alt="Cropped!" />}

      <button onClick={handleOpenModal}>TEST</button>
    </div>
  )
}
