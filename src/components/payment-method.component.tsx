import { useState, useEffect } from "react";
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
import {
  addTransaction,
  updateTransaction,
} from "@/services/transaction.service";
import { updateAccountBalance } from "@/services/account.service";
import { useAppContext } from "@/context/app.context";
import { toast } from "sonner";
import { ITransaction } from "@/interfaces/transaction.interface";

export function CardPaymentMethod({
  initialData,
  onSuccess,
  onCancel,
}: {
  initialData?: ITransaction; // Se tiver, está editando!
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const [moneyValue, setMoneyValue] = useState<number>(0);
  const [paymentType, setPaymentType] = useState<string>("cartao");
  const [movingType, setMovingType] = useState<string>("entrada");
  const [descricao, setDescricao] = useState<string>("");

  const { accountId, setSaldo, saldo } = useAppContext();

  useEffect(() => {
    if (initialData) {
      setMoneyValue(initialData.valor);
      setPaymentType(initialData.tipo);
      setMovingType(initialData.movimentacao);
      setDescricao(initialData.descricao);
    }
  }, [initialData]);

  async function handleSubmit() {
    if (!accountId) {
      toast.error("Conta não encontrada");
      return;
    }
    if (!moneyValue || !descricao) {
      toast.error("Preencha todos os campos corretamente.");
      return;
    }

    if (initialData) {
      // Modo edição
      if (!initialData.id) {
        toast.error("ID da transação não encontrado.");
        return;
      }
      const { error } = await updateTransaction(initialData.id, {
        descricao,
        valor: moneyValue,
        tipo: paymentType,
        movimentacao: movingType as "entrada" | "saida",
        created_at: new Date().toISOString().slice(0, 16),
      });

      if (error) {
        console.error("Erro ao editar transação:", error);
        toast.error("Erro ao editar transação. Tente novamente.");
      } else {
        let delta = 0;
        if (movingType === initialData.movimentacao) {
          // Mesmo tipo, só ajusta a diferença
          delta =
            movingType === "entrada"
              ? moneyValue - initialData.valor
              : -(moneyValue - initialData.valor);
        } else {
          // Tipo mudou: desfaz o valor antigo e aplica o novo
          if (
            movingType === "entrada" &&
            initialData.movimentacao === "saida"
          ) {
            // De saída para entrada: soma o antigo (removendo a saída) e soma o novo (adicionando a entrada)
            delta =  moneyValue;
          } else if (
            movingType === "saida" &&
            initialData.movimentacao === "entrada"
          ) {
            // De entrada para saída: subtrai o antigo (removendo a entrada) e subtrai o novo (adicionando a saída)
            delta = -moneyValue;
          }
        }

        const { error: balanceError } = await updateAccountBalance(
          accountId,
          delta
        );

        if (balanceError) {
          console.error("Erro ao atualizar saldo:", balanceError);
          toast.error("Transação editada, mas erro ao atualizar saldo.");
        } else {
          setSaldo((typeof saldo === "number" ? saldo : 0) + delta);
        }
        toast.success("Transação editada com sucesso!");
        onSuccess?.();
      }
    } else {
      // Modo criação
      const transactionData = {
        account_id: accountId,
        descricao,
        valor: moneyValue,
        tipo: paymentType,
        data: new Date().toISOString().slice(0, 16),
        movimentacao: movingType as "entrada" | "saida",
      };

      const { data, error } = await addTransaction(transactionData);

      if (error) {
        console.error("Erro ao cadastrar transação:", error);
        toast.error("Erro ao cadastrar transação. Tente novamente.");
      } else {
        const delta = movingType === "entrada" ? moneyValue : -moneyValue;
        const { error: balanceError } = await updateAccountBalance(
          accountId,
          delta
        );

        if (balanceError) {
          console.error("Erro ao atualizar saldo:", balanceError);
          toast.error("Transação criada, mas erro ao atualizar saldo.");
        } else {
          setSaldo((typeof saldo === "number" ? saldo : 0) + delta);
          toast.success("Transação cadastrada e saldo atualizado!");
          console.log("Transação cadastrada:", data);
        }

        handleDelete();
      }
    }
  }

  function handleDelete() {
    setDescricao("");
    setPaymentType("cartao");
    setMovingType("entrada");
    setMoneyValue(0);
  }
  const handleCancel = () => {
    handleDelete();
    onCancel?.();
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {initialData ? "Editar transação" : "Nova transação"}
        </CardTitle>
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
          {["cartao", "boleto", "pix"].map((type) => (
            <div key={type}>
              <RadioGroupItem value={type} id={type} className="peer sr-only" />
              <Label
                htmlFor={type}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                {type === "cartao" && <Icons.cartao />}
                {type === "boleto" && <Icons.boleto className="mb-3 h-6 w-6" />}
                {type === "pix" && <Icons.pix className="mb-3 h-6 w-6" />}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="justify-center flex items-center">
          <RadioGroup
            value={movingType}
            onValueChange={setMovingType}
            defaultValue="entrada"
            className="grid grid-cols-2 gap-4 w-3xs"
          >
            {["entrada", "saida"].map((type) => (
              <div key={type}>
                <RadioGroupItem
                  value={type}
                  id={type}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={type}
                  className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground
                    ${
                      type === "entrada"
                        ? "peer-data-[state=checked]:border-green-600"
                        : "peer-data-[state=checked]:border-red-600"
                    }`}
                >
                  {type === "entrada" ? (
                    <BanknoteArrowUp className="mb-1 h-6 w-6" />
                  ) : (
                    <BanknoteArrowDown className="mb-1 h-6 w-6" />
                  )}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Label>
              </div>
            ))}
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
                movingType === "entrada" ? "text-green-600" : "text-red-600"
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
      <CardFooter className="flex items-center justify-between gap-2">
        <Button variant="outline" onClick={handleCancel} className="">
          Cancelar
        </Button>

        <Button onClick={handleSubmit} className="">
          {initialData ? "Salvar alterações" : "Salvar transação"}
        </Button>
      </CardFooter>
    </Card>
  );
}
