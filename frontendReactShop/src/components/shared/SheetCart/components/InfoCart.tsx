import React from 'react';
import { H2 } from '../../H2';
import { ButtonLink } from '../../ButtonLink';
import { SheetClose } from '@/components/ui/sheet';
import { ShoppingBag } from 'lucide-react';

interface IInfo {
  className?: string;
  isOrderComplete?: boolean;
}

export const InfoCart: React.FC<IInfo> = ({
  className,
  isOrderComplete = false,
}) => (
  <div
    className={`text-center h-[calc(100vh-400px)] flex flex-col items-center justify-center gap-4 ${className}`}
  >
    <H2>{isOrderComplete ? 'Заказ оформлен' : 'Ваша корзина пуста'}</H2>
    <p className="w-[280px] leading-6 text-lg">
      {isOrderComplete ? (
        <>
          Ваш заказ успешно оформлен! Посмотреть его можно во вкладке{' '}
          <ButtonLink to="/orders">
            <SheetClose className="cursor-pointer underline flex items-center gap-1">
              Мои заказы
              <ShoppingBag className="ml-2" size={18} />
            </SheetClose>
          </ButtonLink>
        </>
      ) : (
        'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
      )}
    </p>
    <ButtonLink to="/">
      <SheetClose className="cursor-pointer">Вернуться на главную</SheetClose>
    </ButtonLink>
  </div>
);
