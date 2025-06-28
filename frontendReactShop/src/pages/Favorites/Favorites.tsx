import { useFavorites, useToggleFavorite } from '@/entities/favorites';
import { Card, SkeletonCard } from '../Home/components';
import { Container, H2 } from '@/components/shared';

interface Props {
  className?: string;
}

export const Favorites: React.FC<Props> = () => {
  const { data: favorites, isLoading } = useFavorites();
  const { mutate: toggleFavorite } = useToggleFavorite();

  return (
    <Container>
      <H2 className="ml-40 mr-40">Закладки</H2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-items-center mt-5 ml-7">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : favorites?.products.length
            ? favorites?.products.map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  alt={product.name}
                  name={product.name}
                  src={product.image[0]}
                  price={product.price}
                  isFavorite={true}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                />
              ))
            : 'Закладок нет'}
      </div>
    </Container>
  );
};
