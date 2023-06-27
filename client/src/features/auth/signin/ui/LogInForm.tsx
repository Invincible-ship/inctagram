import s from './LoginForm.module.scss'
import {Button, ButtonTheme} from "@/shared/ui/Button/Button"
import Link from "next/link"
import {useForm} from "react-hook-form"

type LogInFormProps = {
	// email?: string
	// password?: string
}

type FormData  = {
	email: string
	password: string
}

export const LogInForm = () => {

	const {register, handleSubmit} = useForm({
		mode: "onChange",
	})

	const onSubmit = handleSubmit((data) => console.log(data))
	return (
  <div className={s.wrapper}>
    <form onSubmit={onSubmit} className={s.form}>
      <label>Email</label>
      <input {...register('email')} />
      <label>Password</label>
      <input {...register("password")} />
      <p className={s.passRecovery}>
        <Link href="/">Forgot Password?</Link>
      </p>
      <Button theme={ButtonTheme.DEFAULT}>
        Sign in
      </Button>
      <div className={s.signUpBlock}>
        <div>Don’t have an account?</div>
        <Link href="/" className={s.signUpLink}>
          Sign Up
        </Link>
      </div>
    </form>
  </div>
	)


}
