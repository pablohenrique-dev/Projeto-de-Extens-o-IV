import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center text-black px-6">
      <h1 className="text-4xl font-semibold mb-4">Cliente não encontrado</h1>
      <p className="text-lg text-black/70 mb-8 text-center max-w-md">
        O recurso que você está tentando acessar não existe, foi removido ou o
        identificador fornecido é inválido.
      </p>

      <Link
        href="/dashboard"
        className="px-5 py-2 bg-black text-white rounded-lg hover:bg-black/80 transition"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
