"use client"
import s from './myprofile.module.scss'
import Avatar from "@/shared/ui/Avatar/Avatar"
import {Button, ButtonTheme} from "@/shared/ui/Button/Button"
import "@/shared/styles/variables/common.scss"
import "@/shared/styles/variables/common/_form.scss"
import Link from "next/link"
import ImageComponent from "@/shared/ui/ImageComponent/ImageComponent"
import man from "@/shared/assets/images/man.png"
import {useRouter} from "next/navigation"
import '@/shared/styles/variables/common.scss'

export const MyProfile = () => {
    const router = useRouter()
    const imageSources = [man, man, man, man]
    return (
        <div className={s.container}>
            <div className={s.profile}>
                <div className={s.navbar}>
                    <ul>
                        <li>Link 1</li>
                        <li>Link 2</li>
                        <li>Link 3</li>
                    </ul>
                </div>
                <div className={s.content}>
                    <div className={s.infoWrapper}>
                        <div className={s.avatarWrapper}>
                            <Avatar/>
                        </div>
                        <div>
                            <div className={`${s.wrapper} ${s.centered}`}>
                                <div className={s.urlProfile}>URLProfile</div>
                                <Button theme={ButtonTheme.SECONDARY} onClick={() => router.push('/profile/createprofile')}>Profile settings</Button>
                            </div>
                            <div className={s.followStatsContainer}>
                                <div className={s.followStat}>
                                    <div className={'b-title bt14'}>2218</div>
                                    <div className={'b-title bt14'}>Following</div>
                                </div>
                                <div className={s.followStat}>
                                    <div className={'b-title bt14'}>2358</div>
                                    <div className={'b-title bt14'}>Followers</div>
                                </div>
                                <div className={s.followStat}>
                                    <div className={'b-title bt14'}>2358</div>
                                    <div className={'b-title bt14'}>Publications</div>
                                </div>
                            </div>
                            <div className={`b-title bt16 ${s.text}`}>Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation elit, sed do eiusmod tempor incididunt ut labore
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco <Link
                                    className={s.link} href={'/'}>laboris nisi ut aliquip ex ea commodo
                                    consequat.</Link>
                            </div>
                        </div>
                    </div>
                    <div className={s.images}>
                        {imageSources.map((src, index) => (
                            <ImageComponent key={index} src={src} width={234} height={228}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}
