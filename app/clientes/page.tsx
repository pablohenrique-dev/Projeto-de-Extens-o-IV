/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DeleteClientButton } from "./components/delete-button";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const page = Number((await searchParams)?.page || 1);
  const search = (await searchParams)?.search || "";
  const cidade = (await searchParams)?.cidade || "";
  const residencia = (await searchParams)?.residencia || "all";

  const PAGE_SIZE = 20;

  const where: any = {};

  if (search) {
    where.OR = [
      { nome_completo: { contains: search, mode: "insensitive" } },
      { bairro: { contains: search, mode: "insensitive" } },
    ];
  }

  if (cidade) {
    where.cidade = {
      equals: cidade,
      mode: "insensitive",
    };
  }

  if (residencia !== "all") {
    where.residencia_fixa = residencia === "true";
  }

  const totalClientes = await prisma.clientes.count({ where });
  const totalPages = Math.ceil(totalClientes / PAGE_SIZE);

  if (page > totalPages && totalPages > 0) {
    redirect(`/clients?page=${totalPages}`);
  }

  const clientes = await prisma.clientes.findMany({
    where,
    take: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
    orderBy: { created_at: "desc" },
  });

  const cidades = await prisma.clientes.findMany({
    distinct: ["cidade"],
    select: { cidade: true },
    orderBy: { cidade: "asc" },
  });

  return (
    <div className="container py-10 space-y-8">
      <h1 className="text-3xl font-bold">Clientes</h1>
      <form className="grid gap-4 md:grid-cols-4">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Buscar por nome ou bairro"
          className="border p-2 rounded"
        />

        <select
          name="cidade"
          defaultValue={cidade}
          className="border p-2 rounded"
        >
          <option value="">Todas as cidades</option>
          {cidades.map((c) => (
            <option key={c.cidade} value={c.cidade}>
              {c.cidade}
            </option>
          ))}
        </select>

        <select
          name="residencia"
          defaultValue={residencia}
          className="border p-2 rounded"
        >
          <option value="all">Residência (todos)</option>
          <option value="true">Com residência fixa</option>
          <option value="false">Sem residência fixa</option>
        </select>

        <button type="submit" className="bg-primary text-white rounded p-2">
          Filtrar
        </button>
      </form>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left">
            <tr>
              <th className="p-2">Nome</th>
              <th className="p-2">Cidade</th>
              <th className="p-2">Bairro</th>
              <th className="p-2">Residência Fixa?</th>
              <th className="p-2">Criado em</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-4 text-center text-muted-foreground"
                >
                  Nenhum cliente encontrado
                </td>
              </tr>
            )}

            {clientes.map((cliente) => (
              <tr key={cliente.id} className="border-t">
                <td className="p-2 font-medium">{cliente.nome_completo}</td>
                <td className="p-2">{cliente.cidade}</td>
                <td className="p-2">{cliente.bairro}</td>
                <td className="p-2">
                  {cliente.residencia_fixa ? "Sim" : "Não"}
                </td>
                <td className="p-2">
                  {new Date(cliente.created_at).toLocaleDateString("pt-BR")}
                </td>

                <td className="p-2 flex gap-2">
                  <Link
                    href={`/clientes/${cliente.id}`}
                    className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Editar
                  </Link>

                  <DeleteClientButton id={cliente.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex gap-2 justify-center pt-4">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNumber = i + 1;

            const url = new URLSearchParams({
              page: pageNumber.toString(),
              search: typeof search === "string" ? search : "",
              cidade: typeof cidade === "string" ? cidade : "",
              residencia: typeof residencia === "string" ? residencia : "all",
            });

            return (
              <Link
                key={i}
                href={`/clients?${url.toString()}`}
                className={`px-3 py-1 rounded border ${
                  pageNumber === page
                    ? "bg-primary text-white"
                    : "bg-background"
                }`}
              >
                {pageNumber}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
