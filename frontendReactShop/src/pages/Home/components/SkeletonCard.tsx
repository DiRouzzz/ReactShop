import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonCard = () => (
  <div
    className="border border-[#f3f3f3]
      p-[30px]
      w-[260px]
      rounded-[20px]
      mr-[30px]
      mb-[30px]
      transition-all
      duration-200
      ease-in-out
      hover:shadow-[0px_20px_35px_rgba(0,0,0,0.06)]
      hover:-translate-y-[5px]
			active:-translate-y-[10px]
      relative
			cursor-pointer"
  >
    <div className="flex flex-col space-y-2">
      <Skeleton className="h-[200px] w-full rounded-xl" />
      <Skeleton className="h-6 w-[100%]" />
      <Skeleton className="h-6 w-[100%]" />
      <div className="flex justify-between items-center mt-2">
        <Skeleton className="h-5 w-[50%]" />
        <Skeleton className="w-[50px] h-[50px]" />
      </div>
    </div>
  </div>
);
