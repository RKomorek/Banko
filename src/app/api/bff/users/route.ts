import { NextResponse } from "next/server";

export async function GET() {
  const users = [
    { id: "1", name: "Bruna Lima" },
    { id: "2", name: "João Silva" },
  ];

  return NextResponse.json(users);
}