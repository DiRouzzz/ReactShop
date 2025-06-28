import type React from 'react';
import { H2 } from '../../../components/shared/H2';
import { Paragraph } from '../../../components/shared/Paragraph';
import { cn } from '@/lib/utils';

interface IDescriptionProduct {
  className?: string;
  features: string[];
  brandHistory: string;
  description: string;
}

export const ProductDescription: React.FC<IDescriptionProduct> = ({
  className,
  features,
  brandHistory,
  description,
}) => (
  <div className={cn('', className)}>
    <H2 className="mt-10">Описание</H2>
    <Paragraph className="text-sm text-neutral-800 dark:text-neutral-200">
      {description}
    </Paragraph>
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-5">
      Особенности:
    </h4>
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-neutral-800 dark:text-neutral-200">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-5">
      Бренд:
    </h4>
    <Paragraph className="text-sm text-neutral-800 dark:text-neutral-200">
      {brandHistory}
    </Paragraph>
  </div>
);
