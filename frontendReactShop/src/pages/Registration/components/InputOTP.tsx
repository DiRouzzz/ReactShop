import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '../../../components/ui/button';

interface IInputOTP {
  value: string;
  onChange: (value: string) => void;
  onVerifyClick: () => void;
  disabled: boolean;
  onResendClick: () => void;
  isResendDisabled: boolean;
}

export const InputOTPDemo: React.FC<IInputOTP> = ({
  value,
  onChange,
  onVerifyClick,
  disabled,
  onResendClick,
  isResendDisabled,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <InputOTP maxLength={6} value={value} onChange={onChange}>
        <InputOTPGroup>
          {Array.from({ length: 6 }, (_, index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <Button onClick={onVerifyClick} disabled={disabled}>
        Подтвердить
      </Button>
      <Button onClick={onResendClick} disabled={isResendDisabled}>
        Получить код повторно
      </Button>
    </div>
  );
};
