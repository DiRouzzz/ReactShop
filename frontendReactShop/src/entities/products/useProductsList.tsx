import { useInfiniteQuery } from '@tanstack/react-query';
import { productsListApi } from './productsListApi';
import { useCallback, useRef } from 'react';

export const useProductsList = ({
  search,
  typeProduct,
  priceFrom,
  priceTo,
}: {
  search: string;
  typeProduct?: 'MAN' | 'WOMAN';
  priceFrom?: number;
  priceTo?: number;
}) => {
  const {
    data: productItems,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    ...productsListApi.getProductsListInfinityQueryOptions(
      search,
      typeProduct,
      priceFrom,
      priceTo
    ),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  const cursor = (
    <div className="flex gap-2 mt-4 justify-center" ref={cursorRef}>
      {!hasNextPage && (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
          Больше нет товаров для загрузки
        </h4>
      )}
      {isFetchingNextPage && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );

  return { error, productItems, cursor, isFetchingNextPage, isPending };
};

export function useIntersection(onIntersect: () => void) {
  const unsubscribe = useRef(() => {});

  return useCallback((el: HTMLDivElement | null) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((intersection) => {
        if (intersection.isIntersecting) {
          onIntersect();
        }
      });
    });

    if (el) {
      observer.observe(el);
      unsubscribe.current = () => observer.disconnect();
    } else {
      unsubscribe.current();
    }
  }, []);
}
