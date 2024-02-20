import { PublicationForm } from '@/widgets/PostDetails/ui/Publication/PublicationForm/PublicationForm'
import { PublicationDescription } from '@/widgets/PostDetails/ui/Publication/PublicationDescription/PublicationDescription'
import { useSelector } from 'react-redux'
import { StateSchema } from '@/providers/StoreProvider'
import { IPost } from '@/entities/Post'

type PropsPublication = {
  post: IPost
}
export const Publication = (props: PropsPublication) => {
  const textValue = useSelector((state: StateSchema) => state.postDetails.textValue)
  const editMode = useSelector((state: StateSchema) => state.postDetails.editMode)
  const { avatarOwner, description, id, userName } = props.post
  return (
    <>
      {editMode && <PublicationForm textValue={textValue} description={description} id={id} />}
      {!editMode && (
        <PublicationDescription
          userName={userName}
          avatar={avatarOwner}
          description={description}
        />
      )}
    </>
  )
}
