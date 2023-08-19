"use client"

import React, { createRef, FC, FormEvent, useEffect, useRef, useState } from 'react'
import 'cropperjs/dist/cropper.css'
import './avatarUpload.scss'
import {useClientTranslation} from "@/shared/config/i18n/client";
import {borderRadius} from "polished";
import Avatar from "react-avatar-edit";
import {Button} from "@/shared/ui/Button/Button";
import { addPersonalInfo } from "../model/actions";
import {generators} from "openid-client";
import { Cropper, ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'

// this transforms file to base64
const file2Base64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '')
        reader.onerror = (error) => reject(error);
    });
};

type avatarUploadProps = {
    lng: string;
    setCroppedImage: (value: string) => void;
    setOriginalImage: (value: string) => void;
    round?: boolean;
    width?: number;
    aspect: number;
    color?: string;
    sizeLimit?: number;
    cropend?: Event;
}


// type avatarUpload = {
//     lng: string;
//
// }
// {lng}
// : FC<avatarUpload>
export const AvatarUpload: FC<avatarUploadProps> = (props ) => {

    // const {t} = useClientTranslation(lng, 'resetPage')

    // ref of the file input
    const fileRef = createRef<HTMLInputElement>();

    // the selected image
    const [uploaded, setUploaded] = useState(null as string | null);

    // the resulting cropped image
    const [cropped, setCropped] = useState(null as string | null);

    // the reference of cropper element
    const cropperRef = createRef<ReactCropperElement>();

    const onFileInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target?.files?.[0];
        if (file) {
            file2Base64(file).then((base64) => {
                setUploaded(base64);
            });
        }
    }

    const onCrop = () => {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        setCropped(cropper.getCroppedCanvas().toDataURL())
    }

    return (
        <div>
            <div>
                <Cropper
                    src={uploaded}
                    style={{height: 400, width: 400}}
                    autoCropArea={1}
                    aspectRatio={1}
                    viewMode={3}
                    guides={false}
                    ref={cropperRef}
                />
                <button onClick={onCrop}>Crop</button>
                {cropped && <img src={cropped} alt="Cropped!"/>}
            </div>
            <input
                type="file"
                style={{display: 'none'}}
                ref={fileRef}
                onChange={onFileInputChange}
                accept="image/png,image/jpeg,image/gif"
            />


            <button
                onClick={() => fileRef.current?.click()}
            >Upload something!
            </button>
        </div>
    )
}

