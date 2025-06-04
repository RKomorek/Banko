"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, CartesianGrid } from "recharts";
import { ChartContainer } from "./ui/chart";
import { getAccountByUserId } from "@/services/account.service";
import { getUserByAuthId } from "@/services/users.service";
import { getTransactionsByAccountId } from "@/services/transaction.service";
import { useAppContext } from "@/context/app.context";
import { formatCurrency } from "@/utils/formatCurrency";

const chartConfig = {
  saldo: {
    label: "Saldo",
    color: "hsl(var(--primary))",
  },
};

export function BalanceCard() {
  const { user, setSaldo, saldo } = useAppContext();
  const [chartData, setChartData] = useState<{ saldo: number; label: string }[]>([]);

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  if (!user) return null;
  const userId = user.id;

  async function fetchData() {
    try {
      const { data: appUser } = await getUserByAuthId(userId);
      const { data: account, error: accError } = await getAccountByUserId(appUser.id);
      if (accError || !account) throw new Error("Erro ao buscar conta");

      setSaldo(account.saldo);

      const { data: transactions, error: transError } = await getTransactionsByAccountId(account.id);
      if (transError || !transactions) throw new Error("Erro ao buscar transações");

      const ultimas10 = transactions.slice(-10);
      let saldoAcumulado = account.saldo;
      const acumulado = [{ saldo: saldoAcumulado, label: "Saldo Inicial" }];

      for (const { valor, movimentacao, created_at } of ultimas10) {
        saldoAcumulado += movimentacao === "saida" ? -Math.abs(Number(valor)) : Math.abs(Number(valor));
        acumulado.push({
          saldo: saldoAcumulado,
          label: new Date(created_at).toLocaleDateString("pt-BR"),
        });
      }

      const ultimaTransacao = transactions.reduce((prev, curr) =>
        new Date(curr.created_at).getTime() > new Date(prev.created_at).getTime() ? curr : prev
      );
      if (ultimaTransacao) {
        acumulado.push({
          saldo: saldoAcumulado,
          label: `Última Transação (${new Date(ultimaTransacao.created_at).toLocaleDateString("pt-BR")})`,
        });
      }

      setChartData(acumulado.reverse());
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Saldo</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="text-2xl font-bold">{formatCurrency(saldo)}</div>
        <p className="text-xs text-muted-foreground">Histórico das últimas transações</p>
        <ChartContainer config={chartConfig} className="h-[80px] w-full sm:block hidden">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
          >
            <CartesianGrid />
            <Line type="monotone" strokeWidth={2} dataKey="saldo" stroke="var(--primary)" activeDot={{ r: 6 }} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
