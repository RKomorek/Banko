import { useState } from "react";
import { EllipsisVertical, SquarePen, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteTransactionById } from "@/services/transaction.service";
import { toast } from "sonner";
import { DeleteTransactionModal } from "../deleteTransactionModal.component";
import { Row } from "@tanstack/react-table";
import { ITransaction } from "@/interfaces/transaction.interface";
import { EditTransactionModal } from "../editTransactionModal.component";

export default function ActionsColumnsTransactions({
  row,
  onTransactionDeleted,
  onTransactionUpdated,
}: {
  row: Row<ITransaction>;
  onTransactionDeleted: () => void;
  onTransactionUpdated: () => void;
}) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);

  async function handleDelete() {
    const { id } = row.original;
    if (!id) {
      toast.error("ID da transação não encontrado.");
      return;
    }
    const { error } = await deleteTransactionById(id);
    if (error) {
      console.error("Erro ao excluir transação:", error);
      toast.error("Erro ao excluir transação. Tente novamente.");
    } else {
      toast.success("Transação excluída com sucesso!");
      onTransactionDeleted(); // Atualiza a tabela sem recarregar
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setSelectedTransaction(row.original)}
          >
            <SquarePen /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpenDeleteModal(true)}
          >
            <Trash2 /> Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteTransactionModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDelete}
      />

      {selectedTransaction && (
        <EditTransactionModal
          open={!!selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          transaction={selectedTransaction}
          onSuccess={() => {
            onTransactionUpdated(); 
          }}
        />
      )}
    </>
  );
}
