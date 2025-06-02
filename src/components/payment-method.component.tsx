import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Icons } from "./ui/icons";
import { Label } from "./ui/label";
import MoneyInput from "./ui/money-input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Input } from "./ui/input";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import { addTransaction } from "@/services/transaction.service";
import { useAppContext } from "@/context/app.context";
import { toast } from "sonner";
import { updateAccountBalance } from "@/services/account.service";

export function CardPaymentMethod() {
  const [moneyValue, setMoneyValue] = useState<number>(0);
  const [paymentType, setPaymentType] = useState<string>("cartao");
  const [movingType, setMovingType] = useState<string>("entrada");
  const [descricao, setDescricao] = useState<string>("");

  const { accountId, setSaldo, saldo } = useAppContext();

  async function handleTransaction() {
    if (!accountId) {
      toast.error("Conta não encontrada");
      return;
    }
    if (!moneyValue || !descricao) {
      toast.error("Preencha todos os campos corretamente.");
      return;
    }

    const transactionData = {
      account_id: accountId,
      descricao,
      valor: moneyValue,
      tipo: paymentType,
      data: new Date().toISOString().slice(0, 16), // yyyy-mm-ddTHH:MM
      movimentacao: movingType as "entrada" | "saida",
    };

    const { data, error } = await addTransaction(transactionData);

    if (error) {
      console.error("Erro ao cadastrar transação:", error);
      toast.error("Erro ao cadastrar transação. Tente novamente.");
    } else {
      console.log("Transação cadastrada:", data);

      // Atualiza o saldo da conta
      const delta = movingType === "entrada" ? moneyValue : -moneyValue;
      const { error: balanceError } = await updateAccountBalance(
        accountId,
        delta
      );

      if (balanceError) {
        console.error("Erro ao atualizar saldo:", balanceError);
        toast.error(
          "Transação cadastrada, mas houve um erro ao atualizar o saldo."
        );
      } else {
          setSaldo((typeof saldo === "number" ? saldo : 0) + delta);
        toast.success("Transação cadastrada e saldo atualizado!");
      }
      setDescricao("");
      setPaymentType("cartao");
      setMovingType("entrada");
      setMoneyValue(0);
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Transação</CardTitle>
        <CardDescription>
          Escolha o método de pagamento e insira o valor.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup
          value={paymentType}
          onValueChange={setPaymentType}
          defaultValue="cartao"
          className="grid grid-cols-3 gap-4"
        >
          <div>
            <RadioGroupItem
              value="cartao"
              id="cartao"
              className="peer sr-only"
            />
            <Label
              htmlFor="cartao"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Icons.card></Icons.card>
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
        <div className="justify-center flex items-center">
          <RadioGroup
            value={movingType}
            onValueChange={setMovingType}
            defaultValue="entrada "
            className="grid grid-cols-2 gap-4 w-3xs"
          >
            <div>
              <RadioGroupItem
                value="entrada"
                id="entrada"
                className="peer sr-only"
              />
              <Label
                htmlFor="entrada"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-600 [&:has([data-state=checked])]:border-green-600"
              >
                <BanknoteArrowUp className="mb-1 h-6 w-6" />
                Entrada
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="saida"
                id="saida"
                className="peer sr-only"
              />
              <Label
                htmlFor="saida"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-red-600 [&:has([data-state=checked])]:border-red-600"
              >
                <BanknoteArrowDown className="mb-1 h-6 w-6" />
                Saída
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label htmlFor="valor">Valor</Label>
            <MoneyInput
              name="money"
              placeholder="R$ 0,00"
              onChange={setMoneyValue}
              value={moneyValue}
              className={`${
                movingType === "entrada" ? " text-green-600" : " text-red-600"
              }`}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="descricao">Descrição</Label>
            <Input
              name="descricao"
              value={descricao}
              placeholder="Descrição da transação"
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleTransaction}>
          Continuar
        </Button>
      </CardFooter>
    </Card>
  );
}
