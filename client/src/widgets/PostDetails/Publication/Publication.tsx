import s from '../PostDetails.module.scss'
import { PublicationForm } from '@/widgets/PostDetails/Publication/PublicationForm/PublicationForm'
import { PublicationDescription } from '@/widgets/PostDetails/Publication/PublicationDescription/PublicationDescription'
import { useState } from 'react'

type PropsPublication = {
  editMode: boolean
  setEditMode: (mode: boolean) => void
  avatar: string
  id: number
  description: string
  userName: string
  textValue: string
  setTextValue: (text: string) => void
}
export const Publication = (props: PropsPublication) => {
  const { avatar, description, id, userName, editMode, setEditMode, textValue, setTextValue } =
    props
  return (
    <>
      {editMode && (
        <PublicationForm
          textValue={textValue}
          setTextValue={setTextValue}
          description={description}
          id={id}
          setEditMode={setEditMode}
        />
      )}
      {!editMode && (
        <PublicationDescription userName={userName} avatar={avatar} textValue={textValue} />
      )}
    </>
  )
}
