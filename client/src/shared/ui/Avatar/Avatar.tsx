import s from './Avatar.module.scss'
import ImageComponent from "@/shared/ui/ImageComponent/ImageComponent"


type PropsType = {
    image?: string
}

const Avatar = ({image}: PropsType) => {
    return (
        <div style={{borderRadius: '50%'}} className={s.avatar}>
            {image ? <img style={{borderRadius: '50%'}} src={image} alt='avatar'  /> : <ImageComponent/>}
        </div>
    );
};


export default Avatar;
