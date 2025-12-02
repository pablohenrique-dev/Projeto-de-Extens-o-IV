"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteClientAction(id: string) {
  if (!id) return { error: "ID inválido." };

  try {
    await prisma.clientes.delete({
      where: { id },
    });

    revalidatePath("/clientes");

    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    return { error: "Não foi possível deletar o cliente." };
  }
}
