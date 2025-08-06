export interface CloudinaryUploadResult {
  public_id: string
  url: string
  secure_url: string
  format: string
  width: number
  height: number
  bytes: number
  created_at: string
}

export async function uploadToCloudinary(
  file: File,
  folder: string = 'banko-transactions'
): Promise<{ data: CloudinaryUploadResult | null; error: any }> {
  try {
    console.log('🚀 Iniciando upload para Cloudinary:', { fileName: file.name, folder })
    
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

    // Criar FormData para enviar para a API
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    console.log('📤 Enviando arquivo para API...')
    
    // Fazer upload via API route
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('❌ Erro na API:', result.error)
      return { data: null, error: result.error }
    }

    console.log('✅ Upload realizado com sucesso:', result.data)
    
    return { data: result.data, error: null }
  } catch (error) {
    console.error('❌ Erro no upload para Cloudinary:', error)
    return { data: null, error }
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<{ error: any }> {
  try {
    console.log('🗑️ Deletando arquivo do Cloudinary:', publicId)
    
    const response = await fetch(`/api/upload?publicId=${encodeURIComponent(publicId)}`, {
      method: 'DELETE'
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('❌ Erro ao deletar arquivo:', result.error)
      return { error: result.error }
    }

    console.log('✅ Arquivo deletado do Cloudinary com sucesso')
    return { error: null }
  } catch (error) {
    console.error('❌ Erro ao deletar arquivo do Cloudinary:', error)
    return { error }
  }
}

// Função para gerar URL de preview (opcional)
export function getCloudinaryUrl(publicId: string, options: {
  width?: number
  height?: number
  quality?: string
  format?: string
} = {}) {
  const { width, height, quality = 'auto:good', format = 'auto' } = options
  
  let url = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`
  
  if (width || height) {
    url += `/w_${width || 'auto'},h_${height || 'auto'}`
  }
  
  url += `/q_${quality},f_${format}/${publicId}`
  
  return url
} 