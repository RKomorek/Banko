"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/dataTables/data-table";
import { getTransactionColumns } from "./columns";
import { useAppContext } from "@/context/app.context";
import { ITransaction } from "@/interfaces/transaction.interface";
import { getTransactionsByAccountId } from "@/services/transaction.service";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CardPaymentMethod } from "@/components/payment-method.component";
import { TransactionFilters } from "@/components/transaction-filters.component";

export default function TransactionsPage() {
  const { accountId } = useAppContext();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (accountId) {
      fetchTransactions();
    }
  }, [accountId, open]);

  async function fetchTransactions() {
    setLoading(true);
    const { data, error } = await getTransactionsByAccountId(accountId!);
   
    if (error) {
      console.error("Erro ao buscar transações:", error);
    } else {
      const transactionsData = data ?? [];
      setTransactions(transactionsData);
      setFilteredTransactions(transactionsData);
      console.log("Transações:", data);
    }

    setLoading(false);
  }

  const handleFilterChange = (filteredData: ITransaction[]) => {
    setFilteredTransactions(filteredData);
  };

  return (
    <main className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button onClick={() => setOpen(true)}>Nova transação</Button>
      </div>
      
      {/* Filtros */}
      <TransactionFilters 
        transactions={transactions} 
        onFilterChange={handleFilterChange} 
      />
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Carregando transações...</p>
        </div>
      ) : (
        <DataTable 
          columns={getTransactionColumns(fetchTransactions, fetchTransactions)} 
          data={filteredTransactions} 
        />
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:bg-transparent sm:border-0 sm:p-0">
          <DialogTitle className="sr-only">Nova Transação</DialogTitle>
          <CardPaymentMethod onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </main>
  );
}
