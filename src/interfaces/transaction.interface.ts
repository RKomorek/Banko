export interface ITransaction {
  id?: string;
  account_id: string;
  descricao: string;
  valor: number;
  tipo: string;
  data: string; // yyyy-mm-dd
  created_at?: string; // yyyy-mm-ddTHH:MM:SS
  movimentacao: "entrada" | "saida";
}