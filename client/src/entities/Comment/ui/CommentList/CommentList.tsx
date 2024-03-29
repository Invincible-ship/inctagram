import { CommentCard } from '@/entities/Comment/ui/CommentCard/CommentCard'
import { IComment } from '../../model/types/types'
import { FC, ReactNode, useMemo, useState } from 'react'
import { stringToDateTime } from '@/shared/utils/stringToDateTime'
import { HStack, VStack } from '@/shared/ui/Stack'
import cls from './CommentList.module.scss'
import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { classNames } from '@/shared/lib/classNames/classNames'

type CommentListProps = {
  className?: string
  comments: IComment[]
  all?: boolean
  visibleAmount?: number
  ownerCard?: ReactNode
}
export const CommentList: FC<CommentListProps> = ({
  className,
  comments,
  visibleAmount = 10,
  all,
  ownerCard,
}) => {
  const { t: commonT } = useClientTranslation()
  const { t } = useClientTranslation(Namespaces.COMMENT_LIST)
  const [page, setPage] = useState<number>(1)
  const [show, setShow] = useState<boolean>(!all)

  const sortedComments = useMemo(() => {
    return [...comments].sort(
      (a, b) => stringToDateTime(b.createdAt) - stringToDateTime(a.createdAt),
    )
  }, [comments])

  const visibleComments = useMemo(() => {
    return all ? sortedComments : sortedComments.slice(0, visibleAmount * page)
  }, [page, visibleAmount, all, sortedComments])

  const showNextComments = () => {
    setPage(prev => ++prev)
  }

  const showAllComments = () => {
    setShow(true)
  }

  const mods = {
    [cls.all]: all,
  }

  return show ? (
    <VStack className={classNames(cls.CommentList, mods, [className])} gap="16" max>
      {ownerCard}
      {visibleComments.map((comment, idx) => {
        // FIXME: change "key" prop to "comment.id" when comment api will be added
        return <CommentCard key={idx} comment={comment} t={t} commonT={commonT} />
      })}
      {sortedComments.length > visibleComments.length && (
        <HStack
          role="button"
          className={cls.labelNext}
          justify="center"
          onClick={showNextComments}
          max
        >
          {t('next-comments', { count: visibleAmount })}
        </HStack>
      )}
    </VStack>
  ) : (
    <HStack role="button" className={cls.labelAll} onClick={showAllComments} max>
      {t('all-comments', { count: comments.length })}
    </HStack>
  )
}
