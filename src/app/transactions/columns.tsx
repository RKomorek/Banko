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
    cell: ({ getValue }) => {
      const [date, time] = (getValue() as string).split(" ");
      return (
        <div className="whitespace-nowrap">
          {date}
          <br />
          <span className="text-muted-foreground text-xs">{time}</span>
        </div>
      );
    },
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
