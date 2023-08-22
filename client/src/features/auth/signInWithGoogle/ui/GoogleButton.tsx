import { signInWithGoogle } from '@/features/auth/signInWithGoogle'
import Google from '@/shared/assets/icons/google.svg'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import cls from './GoogleButton.module.scss'

export const GoogleButton = () => {
  const dispatch = useAppDispatch()

  return (
    <span className={cls['icon-wrapper']} onClick={() => dispatch(signInWithGoogle())}>
      <Google />
    </span>
  )
}
