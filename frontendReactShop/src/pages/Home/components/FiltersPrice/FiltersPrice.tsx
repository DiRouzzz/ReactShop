import { Input } from '@/components/ui/input';
import { RangeSlider } from './components';

interface FiltersPriceProps {
  min?: number;
  max?: number;
  maxPrice: number;
  onMinChange: (value: number | undefined) => void;
  onMaxChange: (value: number | undefined) => void;
  onRangeChange: (range: [number, number]) => void;
}
export const FiltersPrice: React.FC<FiltersPriceProps> = ({
  min,
  max,
  maxPrice,
  onMinChange,
  onMaxChange,
  onRangeChange,
}) => {
  return (
    <div className="py-6 pb-7">
      <p className="font-bold mb-3">Цена от и до:</p>
      <div className="flex gap-3 mb-5">
        <Input
          type="number"
          value={min ?? ''}
          placeholder="от"
          onChange={(e) => {
            const v =
              e.target.value === '' ? undefined : Number(e.target.value);
            onMinChange(v);
          }}
        />
        <Input
          type="number"
          value={max ?? ''}
          placeholder="до"
          onChange={(e) => {
            const v =
              e.target.value === '' ? undefined : Number(e.target.value);
            onMaxChange(v);
          }}
        />
      </div>
      <RangeSlider
        min={0}
        max={maxPrice}
        step={100}
        value={[min ?? 0, max ?? maxPrice]}
        onValueChange={(range) => {
          if (range.length === 2) {
            onRangeChange([range[0], range[1]]);
          }
        }}
      />
    </div>
  );
};
