import { Button } from '@/components/ui/button';
import { H2 } from '@/components/shared/H2';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { ButtonArrowRight } from '../ButtonArrowRight';
import { getCartStats } from '@/utils/getCartStats';
import { useState } from 'react';
import { toast } from 'sonner';
import { InfoCart, SheetCard, SkeletonSheetCard } from './components';
import { useCart, useClearCart } from '@/entities/cart';
import { useCreateOrder } from '@/entities/order';

export const SheetCart = () => {
  const { data: cart, isLoading } = useCart();
  const { mutateAsync: clearCart } = useClearCart();
  const { totalCount, totalPrice } = getCartStats(cart?.products || []);
  const { mutateAsync: createOrder, isPending: isOrderPending } =
    useCreateOrder();
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const handleCreateOrder = async () => {
    try {
      await createOrder();
      setIsOrderComplete(true);
      toast.success('Заказ успешно оформлен');
    } catch (error) {
      toast.error('Ошибка при оформлении заказа');
      console.error(error);
    }
  };

  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open) setIsOrderComplete(false);
      }}
    >
      <SheetTrigger asChild>
        <Button className="group relative">
          <b>{totalPrice}p</b>
          <span className="h-full w-[1px] bg-white/30 mx-3 dark:bg-black/30" />
          <div className="flex items-center gap-1 transition duration group-hover:opacity-0">
            <ShoppingCart size={16} className="relative" strokeWidth={2} />
            <b>{totalCount}</b>
          </div>
          <ArrowRight
            size={20}
            className="absolute right-5 transition duration-300 -translate-x-2 
              opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
          />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>
            <div>
              <H2>Корзина</H2>
            </div>
          </SheetTitle>
          <SheetDescription>
            Здесь вы можете просмотреть или изменить содержимое корзины.
          </SheetDescription>
          {cart?.products.length ? (
            <Button
              variant="outline"
              className="rounded-3xl mt-4"
              onClick={() => clearCart()}
            >
              Очистить корзину
            </Button>
          ) : null}
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4 px-4">
          <div className="grid auto-rows-min gap-6">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <SkeletonSheetCard key={index} />
              ))
            ) : cart?.products.length ? (
              cart.products.map((item) => (
                <SheetCard
                  key={`${item.product.id}-${item.size}`}
                  id={item.product.id}
                  image={item.product.image[0]}
                  name={item.product.name}
                  price={item.product.price}
                  size={item.size}
                  quantity={item.quantity}
                  isLoading={isLoading}
                />
              ))
            ) : (
              <InfoCart isOrderComplete={isOrderComplete} />
            )}
          </div>
        </div>
        {cart?.products.length ? (
          <SheetFooter className="border-t pt-4">
            <ButtonArrowRight
              className="h-[40px] rounded-3xl"
              text="Оформить заказ"
              onClick={handleCreateOrder}
              disabled={isOrderPending}
            />
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};
