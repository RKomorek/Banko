"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getTransactionsByAccountId } from "@/services/transaction.service"
import { useAppContext } from "@/context/app.context"
import { formatCurrency } from "@/utils/formatCurrency"
import { useEffect, useState } from "react"
import { ITransaction } from "@/interfaces/transaction.interface"
import { TrendingUp, TrendingDown, CreditCard, Receipt } from "lucide-react"

export function FinancialMetrics() {
  const { accountId } = useAppContext()
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (accountId) {
      fetchTransactions()
    }
  }, [accountId])

  const fetchTransactions = async () => {
    if (!accountId) return
    
    setLoading(true)
    const { data, error } = await getTransactionsByAccountId(accountId)
    
    if (error) {
      console.error("Erro ao buscar transações:", error)
    } else {
      setTransactions(data || [])
    }
    setLoading(false)
  }

  const getMetrics = () => {
    if (!transactions.length) return {}

    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    const currentMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.data)
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear
    })

    const previousMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.data)
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
      return transactionDate.getMonth() === prevMonth && 
             transactionDate.getFullYear() === prevYear
    })

    const currentMonthEntradas = currentMonthTransactions
      .filter(t => t.movimentacao === "entrada")
      .reduce((sum, t) => sum + t.valor, 0)

    const currentMonthSaidas = currentMonthTransactions
      .filter(t => t.movimentacao === "saida")
      .reduce((sum, t) => sum + t.valor, 0)

    const previousMonthEntradas = previousMonthTransactions
      .filter(t => t.movimentacao === "entrada")
      .reduce((sum, t) => sum + t.valor, 0)

    const previousMonthSaidas = previousMonthTransactions
      .filter(t => t.movimentacao === "saida")
      .reduce((sum, t) => sum + t.valor, 0)

    // Calcular tendências
    const entradaTrend = previousMonthEntradas > 0 
      ? ((currentMonthEntradas - previousMonthEntradas) / previousMonthEntradas) * 100
      : 0

    const saidaTrend = previousMonthSaidas > 0
      ? ((currentMonthSaidas - previousMonthSaidas) / previousMonthSaidas) * 100
      : 0

    // Método de pagamento mais usado
    const paymentMethods = transactions.reduce((acc, t) => {
      acc[t.tipo] = (acc[t.tipo] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const mostUsedPayment = Object.entries(paymentMethods)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || "N/A"

    return {
      currentMonthEntradas,
      currentMonthSaidas,
      entradaTrend,
      saidaTrend,
      mostUsedPayment,
      totalTransactions: transactions.length
    }
  }

  const metrics = getMetrics()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Métricas Financeiras</CardTitle>
          <CardDescription>Carregando...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 bg-muted animate-pulse rounded"></div>
            <div className="h-20 bg-muted animate-pulse rounded"></div>
            <div className="h-20 bg-muted animate-pulse rounded"></div>
            <div className="h-20 bg-muted animate-pulse rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Métricas Financeiras</CardTitle>
        <CardDescription>Análise detalhada do seu comportamento financeiro</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Entradas do Mês</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(metrics.currentMonthEntradas)}
            </div>
            <div className="flex items-center gap-1 text-xs">
              {metrics.entradaTrend && metrics.entradaTrend > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              <span className={metrics.entradaTrend && metrics.entradaTrend > 0 ? "text-green-600" : "text-red-600"}>
                {metrics.entradaTrend && Math.abs(metrics.entradaTrend).toFixed(1)}% vs mês anterior
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium">Saídas do Mês</span>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(metrics.currentMonthSaidas)}
            </div>
            <div className="flex items-center gap-1 text-xs">
              {metrics.saidaTrend && metrics.saidaTrend < 0 ? (
                <TrendingDown className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingUp className="h-3 w-3 text-red-600" />
              )}
              <span className={metrics.saidaTrend && metrics.saidaTrend < 0 ? "text-green-600" : "text-red-600"}>
                {metrics.saidaTrend && Math.abs(metrics.saidaTrend).toFixed(1)}% vs mês anterior
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Método Mais Usado</span>
            </div>
            <div className="text-lg font-semibold capitalize">
              {metrics.mostUsedPayment}
            </div>
            <div className="text-xs text-muted-foreground">
              Forma de pagamento preferida
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Total de Transações</span>
            </div>
            <div className="text-2xl font-bold">
              {metrics.totalTransactions}
            </div>
            <div className="text-xs text-muted-foreground">
              Transações registradas
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 