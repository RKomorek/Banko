import { supabase } from "@/config/supabaseClient"

export async function uploadTransactionAttachment(
  file: File, 
  transactionId: string,
  accountId: string
) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${transactionId}_${Date.now()}.${fileExt}`
  const filePath = `transactions/${accountId}/${fileName}`

  const { data, error } = await supabase.storage
    .from('transaction-attachments')
    .upload(filePath, file)

  if (error) {
    console.error('Erro ao fazer upload:', error)
    console.log('Erro ao fazer upload data', data)
    return { data, error }
  }

  // Gerar URL pública
  const { data: urlData } = supabase.storage
    .from('transaction-attachments')
    .getPublicUrl(filePath)

  return { 
    data: { 
      path: filePath, 
      url: urlData.publicUrl,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    }, 
    error: null 
  }
}

export async function deleteTransactionAttachment(filePath: string) {
  const { error } = await supabase.storage
    .from('transaction-attachments')
    .remove([filePath])

  return { error }
}

export async function getTransactionAttachments(transactionId: string) {
  const { data, error } = await supabase
    .from('transaction_attachments')
    .select('*')
    .eq('transaction_id', transactionId)

  return { data, error }
} 