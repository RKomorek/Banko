import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteTransactionById } from "@/services/transaction.service";
import { toast } from "sonner";
import { DeleteTransactionModal } from "../deleteTransactionModal.component";
import { Row } from "@tanstack/react-table";
import { ITransaction } from "@/interfaces/transaction.interface";

export default function ActionsColumnsTransactions({
  row,
  onTransactionDeleted,
}: {
   row: Row<ITransaction>;
  onTransactionDeleted: () => void;
}) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDeleteModal(true)}>
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteTransactionModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
