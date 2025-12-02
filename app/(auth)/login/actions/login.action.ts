"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function loginAction(data: { email: string; senha: string }) {
  const { email, senha } = data;

  if (!email || !senha) {
    return { error: "E-mail e senha são obrigatórios." };
  }

  const user = await prisma.usuarios.findUnique({
    where: { email },
  });

  if (!user) return { error: "Credenciais inválidas." };

  const valid = await bcrypt.compare(senha, user.senha_hash);
  if (!valid) return { error: "Credenciais inválidas." };

  const token = jwt.sign(
    { sub: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  const cookieStore = await cookies();
  cookieStore.set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return { success: true };
}
