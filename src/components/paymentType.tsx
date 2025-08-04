import * as RadioGroup from "@radix-ui/react-radio-group";

import {
  WalletCards,
  CreditCard,
  HandCoins,
  Banknote,
} from "lucide-react";
import clsx from "clsx";
import { PaymentType } from "@/services/payment-service";


type Props = {
  value: PaymentType;
  onChange: (val: PaymentType) => void;
  className?: string;
  disabled?: boolean;
};

const options: {
  value: PaymentType;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: PaymentType.CASH, label: "Efectivo", icon: <HandCoins size={24} /> },
  { value: PaymentType.CARD, label: "Tarjeta", icon: <CreditCard size={24} /> },
  { value: PaymentType.TRANSFER, label: "Transferencia", icon: <Banknote size={24} /> },
  { value: PaymentType.DIGITAL_WALLET, label: "Wallet", icon: <WalletCards size={24} /> },
];

export const PaymentTypeSelector = ({ value, onChange, disabled, className }: Props) => {
  return (
    <div className={clsx("space-y-3", className)}>
      <RadioGroup.Root
        className="grid grid-cols-4 gap-4"
        value={value}
        onValueChange={(val) => onChange(val as PaymentType)}
        disabled={disabled}
      >
        {options.map((opt) => (
          <RadioGroup.Item
            key={opt.value}
            value={opt.value}
            className={clsx(
              "flex items-center justify-center p-3 rounded-md border",
              value === opt.value
                ? "border-blue-500 bg-blue-50 text-blue-900"
                : "border-gray-300 hover:bg-gray-100 text-gray-700",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {opt.icon}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>

      {/* Texto debajo con transición */}
      <div className="text-center text-sm text-gray-700">
        {options.find((opt) => opt.value === value)?.label}
      </div>
    </div>
  );
};