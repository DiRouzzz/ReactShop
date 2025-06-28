import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface IButtonLink {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const ButtonLink: React.FC<IButtonLink> = ({
  to,
  children,
  className,
}) => (
  <Link
    to={to}
    className={cn(
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
      'border border-input hover:bg-accent hover:text-accent-foreground h-9 py-2 px-4',
      className
    )}
  >
    {children}
  </Link>
);
