import { MyImage } from '@/shared/ui/MyImage/MyImage'
import { HStack, VStack } from '@/shared/ui/Stack'
import { FC } from 'react'
import cls from './PostInfoBlock.module.scss'
import { getFormattedPublciationDate } from '@/shared/utils/getFormattedPublciationDate'
import { useDateFormatter } from '@/shared/lib/hooks/useDateFormatter/useDateFormatter'
import { TFunction } from 'i18next'
import { Namespaces } from '@/shared/config/i18n/types'
import { FlexGap } from '@/shared/ui/Stack/Flex/Flex'
import { useClientTranslation } from '@/shared/config/i18n/client'

type PostInfoBlockProps = {
  likesCount: number
  avatarUrls?: string[]
  createdAt: string
  t: TFunction<Namespaces, undefined>
}

const avatarsGap = {
  '1': '12',
  '2': '4',
  '3': undefined,
} as Record<string, FlexGap | undefined>

export const PostInfoBlock: FC<PostInfoBlockProps> = ({ likesCount, avatarUrls, createdAt, t }) => {
  const { t: commonT } = useClientTranslation()
  const formatter = useDateFormatter({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const gap = avatarUrls?.length ? avatarsGap[String(avatarUrls.length)] : '12'

  return (
    <VStack className={cls.PostInfoBlock} gap="4" max>
      <HStack align="center" gap={gap}>
        <HStack className={cls.avatarsContainer}>
          {avatarUrls?.map((url, idx) => (
            <MyImage
              key={idx}
              src={url}
              width={24}
              height={24}
              wrapperClassName={cls.avatar}
              style={{ borderRadius: '50%' }}
              alt="Avatar icon"
            />
          ))}
        </HStack>
        <HStack gap="4">
          {likesCount}
          <span className={cls.likeText}>&quot;{t('info.likes')}&quot;</span>
        </HStack>
      </HStack>
      <HStack className={cls.date}>
        {getFormattedPublciationDate(createdAt, formatter, commonT)}
      </HStack>
    </VStack>
  )
}
