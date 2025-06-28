import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import type React from 'react';
import { cn } from '@/lib/utils';

interface ISearchInput {
  className?: string;
  placeholder?: string;
  searchPhrase: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<ISearchInput> = ({
  className,
  placeholder,
  searchPhrase,
  onChange,
}) => {
  return (
    <div className={cn('flex items-center', className)}>
      <div className="relative left-[30px]">
        <Search />
      </div>
      <Input
        className="w-[300px] pl-[35px]"
        placeholder={placeholder}
        onChange={onChange}
        value={searchPhrase}
      />
    </div>
  );
};
