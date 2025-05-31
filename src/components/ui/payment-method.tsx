import { useState } from "react";
import { supabase } from "@/config/supabaseClient";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Icons } from "./icons";
import { Label } from "./label";
import MoneyInput from "./money-input";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Input } from "./input";
import { Switch } from "./switch";

export function CardPaymentMethod() {
  const [moneyValue, setMoneyValue] = useState<number>(0);
  const [paymentType, setPaymentType] = useState<string>("cartao");
  const [description, setDescription] = useState<string>("");
  const [isEntry, setIsEntry] = useState<boolean>(true);

  async function setTransaction() {
    if (moneyValue <= 0) {
      console.error("Valor inválido!");
      return;
    }

    const transactionType = isEntry ? "entrada" : "saida";

    const { data, error } = await supabase
      .from("account")
      .insert([{
        value: isEntry ? moneyValue : -moneyValue,
        payment_method: paymentType,
        description: description,
        transaction_type: transactionType
      }]);

    if (error) {
      console.error("Erro ao inserir transação:", error);
      return { error };
    }

    console.log("Transação registrada com sucesso:", data);
    return { data };
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Transação</CardTitle>
        <CardDescription>Escolha o método de pagamento e insira o valor.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup value={paymentType} onValueChange={setPaymentType} defaultValue="cartao" className="grid grid-cols-3 gap-4">
          <div>
            <RadioGroupItem value="cartao" id="cartao" className="peer sr-only" />
            <Label
              htmlFor="cartao"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Icons.cartao></Icons.cartao>
              Cartão
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="boleto"
              id="boleto"
              className="peer sr-only"
            />
            <Label
              htmlFor="boleto"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Icons.boleto className="mb-3 h-6 w-6" />
              Boleto
            </Label>
          </div>
          <div>
            <RadioGroupItem value="pix" id="pix" className="peer sr-only" />
            <Label
              htmlFor="pix"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Icons.pix className="mb-3 h-6 w-6" />
              Pix
            </Label>
          </div>
        </RadioGroup>
        <div className="grid gap-2">
          <Label htmlFor="descricao">Descrição</Label>
          <Input name="descricao" placeholder="Detalhe a transação aqui" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="grid gap-2">
          <Label>Tipo de Transação</Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="transaction-type"
              checked={isEntry}
              onCheckedChange={setIsEntry}
              aria-label="Alternar entre Entrada e Saída"
            />
            <Label htmlFor="transaction-type" className="text-muted-foreground">
              {isEntry ? "Entrada" : "Saída"}
            </Label>
          </div>

        </div>
        <div className="grid gap-2">
          <Label htmlFor="valor">Valor</Label>
          <MoneyInput name="money" placeholder="R$ 0,00" onChange={setMoneyValue} />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={setTransaction}>Continuar</Button>
      </CardFooter>
    </Card>
  );
}
