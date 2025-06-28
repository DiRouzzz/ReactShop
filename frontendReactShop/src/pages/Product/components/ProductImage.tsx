import { cn } from '@/lib/utils';
import type React from 'react';
import { useState } from 'react';

interface IProductImage {
  className?: string;
  src: string;
  alt: string;
}

export const ProductImage: React.FC<IProductImage> = ({
  className = '',
  src,
  alt,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className={cn('w-full min-h-[58vh]', className)}>
      <img
        src={src}
        alt={alt}
        className={cn('w-full', {
          'opacity-0': !isImageLoaded,
          'opacity-100': isImageLoaded,
        })}
        onLoad={() => setIsImageLoaded(true)}
        onError={() => setIsImageLoaded(true)}
      />
    </div>
  );
};
