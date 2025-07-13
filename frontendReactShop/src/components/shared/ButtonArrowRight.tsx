import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import type React from 'react';
import { cn } from '@/lib/utils';

interface IButtonArrowRightProps {
  text?: string;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

export const ButtonArrowRight: React.FC<IButtonArrowRightProps> = ({
  className,
  text,
  onClick,
}) => (
  <Button onClick={onClick} className={cn('group relative w-full', className)}>
    {text}
    <ArrowRight
      size={20}
      className="absolute right-20 transition duration-300 -translate-x-2 
  opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
    />
  </Button>
);
