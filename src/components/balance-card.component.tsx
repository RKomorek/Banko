"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { getAccountByUserId } from "@/services/account.service";
import { getUserByAuthId } from "@/services/users.service";
import { useAppContext } from "@/context/app.context";
import { formatCurrency } from "@/utils/formatCurrency";

export function BalanceCard() {
  const { user, setSaldo, saldo } = useAppContext();

  useEffect(() => {
    if (user) fetchAccountByUserId();
  }, [user]);

  async function fetchAccountByUserId() {
    if (!user) return;
    const { data: appUser } = await getUserByAuthId(user.id);
    const { data: accountData, error } = await getAccountByUserId(appUser.id);
    
    if (error) {
      console.error("Erro ao buscar conta:", error.message);
    } else {
      setSaldo(accountData.saldo);
      console.log("Dados da conta:", accountData);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Saldo Atual</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{formatCurrency(saldo)}</div>
        <p className="text-xs text-muted-foreground">
          Saldo disponível em sua conta
        </p>
      </CardContent>
    </Card>
  );
}
