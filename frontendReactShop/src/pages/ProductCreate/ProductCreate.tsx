import { H2, PrivateContent, ProductForm } from '@/components/shared';
import { ROLE } from '@/constants/role';

export const ProductCreate = () => {
  return (
    <PrivateContent access={[ROLE.ADMIN]}>
      <H2 className="ml-40 mr-40">Добавить товар</H2>
      <ProductForm />
    </PrivateContent>
  );
};
