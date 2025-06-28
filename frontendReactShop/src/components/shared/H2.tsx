import { cn } from '@/lib/utils';
import React from 'react';

interface IH2 {
  children: React.ReactNode;
  className?: string;
}

export const H2: React.FC<IH2> = ({ children, className = '' }) => {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center mb-[10px]',
        className
      )}
    >
      {children}
    </h2>
  );
};
