import type { IOrderDto } from '@/entities/order';

interface OrderProps {
  order: IOrderDto;
}
export const Order: React.FC<OrderProps> = ({ order }) => (
  <div
    key={order.id}
    className="max-w-3xl mx-auto bg-white shadow-md border rounded-md text-sm text-gray-800 mt-10 mb-10"
  >
    <div className="flex justify-between p-4 border-b font-medium">
      <div>
        заказ <span className="text-black font-semibold">#{order.id}</span>
      </div>
      <div className="text-right text-sm space-y-0.5">
        <div>
          дата:{' '}
          <span className="text-black">{order.registeredAt.split(' ')[0]}</span>
        </div>
        <div>
          время:{' '}
          <span className="text-black">{order.registeredAt.split(' ')[1]}</span>
        </div>
      </div>
    </div>

    <table className="w-full table-auto">
      <thead className="bg-gray-100 text-left uppercase text-xs text-gray-600">
        <tr>
          <th className="px-4 py-2">Товар</th>
          <th className="px-4 py-2">Размер</th>
          <th className="px-4 py-2">Количество</th>
          <th className="px-4 py-2">Цена</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {order.products.map((product, index) => (
          <tr key={index} className="border-t">
            <td className="px-4 py-3">{product.name}</td>
            <td className="px-4 py-3">{product.size}</td>
            <td className="px-4 py-3">{product.quantity}</td>
            <td className="px-4 py-3 font-semibold">{product.price} ₽</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="flex justify-between items-center bg-gray-100 px-4 py-3 border-t text-sm">
      <div>
        <span className="text-gray-500 uppercase">Доставка:</span>{' '}
        <span className="font-medium">СДЭК САМОВЫВОЗ (БЕСПЛАТНО)</span>
      </div>
      <div className="font-semibold">
        ОБЩАЯ СУММА: <span className="text-black">{order.total} ₽</span>
      </div>
    </div>

    <div className="px-4 py-4 text-sm">
      <span className="uppercase text-gray-500">СОСТОЯНИЕ ЗАКАЗА:</span>
      <span className="font-bold text-black ml-2">В РАБОТЕ</span>
    </div>
  </div>
);
