import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { LineChart, Line } from "recharts";
import { ChartContainer } from "./chart";

const data = [
  { revenue: 10400, subscription: 240 },
  { revenue: 14405, subscription: 300 },
  { revenue: 9400, subscription: 200 },
  { revenue: 8200, subscription: 278 },
  { revenue: 7000, subscription: 189 },
  { revenue: 9600, subscription: 239 },
  { revenue: 11244, subscription: 278 },
  { revenue: 26475, subscription: 189 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  subscription: {
    label: "Subscriptions",
    color: "hsl(var(--secondary))",
  },
};

export function BalanceCard() {
  return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Saldo</CardTitle>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="text-2xl font-bold">R$10.675,89</div>
          <p className="text-xs text-muted-foreground">
            +20.1% desde o último mês
          </p>
          <ChartContainer config={chartConfig} className="h-[80px] w-full">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="revenue"
                stroke="var(--primary)"
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
  );
}