"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerAction(data: {
  nome: string;
  email: string;
  senha: string;
}) {
  const { nome, email, senha } = data;

  if (!nome || !email || !senha) {
    return { error: "Todos os campos são obrigatórios." };
  }

  const existingUser = await prisma.usuarios.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Já existe um usuário com esse e-mail." };
  }

  const senha_hash = await bcrypt.hash(senha, 12);

  await prisma.usuarios.create({
    data: {
      nome,
      email,
      senha_hash,
    },
  });

  return { success: true };
}
