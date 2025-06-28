import { cn } from '@/lib/utils';
import React from 'react';

interface IAuthFormError {
  children: React.ReactNode;
  className?: string;
}

export const AuthFormError: React.FC<IAuthFormError> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn('bg-red-400/80 rounded-md my-2.5 p-2.5 text-lg', className)}
    >
      {children}
    </div>
  );
};
