import { ColumnDef } from "@tanstack/react-table";
import { formatCurrencyBRL } from "@/lib/formatters";
import { Icons } from "@/components/ui/icons";

export type Transaction = {
  id: string;
  date: string;
  type: "boleto" | "pix" | "cartao";
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
      const typeMap: Record<string, { label: string; icon: React.ElementType }> = {
        pix: { label: "Pix", icon: Icons.pix },
        
        boleto: { label: "Boleto", icon: Icons.boleto},
        cartao: { label: "Cartão", icon: Icons.cartao },
      };

      const data = typeMap[type] ?? { label: type, icon: "" };

      return (
        <span className="flex items-center gap-2 font-medium">
          <data.icon className="h-4 w-4" />
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
