import { cn } from '@/lib/utils';

interface IProductChooserSize {
  className?: string;
  size: string;
  setSelectedSize: (size: string) => void;
  isSelected: boolean;
}

export const ProductChooserSize: React.FC<IProductChooserSize> = ({
  className,
  size,
  setSelectedSize,
  isSelected,
}) => {
  return (
    <div
      onClick={() => setSelectedSize(size)}
      className={cn(
        'text-sm font-medium w-[60px] h-[29px] leading-[29px] text-center uppercase float-left rounded-4xl cursor-pointer border transition-colors',
        isSelected
          ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
          : 'bg-neutral-300 text-black dark:bg-neutral-800 dark:text-white border-transparent hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-700 dark:hover:text-white',
        className
      )}
    >
      {size}
    </div>
  );
};
