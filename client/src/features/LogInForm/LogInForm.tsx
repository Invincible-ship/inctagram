// type FormikErrorType = {
// 	email?: string
// 	password?: string
// 	rememberMe?: boolean
// }

export const LogInForm = () => {
	// const dispatch = AppDispatch()
	// const isLoggedIn = useSelector(selectIsLoggedIn)
	// const [password, setShowPassword] = useState<boolean>(true)

	// const formik = useFormik({
	// 	initialValues: {
	// 		email: '',
	// 		password: '',
	// 		rememberMe: false,
	// 	},
	// 	validate: values => {
	// 		const errors: FormikErrorType = {}
	//
	// 		if (!values.email) {
	// 			errors.email = 'Email is required!'
	// 		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
	// 			errors.email = 'Invalid email address'
	// 		}
	// 		if (!values.password) {
	// 			errors.password = 'Password is required!'
	// 		} else if (values.password.length < 8) {
	// 			errors.password = 'Password need to be more than 7 symbols'
	// 		}
	//
	// 		return errors
	// 	},
	// 	onSubmit: values => {
	// 		dispatch(signInTC(values))
	// 	},
	// 	enableReinitialize: true,
	// })

	// if (isLoggedIn) {
	// 	return <Navigate to={'/profile'} />
	// }
	//
	// const showPassword = (p: string) => {
	// 	setShowPassword(visible => !visible)
	// }

	return (
		<div className={s.wrapper}>
			<Box title={'Sign in'}>
				<Grid container justifyContent={'center'}>
					<Grid item justifyContent={'center'} marginTop={5}>
						<form
							onSubmit={event => {
								formik.handleSubmit()
								event.preventDefault()
							}}
							className={s.form}
						>
							<TextField
								sx={{ m: 1, width: '347px' }}
								id="email"
								label="Email"
								variant="standard"
								margin="normal"
								{...formik.getFieldProps('email')}
								error={!!formik.errors.email && formik.touched.email}
								onBlur={formik.handleBlur}
								value={formik.values.email}
								helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ' '}
							/>

							<FormControl sx={{ m: 1, width: '347px' }} variant="standard">
								<TextField
									id="show-password"
									label="Password"
									variant="standard"
									type={password ? 'password' : 'text'}
									{...formik.getFieldProps('password')}
									error={!!formik.errors.password && formik.touched.password}
									onBlur={formik.handleBlur}
									value={formik.values.password}
									helperText={
										formik.touched.password && formik.errors.password ? formik.errors.password : ' '
									}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													id="password"
													aria-label="toggle password visibility"
													onClick={e => showPassword(e.currentTarget.id)}
												>
													{password ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</FormControl>

							<div className={s.checkboxField}>
								<SuperCheckbox {...formik.getFieldProps('rememberMe')}>Remember me</SuperCheckbox>
							</div>
							<p className={s.passRecovery}>
								<NavLink to="/forgot-password">Forgot Password?</NavLink>
							</p>
							<SuperButton
								type={'submit'}
								variant={'contained'}
								color={'primary'}
								style={{ marginTop: 50 }}
							>
								Sign in
							</SuperButton>
						</form>
						<div className={s.signUpBlock}>
							<p>Already have an account?</p>
							<NavLink to="/register" className={s.signUpLink}>
								Sign Up
							</NavLink>
						</div>
					</Grid>
				</Grid>
			</Box>
		</div>
	)
}
