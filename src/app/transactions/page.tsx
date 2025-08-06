"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/dataTables/data-table";
import { columns } from "./columns";
import { ITransaction } from "@/interfaces/transaction.interface";
import { getTransactionsByAccountId } from "@/services/transaction.service";
import { useAppContext } from "@/context/app.context";
import { Button } from "@/components/ui/button";
import { CardPaymentMethod } from "@/components/payment-method.component";
import { TransactionFilters } from "@/components/transactions/transaction-filters.component";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Plus, RefreshCw } from "lucide-react";
import { TransactionSkeleton } from "@/components/ui/loading-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { toast } from "sonner";

export default function TransactionsPage() {
  const { accountId } = useAppContext();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (accountId) {
      loadTransactions();
    }
  }, [accountId]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await getTransactionsByAccountId(accountId!);
      if (error) {
        console.error("Erro ao carregar transações:", error);
        setError("Erro ao carregar transações. Tente novamente.");
        toast.error("Erro ao carregar transações");
        return;
      }
      setTransactions(data || []);
      setFilteredTransactions(data || []);
      if (data && data.length > 0) {
        toast.success(`${data.length} transação(ões) carregada(s)`);
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      setError("Erro inesperado. Tente novamente.");
      toast.error("Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filteredData: ITransaction[]) => {
    setFilteredTransactions(filteredData);
  };

  const handleTransactionAdded = () => {
    setIsDialogOpen(false);
    loadTransactions();
    toast.success("Transação criada com sucesso!");
  };

  const handleRetry = () => {
    loadTransactions();
  };

  if (loading) {
    return (
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Transações</h1>
          <Button disabled>
            <Plus className="w-4 h-4 mr-2" />
            Nova Transação
          </Button>
        </div>
        <TransactionSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Transações</h1>
          <Button onClick={handleRetry} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar Novamente
          </Button>
        </div>
        <EmptyState
          title="Erro ao carregar transações"
          description={error}
          action={{
            label: "Tentar Novamente",
            onClick: handleRetry,
            icon: <RefreshCw className="h-4 w-4 mr-2" />
          }}
          variant="transactions"
        />
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Transações</h1>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Transação
          </Button>
        </div>
        <EmptyState
          title="Nenhuma transação encontrada"
          description="Comece criando sua primeira transação para acompanhar suas finanças."
          action={{
            label: "Criar Primeira Transação",
            onClick: () => setIsDialogOpen(true)
          }}
          variant="transactions"
        />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Transações</h1>
          <p className="text-muted-foreground">
            {filteredTransactions.length} de {transactions.length} transação(ões)
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Transação
        </Button>
      </div>

      <TransactionFilters 
        transactions={transactions} 
        onFilterChange={handleFilterChange} 
      />

      {filteredTransactions.length === 0 ? (
        <EmptyState
          title="Nenhuma transação encontrada"
          description="Tente ajustar os filtros para ver mais resultados."
          variant="transactions"
        />
      ) : (
        <DataTable columns={columns} data={filteredTransactions} />
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogTitle className="sr-only">Nova Transação</DialogTitle>
          <CardPaymentMethod onSuccess={handleTransactionAdded} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
