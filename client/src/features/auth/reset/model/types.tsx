// import { z } from 'zod'
//
// export const formSchema = z
//     // данные формы - объект
//     .object({
//         email: z.string().email('Некорректный email'),
//         password: z.string({ required_error: 'Password is required' }).min(6, 'Пароль слишком короткий').max(20,'Пароль слишком длинный'),
//         confirmPassword: z.string({ required_error: 'Confirm Password is required' }).min(6, 'Повторите пароль').max(20,'Повторите пароль'),
//     })
//     // кастомная валидация формы - всего объекта
//     .refine((data) => data.password === data.confirmPassword, {
//         // необходимо указать путь - название поля с ошибкой
//         // https://github.com/colinhacks/zod#customize-error-path
//         path: ['confirmPassword'],
//         message: 'Введенные пароли не совпадают',
//     })
//
// export default formSchema
//
// export type FormSchema = z.infer<typeof formSchema>