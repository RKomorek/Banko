import { supabase } from "@/config/supabaseClient";
import { ITransaction, ITransactionAttachment } from "@/interfaces/transaction.interface";
import { uploadTransactionAttachment } from "./storage.service";

export async function addTransaction(transaction: ITransaction, attachments?: File[]) {
  const { data, error } = await supabase
    .from("transactions")
    .insert([transaction])
    .select()
    .single();

  if (error) {
    return { data, error };
  }

  // Upload de anexos se houver
  if (attachments && attachments.length > 0 && data) {
    const uploadedAttachments: ITransactionAttachment[] = [];
    
    for (const file of attachments) {
      const { data: attachmentData, error: uploadError } = await uploadTransactionAttachment(
        file,
        data.id,
        transaction.account_id
      );

      if (!uploadError && attachmentData) {
        // Salvar referência do anexo no banco
        const { data: dbAttachment, error: dbError } = await supabase
          .from("transaction_attachments")
          .insert([{
            transaction_id: data.id,
            file_path: attachmentData.path,
            file_url: attachmentData.url,
            file_name: attachmentData.fileName,
            file_size: attachmentData.fileSize,
            file_type: attachmentData.fileType
          }])
          .select()
          .single();

        if (!dbError && dbAttachment) {
          uploadedAttachments.push(dbAttachment);
        }
      }
    }

    // Retornar transação com anexos
    return { 
      data: { ...data, attachments: uploadedAttachments }, 
      error: null 
    };
  }

  return { data, error };
}

export async function getTransactionsByAccountId(accountId: string) {
  const { data, error } = await supabase
    .from("transactions")
    .select(`
      *,
      transaction_attachments (*)
    `)
    .eq("account_id", accountId)
    .order("data", { ascending: false });

  return { data, error };
}

export async function getTransactionById(transactionId: string) {
  const { data, error } = await supabase
    .from("transactions")
    .select(`
      *,
      transaction_attachments (*)
    `)
    .eq("id", transactionId)
    .single();

  return { data, error };
}

export async function getTransactionsForChart(accountId: string, days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("account_id", accountId)
    .gte("data", startDate.toISOString().split('T')[0])
    .order("data", { ascending: true });

  if (error) {
    return { data: [], error };
  }

  // Agrupar transações por data e calcular entradas vs saídas
  const groupedData = data.reduce((acc: Record<string, { date: string; entrada: number; saida: number }>, transaction) => {
    const date = transaction.data;
    if (!acc[date]) {
      acc[date] = { date, entrada: 0, saida: 0 };
    }
    
    if (transaction.movimentacao === "entrada") {
      acc[date].entrada += transaction.valor;
    } else {
      acc[date].saida += transaction.valor;
    }
    
    return acc;
  }, {});

  // Converter para array e preencher datas vazias
  const result = [];
  const endDate = new Date();
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    result.push({
      date: dateStr,
      entrada: groupedData[dateStr]?.entrada || 0,
      saida: groupedData[dateStr]?.saida || 0,
    });
  }

  return { data: result, error: null };
}

export async function deleteTransactionById(transactionId: string) {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", transactionId);

  return { error };
}


export async function updateTransaction(id: string, updatedData: Partial<ITransaction>) {
  const { data, error } = await supabase
    .from("transactions")
    .update(updatedData)
    .eq("id", id)
    .single();

  return { data, error };
}