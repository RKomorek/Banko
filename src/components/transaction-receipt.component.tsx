"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { getTransactionById } from "@/services/transaction.service"
import { formatCurrency } from "@/utils/formatCurrency"
import { ITransaction, ITransactionAttachment } from "@/interfaces/transaction.interface"
import { Download, File, Image, FileText, Eye } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

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
    const { data, error } = await getTransactionById(transactionId)
    
    if (error) {
      console.error("Erro ao buscar transação:", error)
    } else {
      setTransaction(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (open && transactionId) {
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
      return <Image className="h-4 w-4" />
    } else if (fileType === 'application/pdf') {
      return <FileText className="h-4 w-4" />
    } else {
      return <File className="h-4 w-4" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (!transaction) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Recibo da Transação</DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Informações da Transação */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{transaction.descricao}</span>
                  <span className={`text-lg font-bold ${
                    transaction.movimentacao === "entrada" ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.movimentacao === "entrada" ? "+" : "-"}
                    {formatCurrency(transaction.valor)}
                  </span>
                </CardTitle>
                <CardDescription>
                  {format(new Date(transaction.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tipo</p>
                    <p className="capitalize">{transaction.tipo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Movimentação</p>
                    <p className="capitalize">{transaction.movimentacao}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Anexos */}
            {transaction.attachments && transaction.attachments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Anexos ({transaction.attachments.length})</CardTitle>
                  <CardDescription>
                    Arquivos anexados a esta transação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transaction.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(attachment.file_type)}
                          <div>
                            <p className="font-medium">{attachment.file_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatFileSize(attachment.file_size)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(attachment.file_url, '_blank')}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Visualizar
                          </Button>
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
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 