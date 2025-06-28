import { PrivateContent, ProductForm, Spinner } from '@/components/shared';
import { ROLE } from '@/constants/role';
import { useEditProduct } from '@/entities/products';

export const ProductEdit = () => {
  const { data: product, isLoading } = useEditProduct();

  if (isLoading || !product)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
        <Spinner className="h-12 w-12" />
      </div>
    );

  return (
    <PrivateContent access={[ROLE.ADMIN]}>
      <ProductForm defaultValues={product} />
    </PrivateContent>
  );
};
