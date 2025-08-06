import { supabase } from "@/config/supabaseClient"

export async function uploadTransactionAttachment(
  file: File, 
  transactionId: string,
  accountId: string
) {
  try {
    console.log("🚀 Iniciando upload:", { fileName: file.name, transactionId, accountId })
    
    const fileExt = file.name.split('.').pop()
    const fileName = `${transactionId}_${Date.now()}.${fileExt}`
    const filePath = `transactions/${accountId}/${fileName}`

    console.log("📁 Caminho do arquivo:", filePath)

    // Verificar se o bucket existe
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    if (bucketsError) {
      console.error("❌ Erro ao listar buckets:", bucketsError)
      return { data: null, error: bucketsError }
    }

    console.log("📦 Buckets disponíveis:", buckets?.map(b => b.name))

    const bucketExists = buckets?.some(bucket => bucket.name === 'transaction-attachments')
    console.log("✅ Bucket 'transaction-attachments' existe:", bucketExists)

    if (!bucketExists) {
      console.error("❌ Bucket 'transaction-attachments' não encontrado")
      console.log("💡 Buckets encontrados:", buckets?.map(b => b.name))
      return { 
        data: null, 
        error: { 
          message: `Bucket 'transaction-attachments' não encontrado. Buckets disponíveis: ${buckets?.map(b => b.name).join(', ')}` 
        }
      }
    }

    // Verificar se o arquivo é válido
    if (!file || file.size === 0) {
      return { 
        data: null, 
        error: { message: "Arquivo inválido ou vazio" }
      }
    }

    // Verificar tamanho do arquivo (máximo 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return { 
        data: null, 
        error: { message: "Arquivo muito grande. Tamanho máximo: 10MB" }
      }
    }

    console.log("📤 Fazendo upload do arquivo...")
    
    // Upload do arquivo
    const { data, error } = await supabase.storage
      .from('transaction-attachments')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('❌ Erro ao fazer upload:', error)
      
      // Verificar se é erro de política
      if (error.message?.includes('policy') || error.message?.includes('permission')) {
        return { 
          data: null, 
          error: { 
            message: `Erro de permissão. Verifique as políticas do bucket 'transaction-attachments'. Erro: ${error.message}` 
          }
        }
      }
      
      return { data: null, error }
    }

    console.log("✅ Upload realizado com sucesso:", data)

    // Gerar URL pública
    const { data: urlData } = supabase.storage
      .from('transaction-attachments')
      .getPublicUrl(filePath)

    console.log("🔗 URL pública gerada:", urlData.publicUrl)

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
  } catch (error) {
    console.error("❌ Erro inesperado no upload:", error)
    return { data: null, error }
  }
}

export async function deleteTransactionAttachment(filePath: string) {
  try {
    console.log("🗑️ Deletando arquivo:", filePath)
    
    const { error } = await supabase.storage
      .from('transaction-attachments')
      .remove([filePath])

    if (error) {
      console.error("❌ Erro ao deletar arquivo:", error)
    } else {
      console.log("✅ Arquivo deletado com sucesso")
    }

    return { error }
  } catch (error) {
    console.error("❌ Erro inesperado ao deletar:", error)
    return { error }
  }
}

export async function getTransactionAttachments(transactionId: string) {
  try {
    console.log("📋 Buscando anexos para transação:", transactionId)
    
    const { data, error } = await supabase
      .from('transaction_attachments')
      .select('*')
      .eq('transaction_id', transactionId)

    if (error) {
      console.error("❌ Erro ao buscar anexos:", error)
    } else {
      console.log("✅ Anexos encontrados:", data?.length || 0)
    }

    return { data, error }
  } catch (error) {
    console.error("❌ Erro inesperado ao buscar anexos:", error)
    return { data: null, error }
  }
} 