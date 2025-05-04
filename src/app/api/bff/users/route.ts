import connectToMongoDB from "@/libs/mongoDB";
import users from "@/models/users";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToMongoDB();
    const allUsers = await users.find();
    return NextResponse.json(allUsers);
  } catch (error) {
    console.error("Erro no GET /users:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Campos obrigatórios: name, email, password" },
        { status: 400 }
      );
    }

    await connectToMongoDB();
    await users.create({ name, email, password });

    return NextResponse.json(
      { message: "Usuário criado com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no POST /users:", error);
    return NextResponse.json(
      { error: "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}
