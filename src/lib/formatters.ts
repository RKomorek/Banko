/**
 * Formata um número como valor monetário em pt-BR (R$)
 * @param value número a ser formatado
 * @returns string formatada como moeda brasileira
 */
export function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}
