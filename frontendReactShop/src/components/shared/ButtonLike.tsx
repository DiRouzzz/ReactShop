import { Heart, HeartOff } from 'lucide-react';
import { Button } from '../ui/button';
import React from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/app/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface IButtonLike {
  className?: string;
  variant?:
    | 'default'
    | 'link'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost';
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isTogglePending?: boolean;
}

export const ButtonLike: React.FC<IButtonLike> = ({
  className,
  variant = 'default',
  isFavorite,
  onToggleFavorite,
  isTogglePending,
}) => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!userData) {
      toast('Необходимо авторизоваться', {
        description:
          'Для того чтобы добавить товар в избранное, необходимо авторизоваться.',
        action: {
          label: 'Авторизация',
          onClick: () => navigate('/login'),
        },
      });
      return;
    }
    onToggleFavorite();
  };

  return (
    <Button
      disabled={isTogglePending}
      variant={variant}
      className={cn(
        `h-[50px] ${isFavorite && 'bg-red-700 hover:bg-red-800'}`,
        className
      )}
      onClick={handleLikeClick}
    >
      {isFavorite ? <Heart stroke="white" /> : <HeartOff />}
    </Button>
  );
};
