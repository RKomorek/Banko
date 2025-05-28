"use client";
import { useState } from "react";
import { Input } from "../ui/input";

type TextInputProps = {
  name: string;
  placeholder: string;
  onChange: (value: number) => void;
};

const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function MoneyInput({ name, placeholder, onChange }: TextInputProps) {
  const [value, setValue] = useState("");

  function formatMoney(input: string): string {
    const digits = input.replace(/\D/g, "");
    const numberValue = Number(digits) / 100;
    return moneyFormatter.format(numberValue);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const formattedValue = formatMoney(event.target.value);
    setValue(formattedValue);

    if (onChange) {
      const digits = event.target.value.replace(/\D/g, "");
      const realValue = Number(digits) / 100;
      onChange(realValue);
    }
  }

  return (
    <Input
      name={name}
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={handleChange}
    />
  );
}