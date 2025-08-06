"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Search, Filter, X } from "lucide-react"
import { ITransaction } from "@/interfaces/transaction.interface"

interface TransactionFiltersProps {
  transactions: ITransaction[]
  onFilterChange: (filteredTransactions: ITransaction[]) => void
}

export function TransactionFilters({ transactions, onFilterChange }: TransactionFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [movimentacaoFilter, setMovimentacaoFilter] = useState<string>("")
  const [tipoFilter, setTipoFilter] = useState<string>("")
  const [dateFilter, setDateFilter] = useState<string>("")
  const [minValue, setMinValue] = useState<string>("")
  const [maxValue, setMaxValue] = useState<string>("")
  const [showFilters, setShowFilters] = useState(false)

  const applyFilters = () => {
    let filtered = [...transactions]

    // Filtro de busca por descrição
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtro por movimentação (entrada/saída)
    if (movimentacaoFilter) {
      filtered = filtered.filter(transaction =>
        transaction.movimentacao === movimentacaoFilter
      )
    }

    // Filtro por tipo de pagamento
    if (tipoFilter) {
      filtered = filtered.filter(transaction =>
        transaction.tipo === tipoFilter
      )
    }

    // Filtro por data
    if (dateFilter) {
      filtered = filtered.filter(transaction =>
        transaction.data.startsWith(dateFilter)
      )
    }

    // Filtro por valor mínimo
    if (minValue) {
      const min = parseFloat(minValue)
      filtered = filtered.filter(transaction => transaction.valor >= min)
    }

    // Filtro por valor máximo
    if (maxValue) {
      const max = parseFloat(maxValue)
      filtered = filtered.filter(transaction => transaction.valor <= max)
    }

    onFilterChange(filtered)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setMovimentacaoFilter("")
    setTipoFilter("")
    setDateFilter("")
    setMinValue("")
    setMaxValue("")
    onFilterChange(transactions)
  }

  const hasActiveFilters = searchTerm || movimentacaoFilter || tipoFilter || dateFilter || minValue || maxValue

  // Aplicar filtros automaticamente quando qualquer filtro mudar
  useEffect(() => {
    applyFilters()
  }, [searchTerm, movimentacaoFilter, tipoFilter, dateFilter, minValue, maxValue, transactions])

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filtros e Busca</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
              >
                <X className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Barra de busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por descrição..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
            className="pl-10"
          />
        </div>

        {/* Filtros avançados */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="movimentacao">Movimentação</Label>
              <Select value={movimentacaoFilter} onValueChange={(value) => {
                setMovimentacaoFilter(value)
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entrada">Entradas</SelectItem>
                  <SelectItem value="saida">Saídas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Pagamento</Label>
              <Select value={tipoFilter} onValueChange={(value) => {
                setTipoFilter(value)
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cartao">Cartão</SelectItem>
                  <SelectItem value="boleto">Boleto</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 flex flex-col justify-end">
              <Label htmlFor="date">Data</Label>
              <Input className="w-1/4"
                type="date"
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value)
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minValue">Valor Mínimo</Label>
              <Input
                type="number"
                placeholder="R$ 0,00"
                value={minValue}
                onChange={(e) => {
                  setMinValue(e.target.value)
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxValue">Valor Máximo</Label>
              <Input
                type="number"
                placeholder="R$ 0,00"
                value={maxValue}
                onChange={(e) => {
                  setMaxValue(e.target.value)
                }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 