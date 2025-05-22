import { ColumnDef } from "@tanstack/react-table";
import { formatCurrencyBRL } from "@/lib/formatters";

export type Transaction = {
  id: string;
  date: string;
  type: "income" | "expense";
  amount: number;
  description: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ getValue }) => {
      const type = getValue() as string;
      return type === "income" ? "Entrada 💰" : "Saída 💸";
    },
  },

  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ getValue }) => formatCurrencyBRL(getValue() as number),
  },
];
