"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/dataTables/data-table";
import { getTransactionColumns } from "./columns";
import { useAppContext } from "@/context/app.context";
import { ITransaction } from "@/interfaces/transaction.interface";
import { getTransactionsByAccountId } from "@/services/transaction.service";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CardPaymentMethod } from "@/components/payment-method.component";

export default function TransactionsPage() {
  const { accountId } = useAppContext();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
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
      setTransactions(data ?? []);
       console.log("Transações:", data);
    }

    setLoading(false);
  }

  return (
    <main className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button onClick={() => setOpen(true)}>Nova transação</Button>
      </div>
      {loading ? (
        <p>Carregando transações...</p>
      ) : (
        <DataTable columns={getTransactionColumns(fetchTransactions, fetchTransactions)} data={transactions} />
      )}

      <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-transparent border-0 p-0">
        <CardPaymentMethod onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
    </main>
  );
}
