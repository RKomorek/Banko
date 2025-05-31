"use client"

import { DataTable } from "@/components/ui/data-table"
import { transactionsMock } from "./data"
import { columns } from "./columns"

export default function TransactionsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transações</h1>
      <DataTable columns={columns} data={transactionsMock} />
    </main>
  )
}
