export interface ITransaction {
  id?: string;
  account_id: string;
  descricao: string;
  valor: number;
  tipo: string;
  data: string; // yyyy-mm-dd
  created_at?: string; // yyyy-mm-ddTHH:MM:SS
  movimentacao: "entrada" | "saida";
  transaction_attachments?: ITransactionAttachment[];
}

export interface ITransactionAttachment {
  id?: string;
  transaction_id: string;
  file_path: string;
  file_url: string;
  file_name: string;
  file_size: number;
  file_type: string;
  created_at?: string;
}