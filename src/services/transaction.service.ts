import { supabase } from "@/config/supabaseClient";
import { ITransaction, ITransactionAttachment } from "@/interfaces/transaction.interface";
import { uploadToCloudinary, deleteFromCloudinary } from "./cloudinary.service";

export async function addTransaction(transaction: ITransaction, attachments?: File[]) {
  const { data, error } = await supabase
    .from("transactions")
    .insert([transaction])
    .select()
    .single();

  if (error) {
    return { data, error };
  }

  // Upload de anexos para Cloudinary se houver
  if (attachments && attachments.length > 0 && data) {
    const uploadedAttachments: ITransactionAttachment[] = [];
    
    for (const file of attachments) {
      console.log("📤 Processando anexo:", file.name)
      
      const { data: cloudinaryData, error: uploadError } = await uploadToCloudinary(
        file,
        `banko-transactions/${data.id}`
      );

      if (uploadError) {
        console.error("❌ Erro no upload do anexo para Cloudinary:", uploadError)
        // Continuar com outros anexos mesmo se um falhar
        continue
      }

      if (cloudinaryData) {
        try {
          // Salvar referência do anexo no banco
          const { data: dbAttachment, error: dbError } = await supabase
            .from("transaction_attachments")
            .insert([{
              transaction_id: data.id,
              file_path: cloudinaryData.public_id,
              file_url: cloudinaryData.secure_url,
              file_name: file.name,
              file_size: cloudinaryData.bytes,
              file_type: file.type
            }])
            .select()
            .single();

          if (dbError) {
            console.error("❌ Erro ao salvar anexo no banco:", dbError)
            // Tentar deletar o arquivo do Cloudinary se falhou no banco
            await deleteFromCloudinary(cloudinaryData.public_id)
          } else if (dbAttachment) {
            uploadedAttachments.push(dbAttachment);
            console.log("✅ Anexo salvo com sucesso:", dbAttachment)
          }
        } catch (error) {
          console.error("❌ Erro inesperado ao salvar anexo:", error)
          // Tentar deletar o arquivo do Cloudinary
          await deleteFromCloudinary(cloudinaryData.public_id)
        }
      }
    }

    // Retornar transação com anexos (mesmo que alguns tenham falhado)
    if (uploadedAttachments.length > 0) {
      return { 
        data: { ...data, attachments: uploadedAttachments }, 
        error: null 
      };
    }
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
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from("transactions")
    .select("valor, movimentacao, data")
    .eq("account_id", accountId)
    .gte("data", startDate.toISOString())
    .lte("data", endDate.toISOString())
    .order("data", { ascending: true });

  if (error) {
    return { data: [], error };
  }

  // Agrupar por data
  const groupedData = data.reduce((acc, transaction) => {
    const date = new Date(transaction.data).toISOString().split('T')[0];
    
    if (!acc[date]) {
      acc[date] = { date, entrada: 0, saida: 0 };
    }
    
    if (transaction.movimentacao === 'entrada') {
      acc[date].entrada += transaction.valor;
    } else {
      acc[date].saida += transaction.valor;
    }
    
    return acc;
  }, {} as Record<string, { date: string; entrada: number; saida: number }>);

  // Converter para array e preencher datas vazias
  const result = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    result.push({
      date: dateStr,
      entrada: groupedData[dateStr]?.entrada || 0,
      saida: groupedData[dateStr]?.saida || 0,
    });
  }

  return { data: result, error: null };
}

export async function deleteTransactionById(transactionId: string) {
  // Primeiro, buscar os anexos para deletar do Cloudinary
  const { data: attachments, error: attachmentsError } = await supabase
    .from("transaction_attachments")
    .select("file_path")
    .eq("transaction_id", transactionId);

  if (!attachmentsError && attachments) {
    // Deletar arquivos do Cloudinary
    for (const attachment of attachments) {
      try {
        await deleteFromCloudinary(attachment.file_path);
        console.log("✅ Arquivo deletado do Cloudinary:", attachment.file_path);
      } catch (error) {
        console.error("❌ Erro ao deletar arquivo do Cloudinary:", error);
      }
    }
  }

  // Deletar a transação (isso também deletará os anexos devido à foreign key)
  const { data, error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", transactionId)
    .select()
    .single();

  return { data, error };
}

export async function updateTransaction(id: string, updatedData: Partial<ITransaction>) {
  const { data, error } = await supabase
    .from("transactions")
    .update(updatedData)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}