import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { regFormSchema, type RegFormData } from './authorizationSchema';
import { AuthFormError, ButtonLink, H2 } from '@/components/shared';
import { useLogin } from '@/entities/auth';

export const Authorization = ({ className }: { className?: string }) => {
  const [serverError, setServerError] = useState('');
  const { mutate: loginMutate, isPending: isLoginPending } = useLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegFormData>({
    resolver: zodResolver(regFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = ({ email, password }: RegFormData) => {
    loginMutate(
      { email, password },
      {
        onSuccess: () => {
          navigate('/');
          reset();
        },
        onError: (err) => {
          if (err instanceof Error) {
            setServerError(err.message);
          }
        },
      }
    );
  };

  const formError = errors?.email?.message || errors?.password?.message;

  const errorMessage = formError || serverError;

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <form className="w-[250px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 mt-[100px]">
          <H2>Авторизация</H2>
          <Input
            type="text"
            placeholder="Логин..."
            {...register('email', { onChange: () => setServerError('') })}
          />
          <Input
            type="password"
            placeholder="Пароль..."
            {...register('password', { onChange: () => setServerError('') })}
          />
          <Button
            type="submit"
            variant="outline"
            disabled={!!errorMessage || isLoginPending}
          >
            Войти
          </Button>
          <ButtonLink to="/register">Регистрация</ButtonLink>
          {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
        </div>
      </form>
    </div>
  );
};
