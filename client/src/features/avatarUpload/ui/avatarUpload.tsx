"use client"

import React, {FC, FormEvent, useEffect, useRef, useState} from "react"
import { Cropper } from "react-cropper"
import "cropperjs/dist/cropper.css"
import "./avatarUpload.module.scss"
import {useClientTranslation} from "@/shared/config/i18n/client";
import {SignOutButton} from "@/features/auth/signout";
import {borderRadius} from "polished";
import Avatar from "react-avatar-edit";
import {Button} from "@/shared/ui/Button/Button";
import { addPersonalInfo } from "../model/actions";
import {generators} from "openid-client";


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

    const mapStateToProps = (state) => ({
        personalInfo: state.personalInfoReducer.personalInfo,
    });

    const mapDispatchToProps = (dispatch) => ({
        onAddPersonalInfo: (details) => dispatch(addPersonalInfo(details)),
    });


    const [fileInput, setFileInput] = useState<any>()
    const [hasInput, setHasInput] = useState(false)
    const [croppedImage, setCroppedImage] = useState<any>()
    const [fileName, setFileName] = useState<string>("")
    const [statusMessage, setStatusMessage] = useState("")
    const [sotreImage, setSotreImage] = useState([]);

    const dialogRef = useRef<HTMLDialogElement>(null)
    const cropperRef = useRef<any>(null)

    const [src, setSrc] = useState(null)
    const [preview, setPreview] = useState()
    // props.personalInfo.profileImg.length ? props.personalInfo.profileImg : ""

    const onClose = () => {
        setPreview( null)
        }

    const onCrop = (view) => {
        setPreview(view)
        }

    const saveImage = () => {
        setSotreImage([{ preview }]);
        // props.onSetProfileImage(img);
        setOpen(false);
    };
    // constructor(props) {
    //     super(props)
    //     const src = './example/einshtein.jpg'
    //     this.state = {
    //         preview: null,
    //         src
    //     }
    //     this.onCrop = this.onCrop.bind(this)
    //     this.onClose = this.onClose.bind(this)
    //     this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
    // }
    //
    // onClose() {
    //     this.setState({preview: null})
    // }
    //
    // onCrop(preview) {
    //     this.setState({preview})
    // }
    //
    // onBeforeFileLoad(elem) {
    //     if(elem.target.files[0].size > 71680){
    //         alert("File is too big!");
    //         elem.target.value = "";
    //     }
    // }

    //преобразует входной файл в строку base64
    function getBase64(file: any) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            console.log(reader.result)
            setFileInput(reader.result)
        }
        reader.onerror = function (error) {
            console.log('Error: ', error)
        }

        return reader.result
    }

    const handleFile = async(e: any) => {
        const file = e.currentTarget.files[0]
        if(props.sizeLimit && file.size > props.sizeLimit)
        {
            setStatusMessage("File is too large.")
        }
        else
        {
            console.log(file)
            setFileName(file.name)
            getBase64(file)
        }

    }

    const clearFileInput = () => {
        setHasInput(false)
        setFileInput(null)
        setCroppedImage(null)
        setFileName("")
    }

    // const saveImage = () => {
    //     props.setCroppedImage(croppedImage)
    //     props.setOriginalImage(fileInput)
    //     setStatusMessage("Image Saved Successfully")
    // }

    const dropHandler = (ev: any) => {
        console.log("File(s) dropped")

        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault()

        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...ev.dataTransfer.items].forEach((item, i) => {
                if (item.kind === "file" && (item.type === "image/png" || item.type === "image/gif" || item.type === "image/jpg" || item.type === "image/jpeg")) {
                    const file = item.getAsFile()
                    if(props.sizeLimit && file.size > props.sizeLimit)
                    {
                        setStatusMessage("File is too large.")
                    }
                    else
                    {
                        console.log(`… file[${i}].name = ${file.name}`)
                        setFileName(file.name)
                        getBase64(file)
                    }

                }
                else
                {
                    setStatusMessage("Invalid file type.")
                }
            })
        } else {
            // Use DataTransfer interface to access the file(s)
            [...ev.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`)
            })
        }
    }

    const dragOverHandler = (ev: any) => {
        console.log("File(s) in drop zone")

        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault()
    }


    useEffect(() => {
        setHasInput(fileInput !== null)
        console.log(fileInput)
        showEditor()
    }, [fileInput])

    useEffect(() => {
        setTimeout(() => {
            setStatusMessage("")
        }, 2000)
    }, [statusMessage])


    const showEditor = () => {
        if(fileInput) dialogRef.current?.showModal()
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    // const onCrop = () => {
    //     const cropper = cropperRef.current?.cropper
    //     console.log(cropper.getCroppedCanvas().toDataURL())
    //
    //     setCroppedImage(cropper.getCroppedCanvas().toDataURL())
    //     dialogRef.current?.close()
    // }

    return (

      <div>
        {croppedImage &&
          <div id="img-display">
            <div id="clear-button" onClick={() => {clearFileInput()}}>𐌢</div>
            <img id={props.round ? "round" : ""} width={props.width || 250 + "px"} src={croppedImage} />
            <div id="options-row" style={{width: props.width  || 250 + "px"}}>
              <button id="edit-button" onClick={showEditor}>Edit</button>
              <button id="save-button" style={{backgroundColor: props.color ? props.color : "dodgerblue"}} onClick={() => saveImage()}>Save</button>
            </div>
          </div>
            }
        <div id="drop-zone" style={{borderColor: props.color ? props.color : "dodgerblue", width: props.width || 250 + "px"}} onDrop={() => dropHandler(event)} onDragOver={() => dragOverHandler(event)}>

          <input id="image-input" style={{width: props.width || 250 + "px"}} type="file" accept=".png,.jpg,.jpeg,.gif" onInput={(e) => {handleFile(e)}} />
          <Button
              accept=".png,.jpg,.jpeg,.gif"
              type="file"
              onInput={(e) => {handleFile(e)}}
              onDrop={() => dropHandler(event)}
              onDragOver={() => dragOverHandler(event)}
              onClick={handleClickOpen}>
              Add a Profile Photo
          </Button>
        </div>
        {statusMessage && <p id="status-msg">{statusMessage}</p>}
          <dialog ref={dialogRef} id="editor" open={open} onClose={handleClose}>
              <div>
                  <Avatar
                      width={390}
                      height={295}
                      onCrop={onCrop}
                      onClose={onClose}
                      ref={cropperRef}
                      // onBeforeFileLoad={this.onBeforeFileLoad}
                      src={src}
                  />
                  {/*{preview && <img src={preview} />}*/}
                  {/*<img src={this.state.preview} alt="Preview" />*/}
              </div>
              <div id="editor-button-row">
                  <Button id="crop-button" type="submit"  className={'styled-btn styled-btn-1'} onClick={saveImage}>Crop</Button>
              </div>
              {/*<div id={props.round ? "round" : "rect"}>*/}
              {/*    <Cropper*/}
              {/*        src={fileInput}*/}
              {/*        style={{height: 500, width: 500}}*/}
              {/*        initialAspectRatio={props.aspect}*/}
              {/*        aspectRatio={props.aspect}*/}
              {/*        guides={false}*/}
              {/*        ref={cropperRef}*/}
              {/*        highlight={false}*/}
              {/*    />*/}
              {/*</div>*/}
              {/*<div id="editor-button-row">*/}
              {/*    <button id="crop-button" onClick={onCrop}>Crop</button>*/}
              {/*</div>*/}
          </dialog>
      </div>
    )
}

