import { ColumnDef } from "@tanstack/react-table";
import { formatCurrencyBRL } from "@/lib/formatters";
import { ITransaction } from "@/interfaces/transaction.interface";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import ActionsColumnsTransactions from "@/components/actionsColumns.tsx/actionsColumnsTransactions";
import { Icons } from "@/components/ui/icons";

export function getTransactionColumns(
  onTransactionDeleted: () => Promise<void>,
  onTransactionUpdated: () => Promise<void>
): ColumnDef<ITransaction>[] {
  return [
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at")).toLocaleDateString(
        "pt-BR",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
      );
      const time = new Date(row.getValue("created_at")).toLocaleTimeString(
        "pt-BR",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );
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
    accessorKey: "descricao",
    header: "Descrição",
  },
  {
    accessorKey: "tipo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const type = getValue() as string;
      const typeMap: Record<string, { label: string; icon: React.ElementType }> = {
        pix: { label: "Pix", icon: Icons.pix },
        boleto: { label: "Boleto", icon: Icons.boleto },
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
    accessorKey: "movimentacao",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Movimentação
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const movimentacao = row.getValue("movimentacao") as string;
      return (
        <span>
          {/* {movimentacao === "entrada" ? "🔺" : "🔻"} */}
          {movimentacao.charAt(0).toUpperCase() + movimentacao.slice(1)}
        </span>
      );
    },
  },

  {
    accessorKey: "valor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("valor") as number;
      const movimentacao = row.getValue("movimentacao") as string;
      const isNegative = movimentacao === "saida";
      return (
        <span className={isNegative ? "text-red-500" : "text-green-600"}>
          {formatCurrencyBRL(value)}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => (
        <ActionsColumnsTransactions
          row={row}
          onTransactionDeleted={onTransactionDeleted}
          onTransactionUpdated={onTransactionUpdated}
        />
      ),
  },
];
}
