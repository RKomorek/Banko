"use client";
import { BalanceCard } from "@/components/ui/balance-card";
import { CardPaymentMethod } from "@/components/ui/payment-method";
import { WelcomeCard } from "@/components/ui/welcome-card";
import { cn } from "@/lib/utils";

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
  return (
    <main className="p-4">

      <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">

        <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
          <Container>
            <WelcomeCard></WelcomeCard>
          </Container>
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
