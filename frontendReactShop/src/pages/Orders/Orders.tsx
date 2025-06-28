import { useOrder } from '@/entities/order';
import { Order } from './components';
import { Container, H2, PrivateContent, Spinner } from '@/components/shared';
import { ROLE } from '@/constants/role';

export const Orders = () => {
  const { data: orders, isLoading } = useOrder();

  return (
    <PrivateContent access={[ROLE.USER, ROLE.ADMIN]}>
      <Container>
        <H2 className="ml-40 mr-40">Мои заказы</H2>
        {isLoading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <Spinner className="h-12 w-12" />
          </div>
        ) : orders && orders.length > 0 ? (
          orders.map((order) => <Order key={order.id} order={order} />)
        ) : (
          <div className="text-center text-2xl font-bold mt-10">
            У вас нет заказов
          </div>
        )}
      </Container>
    </PrivateContent>
  );
};
