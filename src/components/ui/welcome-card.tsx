import { Card, CardContent, CardHeader, CardTitle } from "./card";

export function WelcomeCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Olá, Carol!</CardTitle>
      </CardHeader>
      <CardContent className="text-left">
        <p>
          É ótimo contar com sua presença!
        </p>
        <p className="text-sm text-muted-foreground">
          Explore as oportunidades disponíveis hoje.
        </p>
      </CardContent>
    </Card>
  );
}
