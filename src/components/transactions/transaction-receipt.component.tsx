"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { getTransactionById } from "@/services/transaction.service"
import { formatCurrency } from "@/utils/formatCurrency"
import { ITransaction, ITransactionAttachment } from "@/interfaces/transaction.interface"
import { Download, File, Image, FileText, Eye, Calendar, CreditCard, ArrowUpRight, ArrowDownLeft, Receipt } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"

interface TransactionReceiptProps {
  transactionId: string
  children: React.ReactNode
}

export function TransactionReceipt({ transactionId, children }: TransactionReceiptProps) {
  const [transaction, setTransaction] = useState<ITransaction | null>(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const fetchTransaction = async () => {
    if (!transactionId) return
    
    setLoading(true)
    try {
      const { data, error } = await getTransactionById(transactionId)
      
      if (error) {
        console.error("Erro ao buscar transação:", error)
      } else {
        console.log("Transação carregada:", data)
        console.log("Estrutura dos anexos:", data?.transaction_attachments)
        console.log("Tipo dos anexos:", typeof data?.transaction_attachments)
        console.log("Quantidade de anexos:", data?.transaction_attachments?.length)
        
        if (data?.transaction_attachments) {
          data.transaction_attachments.forEach((attachment: ITransactionAttachment, index: number) => {
            console.log(`Anexo ${index}:`, attachment)
            console.log(`- URL: ${attachment.file_url}`)
            console.log(`- Tipo: ${attachment.file_type}`)
            console.log(`- Nome: ${attachment.file_name}`)
          })
        }
        
        setTransaction(data)
      }
    } catch (error) {
      console.error("Erro inesperado:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (open && transactionId) {
      console.log("Abrindo modal para transação:", transactionId)
      fetchTransaction()
    }
  }, [open, transactionId])

  const handleDownload = async (attachment: ITransactionAttachment) => {
    try {
      const response = await fetch(attachment.file_url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = attachment.file_name
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Erro ao baixar arquivo:", error)
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className="h-4 w-4 text-blue-500" />
    } else if (fileType === 'application/pdf') {
      return <FileText className="h-4 w-4 text-red-500" />
    } else {
      return <File className="h-4 w-4 text-gray-500" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getTransactionIcon = (movimentacao: string) => {
    return movimentacao === "entrada" ? (
      <ArrowUpRight className="h-5 w-5 text-green-500" />
    ) : (
      <ArrowDownLeft className="h-5 w-5 text-red-500" />
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Recibo da Transação
          </DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2 text-muted-foreground">Carregando...</span>
          </div>
        ) : transaction ? (
          <div className="space-y-6">

            {/* Cabeçalho da Transação */}
            <Card className="border-2">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getTransactionIcon(transaction.movimentacao)}
                    <div>
                      <CardTitle className="text-xl">{transaction.descricao}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(transaction.data), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      transaction.movimentacao === "entrada" ? "text-green-600" : "text-red-600"
                    }`}>
                      {transaction.movimentacao === "entrada" ? "+" : "-"}
                      {formatCurrency(transaction.valor)}
                    </div>
                    <Badge variant={transaction.movimentacao === "entrada" ? "default" : "destructive"}>
                      {transaction.movimentacao === "entrada" ? "Entrada" : "Saída"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tipo</p>
                      <p className="capitalize font-medium">{transaction.tipo}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">ID da Transação</p>
                    <p className="font-mono text-sm">{transaction.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Anexos */}
            {transaction.transaction_attachments && transaction.transaction_attachments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <File className="h-5 w-5" />
                    Anexos ({transaction.transaction_attachments.length})
                  </CardTitle>
                  <CardDescription>
                    Arquivos anexados a esta transação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {transaction.transaction_attachments.map((attachment, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            {getFileIcon(attachment.file_type)}
                            <div className="flex-1">
                              <p className="font-medium">{attachment.file_name}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatFileSize(attachment.file_size)} • {attachment.file_type}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {attachment.file_type.startsWith('image/') && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(attachment.file_url, '_blank')}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Visualizar
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(attachment)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Baixar
                            </Button>
                          </div>
                        </div>
                        
                        {/* Preview de imagem */}
                        {attachment.file_type.startsWith('image/') && (
                          <div className="mt-3">
                            <img
                              src={attachment.file_url}
                              alt={attachment.file_name}
                              className="max-w-full h-48 object-cover rounded-lg border"
                              onError={(e) => {
                                console.error("Erro ao carregar imagem:", attachment.file_url)
                                e.currentTarget.style.display = 'none';
                              }}
                              onLoad={() => {
                                console.log("Imagem carregada com sucesso:", attachment.file_url)
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Informações Adicionais */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Adicionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Data de Criação</p>
                    <p className="font-medium">
                      {transaction.created_at ? 
                        format(new Date(transaction.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR }) :
                        format(new Date(transaction.data), "dd/MM/yyyy", { locale: ptBR })
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <Badge variant="outline">Concluída</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">Transação não encontrada</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 