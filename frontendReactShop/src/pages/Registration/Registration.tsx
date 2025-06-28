import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { regFormSchema, type RegFormData } from './registrationSchema';
import { InputOTPDemo } from './components';
import { AuthFormError, H2, Paragraph } from '@/components/shared';
import { useRegister, useResend, useVerify } from '@/entities/auth';

export const Registration = ({ className }: { className?: string }) => {
  const [serverError, setServerError] = useState('');
  const [isVerify, setIsVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isResend, setIsResend] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [lockTimer, setLockTimer] = useState(0);

  const { mutate: registerMutate, isPending: isRegisterPending } =
    useRegister();
  const { mutate: verifyMutate, isPending: isVerifyPending } = useVerify();
  const { mutate: resendMutate, isPending: isResendPending } = useResend();

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
      passwordRepeat: '',
    },
  });

  useEffect(() => {
    if (lockTimer === 0) return;

    const timerId = setInterval(() => {
      setLockTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          setAttemptsLeft(3);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [lockTimer]);

  const onSubmit = ({ email, password }: RegFormData) => {
    registerMutate(
      { email, password },
      {
        onSuccess: () => {
          setEmail(email);
          setIsVerify(true);
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

  const onVerify = () => {
    verifyMutate(
      { email, code },
      {
        onSuccess: () => {
          setAttemptsLeft(3);
          setLockTimer(0);
        },
        onError: (err) => {
          if (err instanceof Error) {
            setServerError(err.message);
            setAttemptsLeft((prev) => {
              const newAttempts = prev - 1;
              if (newAttempts <= 0) {
                setLockTimer(30);
              }
              return newAttempts;
            });
          }
        },
      }
    );
  };

  const onResend = () => {
    resendMutate(
      { email },
      {
        onError: (err) => {
          if (err instanceof Error) {
            setServerError(err.message);
          }
        },
      }
    );
    setIsResend(true);
  };

  const formError =
    errors?.email?.message ||
    errors?.password?.message ||
    errors?.passwordRepeat?.message;

  const errorMessage = formError || serverError;

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <form className="w-[250px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 mt-[100px]">
          <H2>Регистрация</H2>
          {isVerify ? (
            <div className="flex flex-col gap-3 items-center justify-center">
              {lockTimer > 0 && (
                <Paragraph className="text-center">
                  Повторная попытка будет доступна через {lockTimer} сек.
                </Paragraph>
              )}
              {lockTimer === 0 && (
                <Paragraph>Осталось попыток: {attemptsLeft}</Paragraph>
              )}
              <h2 className="text-xl font-semibold text-center">
                {isResend
                  ? 'Введите новый код отправленный на '
                  : 'Введите код из почты, отправленный на '}
                {email}
              </h2>

              <InputOTPDemo
                value={code}
                onChange={setCode}
                onVerifyClick={onVerify}
                disabled={
                  isVerifyPending ||
                  code.length !== 6 ||
                  attemptsLeft <= 0 ||
                  lockTimer > 0
                }
                onResendClick={onResend}
                isResendDisabled={isResendPending}
              />

              {serverError && <AuthFormError>{serverError}</AuthFormError>}
            </div>
          ) : (
            <>
              <Input
                type="text"
                placeholder="Email..."
                {...register('email', { onChange: () => setServerError('') })}
              />
              <Input
                type="password"
                placeholder="Пароль..."
                {...register('password', {
                  onChange: () => setServerError(''),
                })}
              />
              <Input
                type="password"
                placeholder="Повторите пароль..."
                {...register('passwordRepeat', {
                  onChange: () => setServerError(''),
                })}
              />
              <Button
                type="submit"
                disabled={!!errorMessage || isRegisterPending}
              >
                Зарегистрироваться
              </Button>
              {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
            </>
          )}
        </div>
      </form>
    </div>
  );
};
