import { TextArea } from '@/shared/ui/TextArea/TextArea'
import { Button } from '@/shared/ui/Button/Button'
import s from '../PostDetails.module.scss'
import { ChangeEvent, useState } from 'react'
import Image from 'next/image'

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing\n' +
  'elit, sed do eiusmod tempor incididunt ut labore et\n' +
  'dolore magna aliqua.'

type PropsPublication = {
  editMode: boolean
  setEditMode: (mode: boolean) => void
}
export const Publication = ({ editMode, setEditMode }: PropsPublication) => {
  const [textValue, setTextValue] = useState(text)
  return (
    <div className={s.publicationBlock}>
      {editMode && (
        <PublicationForm
          setEditMode={setEditMode}
          textValue={textValue}
          setTextValue={setTextValue}
        />
      )}
      {!editMode && <PublicationDescription textValue={textValue} />}
    </div>
  )
}

type PropsPublicationForm = {
  setTextValue: (textValue: string) => void
  setEditMode: (mode: boolean) => void
  textValue: string
}
export const PublicationForm = (props: PropsPublicationForm) => {
  const { textValue, setTextValue, setEditMode } = props
  const onClickSaveChangesHandler = () => {
    setTextValue(textValue)
    setEditMode(false)
  }
  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value)
  }

  return (
    <form className={s.form}>
      <TextArea
        className={s.textArea}
        id="publication descriptions"
        title="Add publication descriptions"
        withCounter={true}
        value={textValue}
        onChange={onChangeHandler}
      />
      <Button className={s.button} type="submit" onClick={onClickSaveChangesHandler}>
        Save Changes
      </Button>
    </form>
  )
}

const avatar =
  'https://www.ixbt.com/img/n1/news/2021/10/2/22459ff25f8eff76bddf34124cc2c85b16f4cd4a_large.jpg'
type PropsPublicationDescription = {
  textValue: string
}
export const PublicationDescription = ({ textValue }: PropsPublicationDescription) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          fontSize: '14px',
          margin: '15px 0 5px 0',
        }}
      >
        <Image className={s.imageAvatar} width={34} height={34} src={avatar} alt={'avatar'} />
        <div style={{ color: '#FFFFFF' }}>
          <span style={{ fontWeight: '600', marginRight: '4px' }}>{'URLProfiele'}</span>
          {textValue}
          <div style={{ color: '#8D9094', fontSize: '12px', marginTop: '5px' }}>2 hours ago</div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          fontSize: '14px',
          margin: '15px 0 5px 0',
        }}
      >
        <Image className={s.imageAvatar} width={34} height={34} src={avatar} alt={'avatar'} />
        <div style={{ color: '#FFFFFF' }}>
          <span style={{ fontWeight: '600', marginRight: '4px' }}>{'URLProfiele'}</span>
          {textValue}
          <div style={{ color: '#8D9094', fontSize: '12px', marginTop: '5px' }}>2 hours ago</div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          fontSize: '14px',
          margin: '15px 0 5px 0',
        }}
      >
        <Image className={s.imageAvatar} width={34} height={34} src={avatar} alt={'avatar'} />
        <div style={{ color: '#FFFFFF' }}>
          <span style={{ fontWeight: '600', marginRight: '4px' }}>{'URLProfiele'}</span>
          {textValue}
          <div style={{ color: '#8D9094', fontSize: '12px', marginTop: '5px' }}>2 hours ago</div>
        </div>
      </div>
    </>
  )
}
