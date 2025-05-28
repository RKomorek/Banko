"use client";

import { BalanceCard } from "@/components/ui/balance-card";
import { Button } from "@/components/ui/button";
import { Modal, ModalCloseButton } from "@/components/ui/modal";
import { CardPaymentMethod } from "@/components/ui/payment-method";
import { IUser } from "@/interfaces/users.interfaces";
import { cn } from "@/lib/utils";
import { fetchUsers } from "@/services/users.service";
import { useEffect, useState } from "react";

function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  )
}

export default function Home() {


  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchUsers();
      if (error) {
        console.error('Erro ao buscar usuários:', error);
      } else {
        setUsers(data);
      }
    };
    fetchData();
  }, []);
  return (
    <main className="p-4">

      <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">

        <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
          <Container>
            <BalanceCard></BalanceCard>
          </Container>
        </div>
        <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
          <Container>
            <CardPaymentMethod />
          </Container>
        </div>
      </div>
    </main >
  );
}
