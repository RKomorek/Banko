export type Transaction = {
  id: string;
  date: string;
  type: "boleto" | "pix" | "cartao";
  amount: number;
  description: string;
};

export const transactionsMock: Transaction[] = [
  {
    id: "1",
    date: "12/03/2025 10:15",
    type: "pix",
    amount: 2450.5,
    description: "Transferência recebida",
  },
  {
    id: "2",
    date: "14/03/2025 18:20",
    type: "boleto",
    amount: -89.9,
    description: "Pagamento de conta",
  },
  {
    id: "3",
    date: "20/03/2025 12:30",
    type: "cartao",
    amount: -120.0,
    description: "Restaurante",
  },
  {
    id: "4",
    date: "25/03/2025 09:10",
    type: "pix",
    amount: 300.0,
    description: "Reembolso",
  },
  {
    id: "5",
    date: "01/04/2025 21:00",
    type: "boleto",
    amount: -200.0,
    description: "Aluguel",
  },
  {
    id: "6",
    date: "05/04/2025 08:50",
    type: "cartao",
    amount: -45.0,
    description: "Café",
  },
  {
    id: "7",
    date: "08/04/2025 11:05",
    type: "pix",
    amount: 150.0,
    description: "Pix recebido",
  },
  {
    id: "8",
    date: "10/04/2025 15:30",
    type: "boleto",
    amount: -75.5,
    description: "Conta de luz",
  },
  {
    id: "9",
    date: "12/04/2025 17:40",
    type: "cartao",
    amount: -39.9,
    description: "Farmácia",
  },
  {
    id: "10",
    date: "15/04/2025 13:15",
    type: "pix",
    amount: 500.0,
    description: "Venda online",
  },
];
