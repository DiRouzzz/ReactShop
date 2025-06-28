import z from 'zod';

export const regFormSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Заполните логин.')
      .min(3, 'Неверно заполнен логин. Нужно указать минимум 3 символа')
      .max(25, 'Неверно заполнен логин. Можно указать максимум 15 символов')
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Введите корректный email (например, example@mail.com)'
      ),
    password: z
      .string()
      .min(1, 'Заполните пароль.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Неверно заполнен пароль. Пароль должен содержать минимум 8 символов, хотя бы одну букву и одну цифру'
      ),
    passwordRepeat: z.string().min(1, 'Повторите пароль'),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: 'Пароли не совпадают',
    path: ['passwordRepeat'],
  });

export type RegFormData = z.infer<typeof regFormSchema>;
