import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { EditClientForm } from "./components/edit-client-form";
import z from "zod";

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const uuidSchema = z.uuid();

  const parseResult = uuidSchema.safeParse(id);

   if (!parseResult.success) {
    return notFound();
  }

  const client = await prisma.clientes.findUnique({ where: { id } });

  if (!client) {
    notFound();
  }

  return <EditClientForm client={client} />;
}
