import { Transaction } from "./types"

export const transactionsMock: Transaction[] = [
  {
    id: "1",
    date: "27/05/2025",
    type: "income",
    amount: 3817,
    description: "Salário"
  },
  {
    id: "2",
    date: "02/04/2025",
    type: "income",
    amount: 4661,
    description: "Supermercado"
  },
  {
    id: "3",
    date: "05/02/2025",
    type: "income",
    amount: 3811,
    description: "Transporte"
  },
  {
    id: "4",
    date: "24/02/2025",
    type: "expense",
    amount: 3308,
    description: "Restaurante"
  },
  {
    id: "5",
    date: "09/03/2025",
    type: "income",
    amount: 256,
    description: "Aluguel"
  },
  {
    id: "6",
    date: "31/01/2025",
    type: "income",
    amount: 1267,
    description: "Academia"
  },
  {
    id: "7",
    date: "15/04/2025",
    type: "income",
    amount: 262,
    description: "Farmácia"
  },
  {
    id: "8",
    date: "13/05/2025",
    type: "income",
    amount: 1714,
    description: "Cinema"
  },
  {
    id: "9",
    date: "13/03/2025",
    type: "expense",
    amount: 2444,
    description: "Café"
  },
  {
    id: "10",
    date: "05/03/2025",
    type: "expense",
    amount: 4222,
    description: "Livros"
  }
]
