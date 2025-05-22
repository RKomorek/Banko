export type Transaction = {
  id: string;
  date: string;
  type: "income" | "expense";
  amount: number;
  description: string;
};

export const transactionsMock: Transaction[] = [
  {
    id: "1",
    date: "03/05/2025 23:29",
    type: "expense",
    amount: 4523,
    description: "Salário",
  },
  {
    id: "2",
    date: "16/03/2025 09:55",
    type: "income",
    amount: 2618,
    description: "Supermercado",
  },
  {
    id: "3",
    date: "23/02/2025 14:16",
    type: "expense",
    amount: 3202,
    description: "Transporte",
  },
  {
    id: "4",
    date: "26/02/2025 15:15",
    type: "income",
    amount: 1834,
    description: "Restaurante",
  },
  {
    id: "5",
    date: "17/04/2025 03:01",
    type: "income",
    amount: 4187,
    description: "Aluguel",
  },
  {
    id: "6",
    date: "10/01/2025 13:08",
    type: "income",
    amount: 2581,
    description: "Academia",
  },
  {
    id: "7",
    date: "28/05/2025 17:22",
    type: "income",
    amount: 4694,
    description: "Farmácia",
  },
  {
    id: "8",
    date: "10/02/2025 13:31",
    type: "expense",
    amount: 4233,
    description: "Cinema",
  },
  {
    id: "9",
    date: "24/05/2025 13:56",
    type: "expense",
    amount: 1083,
    description: "Café",
  },
  {
    id: "10",
    date: "25/03/2025 00:55",
    type: "expense",
    amount: 3937,
    description: "Livros",
  },
];
