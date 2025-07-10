import { cn } from '@/lib/utils';
import { useNavigate, useParams } from 'react-router-dom';
import { productsListApi, useDeleteProduct } from '@/entities/products';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/shared/Spinner';
import { checkProductInFavorites } from '@/utils/checkProductInFavorites';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/app/AuthContext';
import { checkAccess } from '@/utils/checkAccess';
import { ROLE, type Role } from '@/constants/role';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  ProductChooserSize,
  ProductDescription,
  ProductImage,
} from './components';
import {
  ButtonArrowRight,
  ButtonLike,
  ButtonLink,
  Container,
  H2,
  Paragraph,
} from '@/components/shared';
import { ProductNotExist } from '../ProductNotExist/ProductNotExist';
import { useFavorites, useToggleFavorite } from '@/entities/favorites';
import { useAddProductCart } from '@/entities/cart';

export const Product = ({ className }: { className?: string }) => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const isAdmin = checkAccess([ROLE.ADMIN], userData?.user.roleId as Role);

  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    isLoading,
    error,
  } = useQuery(productsListApi.getProductByIdQueryOptions(id!));
  const { mutate: toggleFavorite, isPending: isTogglePending } =
    useToggleFavorite();
  const { data: favorites } = useFavorites();
  const { mutate: onAddProductCart } = useAddProductCart();
  const { mutate: deleteProduct, isPending: isDeletePending } =
    useDeleteProduct();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleAddToCart = () => {
    if (!userData) {
      toast('Необходимо авторизоваться', {
        description:
          'Для того чтобы добавить товар в корзину, необходимо авторизоваться.',
        action: {
          label: 'Авторизация',
          onClick: () => {
            navigate('/login');
          },
        },
      });
      return;
    }

    if (!selectedSize) {
      toast('Необходимо указать размер', {
        description:
          'Для того чтобы добавить товар в корзину, необходимо указать размер.',
      });
      return;
    }

    onAddProductCart({ productId: id!, size: selectedSize! });

    toast('Товар успешно добавлен в корзину', {
      description: `${product?.name} успешно добавлен в корзину с размером ${selectedSize}.`,
    });
    setSelectedSize(null);
  };

  const handleDeleteProduct = () => {
    toast('Удаление товара', {
      description: `Вы уверены, что хотите удалить товар "${product?.name}"?`,
      action: {
        label: 'Удалить',
        onClick: () => {
          deleteProduct(id!);
        },
      },
      duration: Infinity,
    });
  };

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
        <Spinner className="h-12 w-12" />
      </div>
    );

  if (error) return <div>Ошибка: {JSON.stringify(error)}</div>;

  if (!product) return <ProductNotExist />;

  return (
    <Container>
      <div className={cn('flex gap-[2%] mb-6', className)}>
        <div className="w-[60%]">
          {product?.image.map((img, index) => (
            <ProductImage key={index} src={img} alt={product.name} />
          ))}
        </div>
        <div className="w-[38%]">
          <div className="sticky top-28">
            <div className="mb-[23px] uppercase">
              <Paragraph className="text-center mb-2.5">
                {product?.brand}
              </Paragraph>
              <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance leading-[30px]">
                {product?.name}
              </h1>
            </div>
            <div className="mb-[25px]">
              <H2>{product?.price} ₽</H2>
            </div>
            <div>
              <p className="leading-7 [&:not(:first-child)]:mt-6">Размеры: </p>
              <div className="grid grid-cols-6 gap-2 mt-3">
                {product?.sizes.map((size, index) => (
                  <ProductChooserSize
                    key={index}
                    size={size}
                    isSelected={selectedSize === size}
                    setSelectedSize={setSelectedSize}
                  />
                ))}
              </div>
              <div className="flex items-center mt-10 mr-3">
                <ButtonArrowRight
                  className="h-[50px] rounded-3xl"
                  text="Добавить в корзину"
                  onClick={handleAddToCart}
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-3 mt-3">
                <ButtonLike
                  className="w-[100px] rounded-3xl"
                  isFavorite={checkProductInFavorites(favorites, product!.id)}
                  onToggleFavorite={() => toggleFavorite(product!.id)}
                  isTogglePending={isTogglePending}
                />
                {isAdmin && (
                  <>
                    <ButtonLink
                      className="w-[250px] h-[50px] rounded-3xl"
                      to={`/products/${product!.id}/edit`}
                    >
                      Редактировать
                    </ButtonLink>
                    <Button
                      className="w-[250px] h-[50px] rounded-3xl hover:bg-red-800"
                      variant="destructive"
                      onClick={handleDeleteProduct}
                      disabled={isDeletePending}
                    >
                      {isDeletePending ? (
                        <>
                          <Spinner className="mr-2 h-4 w-4" />
                          Удаление...
                        </>
                      ) : (
                        <>
                          <Trash2 size={16} className="mr-2" />
                          Удалить товар
                        </>
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>
            <ProductDescription
              className="mt-10"
              features={product!.features}
              brandHistory={product!.brandHistory}
              description={product!.description}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
