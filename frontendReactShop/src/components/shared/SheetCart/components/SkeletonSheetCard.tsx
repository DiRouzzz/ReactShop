import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonSheetCard = () => (
  <div className="border border-[#f3f3f3] rounded-2xl overflow-hidden p-3 flex items-center relative">
    <div className="flex mt-5">
      <Skeleton className="w-[120px] h-[140px] rounded-xl mr-5" />
      <div className="flex flex-col justify-between space-y-2">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 mt-2 w-[170px]" />
          <Skeleton className="h-5 w-[170px]" />
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-5 w-[100px]" />
        </div>
      </div>
    </div>
    <div className="cursor-pointer absolute right-2 top-2">
      <Skeleton className="h-5 w-5 rounded-full" />
    </div>
  </div>
);
