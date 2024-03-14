'use client'

import { useClientTranslation } from '@/shared/config/i18n/client'
import { Namespaces } from '@/shared/config/i18n/types'
import { PostDetailsModalSkeleton } from '../PostDetailsModal/PostDetailsModal'
import { PostDetailsVariant } from '../../model/consts/variant'
import dynamic from 'next/dynamic'
import { PostDetailsCardSkeleton } from '../PostDetailsCard/PostDetailsCard'
const PostDetailsModal = dynamic(
  () => import('../PostDetailsModal/PostDetailsModal').then(mod => mod.PostDetailsModal),
  {
    loading: () => <PostDetailsModalSkeleton />,
  },
)
const PostDetailsCard = dynamic(
  () => import('../PostDetailsCard/PostDetailsCard').then(mod => mod.PostDetailsCard),
  {
    loading: () => <PostDetailsCardSkeleton />,
  },
)

type PostDetailsProps = {
  postId?: string
  className?: string
  variant?: PostDetailsVariant
}

export const PostDetails = ({
  postId,
  className,
  variant = PostDetailsVariant.MODAL,
}: PostDetailsProps) => {
  const { t } = useClientTranslation(Namespaces.POST_DETAILS)

  return variant === PostDetailsVariant.MODAL ? (
    <PostDetailsModal t={t} />
  ) : (
    <PostDetailsCard className={className} postId={postId as string} t={t} />
  )
}
