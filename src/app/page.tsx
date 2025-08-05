"use client";

import { BalanceCard } from "@/components/balance-card.component";
import { CardPaymentMethod } from "@/components/payment-method.component";
import { WelcomeCard } from "@/components/welcome-card.component";
import { FinancialChart } from "@/components/financial-chart.component";
import { FinancialMetrics } from "@/components/financial-metrics.component";
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
  );
}

export default function Home() {
  return (
    <main className="p-4 space-y-6">
      {/* Top Section - Welcome, Balance and New Transaction */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Container>
            <WelcomeCard />
          </Container>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <Container>
            <BalanceCard />
          </Container>
        </div>
        <div className="lg:col-span-1 row-span-2 space-y-6">
          <Container>
            <CardPaymentMethod />
          </Container>
          <Container>
            <FinancialMetrics />
          </Container>
        </div>
        <div className="lg:col-span-2 row-span-2 space-y-6">
          <Container>
            <FinancialChart />
          </Container>
        </div>
        
      </div>
    </main>
  );
}
