"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getTransactionsForChart } from "@/services/transaction.service"
import { useAppContext } from "@/context/app.context"
import { formatCurrency } from "@/utils/formatCurrency"
import { useState } from "react"
import { useEffect } from "react"

const chartConfig = {
  entrada: {
    label: "Entradas",
    color: "#10b981", 
  },
  saida: {
    label: "Saídas", 
    color: "#ef4444",
  },
} satisfies ChartConfig

interface ChartDataItem {
  date: string
  entrada: number
  saida: number
}

export function FinancialChart() {
  const { accountId } = useAppContext()
  const [timeRange, setTimeRange] = useState("30d")
  const [chartData, setChartData] = useState<ChartDataItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (accountId) {
      fetchChartData()
    }
  }, [accountId, timeRange])

  const fetchChartData = async () => {
    if (!accountId) return
    
    setLoading(true)
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
    const { data, error } = await getTransactionsForChart(accountId, days)
    
    if (error) {
      console.error("Erro ao buscar dados do gráfico:", error)
    } else {
      setChartData(data || [])
    }
    setLoading(false)
  }

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case "7d": return "últimos 7 dias"
      case "30d": return "últimos 30 dias"
      case "90d": return "últimos 3 meses"
      default: return "últimos 30 dias"
    }
  }

  const getTotalEntradas = () => {
    return chartData.reduce((sum, item) => sum + item.entrada, 0)
  }

  const getTotalSaidas = () => {
    return chartData.reduce((sum, item) => sum + item.saida, 0)
  }

  const getSaldo = () => {
    return getTotalEntradas() - getTotalSaidas()
  }

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Análise Financeira</CardTitle>
          <CardDescription>
            Mostrando entradas e saídas dos {getTimeRangeLabel()}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Selecionar período"
          >
            <SelectValue placeholder="Últimos 30 dias" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="7d" className="rounded-lg">
              Últimos 7 dias
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Últimos 30 dias
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Últimos 3 meses
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {loading ? (
          <div className="flex items-center justify-center h-[250px]">
            <p className="text-muted-foreground">Carregando dados...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Entradas</p>
                <p className="text-lg font-semibold text-green-600">
                  {formatCurrency(getTotalEntradas())}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Saídas</p>
                <p className="text-lg font-semibold text-red-600">
                  {formatCurrency(getTotalSaidas())}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Saldo</p>
                <p className={`text-lg font-semibold ${getSaldo() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(getSaldo())}
                </p>
              </div>
            </div>
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[300px] w-full"
            >
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="fillEntrada" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#10b981"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="#10b981"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillSaida" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#ef4444"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="#ef4444"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("pt-BR", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      }}
                      formatter={(value, name) => [
                        formatCurrency(Number(value)),
                        name === "entrada" ? "Entradas" : "Saídas"
                      ]}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="entrada"
                  type="natural"
                  fill="url(#fillEntrada)"
                  stroke="#10b981"
                  strokeWidth={2}
                  stackId="a"
                />
                <Area
                  dataKey="saida"
                  type="natural"
                  fill="url(#fillSaida)"
                  stroke="#ef4444"
                  strokeWidth={2}
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </>
        )}
      </CardContent>
    </Card>
  )
} 