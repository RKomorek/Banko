import { ExternalUser } from "@/types/user";

export async function fetchExternalUsers(): Promise<ExternalUser[]> {
  return [
    { id: "1", fullName: "Bruna Lima", email: "bruna@email.com" },
    { id: "2", fullName: "João Silva", email: "joao@email.com" },
  ];
}
