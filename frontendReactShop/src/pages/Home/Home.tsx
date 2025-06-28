import { SearchInput } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { checkProductInFavorites } from '@/utils/checkProductInFavorites';
import { debounce } from '@/utils/debounce';
import React, { useEffect, useMemo, useState } from 'react';
import { Card, FiltersPrice, SkeletonCard } from './components';
import { useMaxPrice, useProductsList } from '@/entities/products';
import { useFavorites, useToggleFavorite } from '@/entities/favorites';

export const Home = ({ className = '' }: { className?: string }) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [debouncedSearchPhrase, setDebouncedSearchPhrase] = useState('');
  const [selectedType, setSelectedType] = useState<
    'MAN' | 'WOMAN' | undefined
  >();
  const { data: maxPrice = 30000 } = useMaxPrice();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [debouncedPriceRange, setDebouncedPriceRange] = useState<
    [number, number]
  >([0, maxPrice]);

  useEffect(() => {
    if (maxPrice > 0) {
      setPriceRange([0, maxPrice]);
      setDebouncedPriceRange([0, maxPrice]);
    }
  }, [maxPrice]);

  const { cursor, error, productItems, isPending, isFetchingNextPage } =
    useProductsList({
      search: debouncedSearchPhrase,
      typeProduct: selectedType,
      priceFrom: debouncedPriceRange[0],
      priceTo: debouncedPriceRange[1],
    });
  const { data: favorites } = useFavorites();
  const { mutate: toggleFavorite } = useToggleFavorite();

  const startDelayedSearch = useMemo(
    () => debounce((value: string) => setDebouncedSearchPhrase(value), 1000),
    []
  );

  const debounceSetPriceRange = useMemo(
    () =>
      debounce((range: [number, number]) => {
        setDebouncedPriceRange(range);
      }, 1000),
    []
  );

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchPhrase(value);
    startDelayedSearch(value);
  };

  const expectedItemCount = productItems?.length ?? 12;

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className={cn('mt-5 max-w-[1280px] mx-auto', className)}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2 w-[300px]">
          <div className="flex gap-2">
            <Button onClick={() => setSelectedType('MAN')}>Мужские</Button>
            <Button onClick={() => setSelectedType('WOMAN')}>Женские</Button>
            <Button onClick={() => setSelectedType(undefined)}>Сбросить</Button>
          </div>
          <FiltersPrice
            min={priceRange[0] ?? 0}
            max={priceRange[1] ?? maxPrice}
            maxPrice={maxPrice}
            onMinChange={(value) => {
              setPriceRange([value ?? 0, priceRange[1]]);
              debounceSetPriceRange([value ?? 0, priceRange[1] ?? maxPrice]);
            }}
            onMaxChange={(value) => {
              setPriceRange([priceRange[0], value ?? 0]);
              debounceSetPriceRange([priceRange[0] ?? 0, value ?? maxPrice]);
            }}
            onRangeChange={([min, max]) => {
              setPriceRange([min, max]);
              debounceSetPriceRange([min ?? 0, max ?? maxPrice]);
            }}
          />
        </div>
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          {searchPhrase ? `Поиск: ${searchPhrase}` : 'Все кроссовки'}
        </h1>
        <SearchInput
          onChange={onSearch}
          searchPhrase={searchPhrase}
          placeholder="Поиск кроссовок"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-items-center mt-5 ml-7">
        {isPending && !productItems?.length
          ? Array.from({ length: expectedItemCount }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : productItems?.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                src={product.image[0]}
                alt={product.name}
                name={product.name}
                price={product.price}
                isFavorite={checkProductInFavorites(favorites, product.id)}
                onToggleFavorite={() => toggleFavorite(product.id)}
              />
            ))}
        {isFetchingNextPage &&
          Array.from({ length: expectedItemCount }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
      </div>
      {cursor}
    </div>
  );
};
