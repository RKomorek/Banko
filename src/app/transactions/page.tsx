"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/dataTables/data-table";
import { getTransactionColumns } from "./columns";

import { useAppContext } from "@/context/app.context";
import { ITransaction } from "@/interfaces/transaction.interface";
import { getTransactionsByAccountId } from "@/services/transaction.service";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/formatCurrency";

export default function TransactionsPage() {
  const { accountId, saldo } = useAppContext();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (accountId) {
      fetchTransactions();
    }
  }, [accountId]);

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
        <div className="text-2xl font-bold">{formatCurrency(saldo)}</div>
        <Button onClick={() => router.push("/")}>Nova transação</Button>
      </div>
      {loading ? (
        <p>Carregando transações...</p>
      ) : (
        <DataTable columns={getTransactionColumns(fetchTransactions, fetchTransactions)} data={transactions} />
      )}
    </main>
  );
}
