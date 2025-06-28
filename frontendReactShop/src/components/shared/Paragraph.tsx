import { cn } from '@/lib/utils';

interface IParagraph {
  className?: string;
  children: React.ReactNode;
}

export const Paragraph: React.FC<React.PropsWithChildren<IParagraph>> = ({
  className,
  children,
}) => {
  return (
    <p className={cn('leading-5 [&:not(:first-child)]:mt-6', className)}>
      {children}
    </p>
  );
};
