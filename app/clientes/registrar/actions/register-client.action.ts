"use server";

import prisma from "@/lib/prisma";

export async function registerClientAction(data: {
  nome_completo: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cpf?: string | null;
  residencia_fixa: boolean;
  email?: string | null;
  telefone: string;
}) {
  try {
    await prisma.clientes.create({
      data: {
        nome_completo: data.nome_completo,
        rua: data.rua,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        cpf: data.cpf || null,
        residencia_fixa: data.residencia_fixa,
        email: data.email || null,
        telefone: data.telefone,
      },
    });

    return { success: true };
  } catch (err) {
    console.error("Erro ao cadastrar cliente:", err);
    return { error: "Falha ao cadastrar cliente." };
  }
}
