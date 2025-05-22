import { ColumnDef } from "@tanstack/react-table";
import { formatCurrencyBRL } from "@/lib/formatters";

export type Transaction = {
  id: string;
  date: string;
  type: "boleto" | "pix" | "cartão";
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

      const typeMap: Record<string, { label: string; icon: string }> = {
        pix: { label: "Pix", icon: "❖" },
        boleto: { label: "Boleto", icon: "🧾" },
        cartao: { label: "Cartão", icon: "💳" },
      };

      const data = typeMap[type] ?? { label: type, icon: "" };

      return (
        <span className="flex items-center gap-2 font-medium">
          <span>{data.icon}</span>
          <span>{data.label}</span>
        </span>
      );
    },
  },

  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      const isNegative = value < 0;
      return (
        <span className={isNegative ? "text-red-500" : "text-green-600"}>
          {formatCurrencyBRL(value)}
        </span>
      );
    },
  },
];
