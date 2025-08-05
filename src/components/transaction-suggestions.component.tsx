"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from "./ui/select";
import { Trash } from "lucide-react";

interface TransactionSuggestionsProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

const commonDescriptions = [
  { label: "Alimentação", value: "Alimentação" },
  { label: "Transporte", value: "Transporte" },
  { label: "Moradia", value: "Moradia" },
  { label: "Saúde", value: "Saúde" },
  { label: "Educação", value: "Educação" },
  { label: "Lazer", value: "Lazer" },
  { label: "Vestuário", value: "Vestuário" },
  { label: "Serviços", value: "Serviços" },
  { label: "Salário", value: "Salário" },
  { label: "Freelance", value: "Freelance" },
  { label: "Investimentos", value: "Investimentos" },
  { label: "Presente", value: "Presente" },
  { label: "Reembolso", value: "Reembolso" },
  { label: "Transferência", value: "Transferência" },
  { label: "Pagamento", value: "Pagamento" },
  { label: "Recebimento", value: "Recebimento" },
  { label: "Compras", value: "Compras" },
  { label: "Contas", value: "Contas" },
  { label: "Seguros", value: "Seguros" },
  { label: "Impostos", value: "Impostos" },
];

export function TransactionSuggestions({
  value,
  onValueChange,
  placeholder = "Digite a descrição...",
}: TransactionSuggestionsProps) {
  const [inputValue, setInputValue] = useState(value);

  const filteredSuggestions = commonDescriptions.filter(
    (description: { label: string; value: string }) =>
      description.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    onValueChange(newValue);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setInputValue(suggestion);
    onValueChange(suggestion);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <Input
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder}
        className="pr-10"
      />
      <Select onValueChange={handleSuggestionSelect} value={inputValue}>
        <SelectTrigger className=""></SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filteredSuggestions.map((suggestion) => (
              <SelectItem key={suggestion.value} value={suggestion.value}>
                {suggestion.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        className="h-full px-3 py-2 hover:bg-transparent"
        onClick={() => {
          handleSuggestionSelect("");
        }}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}
