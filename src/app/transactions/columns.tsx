import { ColumnDef } from "@tanstack/react-table";
import { formatCurrencyBRL } from "@/lib/formatters";
import { ITransaction } from "@/interfaces/transaction.interface";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Paperclip, Receipt, File, FileText } from "lucide-react";
import { Icons } from "@/components/ui/icons";
import { TransactionReceipt } from "@/components/transactions/transaction-receipt.component";
import { Badge } from "@/components/ui/badge";
import ActionsColumnsTransactions from "@/components/actionsColumns/actionsColumnsTransactions";


export const columns: ColumnDef<ITransaction>[] = [
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
    accessorKey: "attachments",
    header: "Anexos",
    cell: ({ row }) => {
      const attachments = row.original.transaction_attachments;
      const hasAttachments = attachments && attachments.length > 0;
      
      if (!hasAttachments) {
        return <span className="text-sm text-muted-foreground">-</span>;
      }

      return (
        <div className="flex items-center gap-2">
          {/* Preview da primeira imagem */}
          {attachments.some(att => att.file_type.startsWith('image/')) && (
            <div className="relative">
              {attachments.find(att => att.file_type.startsWith('image/')) && (
                <img
                  src={attachments.find(att => att.file_type.startsWith('image/'))!.file_url}
                  alt="Preview"
                  className="h-8 w-8 rounded object-cover border"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
            </div>
          )}
          
          {/* Badge com contagem */}
          <Badge variant="secondary" className="flex items-center gap-1">
            <Paperclip className="h-3 w-3" />
            {attachments.length}
          </Badge>
          
          {/* Ícones por tipo */}
          <div className="flex items-center gap-1">
            {attachments.map((attachment, index) => {
              if (attachment.file_type.startsWith('image/')) {
                return <File key={index} className="h-3 w-3 text-blue-500" />;
              } else if (attachment.file_type === 'application/pdf') {
                return <FileText key={index} className="h-3 w-3 text-red-500" />;
              } else {
                return <File key={index} className="h-3 w-3 text-gray-500" />;
              }
            })}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <TransactionReceipt transactionId={row.original.id!}>
          <Button variant="outline" size="sm">
            <Receipt className="h-4 w-4 mr-2" />
            Recibo
          </Button>
        </TransactionReceipt>
        <ActionsColumnsTransactions
          row={row}
          onTransactionDeleted={async () => {}}
          onTransactionUpdated={async () => {}}
        />
      </div>
    ),
  },
];
