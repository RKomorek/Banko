"use client";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";

type TextInputProps = {
  name: string;
  placeholder: string;
  onChange: (value: number) => void;
  className?: string;
  value?: number | string;
};

const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatMoneyFromDigits(digits: string) {
  const numberValue = Number(digits) / 100;
  return moneyFormatter.format(numberValue);
}

export default function MoneyInput({ name, placeholder, onChange, className, value }: TextInputProps) {
  const [digits, setDigits] = useState<string>("");

  useEffect(() => {
    if (value === 0 || value === "" || value === undefined) {
      setDigits("");
    } else {
      const cents = Math.round(Number(value) * 100);
      setDigits(String(cents));
    }
  }, [value]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const onlyDigits = event.target.value.replace(/\D/g, "");
    setDigits(onlyDigits);

    if (onChange) {
      const realValue = Number(onlyDigits) / 100;
      onChange(realValue);
    }
  }

  return (
    <Input
      name={name}
      placeholder={placeholder}
      type="text"
      value={digits ? formatMoneyFromDigits(digits) : ""}
      onChange={handleChange}
      className={className}
      inputMode="numeric"
      autoComplete="off"
    />
  );
}