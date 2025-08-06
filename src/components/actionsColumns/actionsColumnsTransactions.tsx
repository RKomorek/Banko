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
import { useAppContext } from "@/context/app.context";
import { updateAccountBalance } from "@/services/account.service";

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
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null);
  const { accountId, setSaldo, saldo } = useAppContext();

  async function handleDelete() {
    const { id, valor, movimentacao } = row.original;
    if (!id) {
      toast.error("ID da transação não encontrado.");
      return;
    }
    if (!accountId) {
      toast.error("Conta não encontrada.");
      return;
    }

    // Lógica de estorno do saldo
    let delta = 0;
    if (movimentacao === "entrada") {
      delta = -valor; // Remove do saldo
    } else if (movimentacao === "saida") {
      delta = valor; // Reembolsa no saldo
    }

    const { error: balanceError } = await updateAccountBalance(
      accountId,
      delta
    );

    if (balanceError) {
      console.error("Erro ao atualizar saldo:", balanceError);
      toast.error("Transação editada, mas erro ao atualizar saldo.");
    } else {
      setSaldo((typeof saldo === "number" ? saldo : 0) + delta);
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