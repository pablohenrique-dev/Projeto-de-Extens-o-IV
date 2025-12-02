"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type UpdateClientData = {
  nome_completo: string;
  telefone: string;
  email: string | null;
  cpf: string | null;
  residencia_fixa: boolean;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
};

export async function updateClientAction(id: string, data: UpdateClientData) {
  try {
    const existingClient = await prisma.clientes.findUnique({
      where: { id },
    });

    if (!existingClient) {
      return { error: "Cliente não encontrado" };
    }

    await prisma.clientes.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });

    revalidatePath("/clientes");
    revalidatePath(`/clientes/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    return { error: "Erro ao atualizar cliente. Tente novamente." };
  }
}
