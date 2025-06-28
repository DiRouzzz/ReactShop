import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { ButtonLike } from '@/components/shared';

interface ICard {
  className?: string;
  id: string;
  src: string;
  alt: string;
  name: string;
  price: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const Card: React.FC<ICard> = ({
  className = '',
  id,
  src,
  alt,
  name,
  price,
  isFavorite,
  onToggleFavorite,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link to={`/product/${id}`}>
      <div
        className={cn(
          'border border-[rgb(243,243,243)] p-[30px] w-[260px] rounded-[20px] mr-[30px] mb-[30px] transition-all duration-200 ease-in-out hover:shadow-[0px_20px_35px_rgba(0,0,0,0.06)] hover:-translate-y-[5px] active:-translate-y-[10px] relative cursor-pointer',
          className
        )}
      >
        <div className="relative w-full h-[200px] flex items-center justify-center">
          {!isImageLoaded && <Skeleton className="w-full h-[200px]" />}
          <img
            className={cn(
              'mx-auto h-[200px] object-contain transition-opacity duration-300 delay-100',
              {
                'opacity-0': !isImageLoaded,
                'opacity-100': isImageLoaded,
              }
            )}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(true)}
            src={src}
            alt={alt}
          />
        </div>

        <h5 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
          {name}
        </h5>
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col gap-1">
            <b className="leading-4 [&:not(:first-child)]:mt-6">{price} ₽</b>
          </div>
          <ButtonLike
            className="w-[50px] rounded-2xl"
            variant="outline"
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite}
          />
        </div>
      </div>
    </Link>
  );
};
