import { Minus, Plus, X } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { SkeletonSheetCard } from './SkeletonSheetCard';
import { useAddProductCart, useRemoveProductCart } from '@/entities/cart';

interface ISheetCard {
  className?: string;
  id: string;
  image: string;
  name: string;
  price: number;
  size: string;
  isLoading: boolean;
  quantity: number;
}

export const SheetCard: React.FC<ISheetCard> = ({
  className = '',
  id,
  image,
  name,
  price,
  size,
  isLoading,
  quantity,
}) => {
  const { mutate: removeProductCart } = useRemoveProductCart();
  const { mutate: addProductCart } = useAddProductCart();

  if (isLoading) return <SkeletonSheetCard />;

  return (
    <div
      className={`border border-[#f3f3f3] rounded-2xl overflow-hidden p-3 flex items-center relative ${className}`}
    >
      <div className="flex mt-5">
        <div
          className="bg-contain bg-no-repeat bg-[position:0_-3px] h-[70px] w-[70px] mr-5"
          style={{
            backgroundImage: `url(${image})`,
            width: '140px',
            height: '140px',
          }}
        ></div>
        <div className="flex flex-col">
          <p>{name}</p>
          <b>{price} ₽</b>
          <p>Размер: {size}</p>
          <div className="flex items-center gap-1">
            <p>Количество: {quantity}</p>
            <Button
              className="h-7 w-7"
              onClick={() => removeProductCart({ productId: id, size })}
            >
              <Minus size={16} />
            </Button>
            <Button
              className="h-7 w-7"
              onClick={() => addProductCart({ productId: id, size })}
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div
        className="cursor-pointer absolute right-2 top-2"
        onClick={() => removeProductCart({ productId: id, size, force: true })}
      >
        <X />
      </div>
    </div>
  );
};
