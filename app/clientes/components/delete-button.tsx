"use client";

import { deleteClientAction } from "../actions/delete-client.action";

export function DeleteClientButton({ id }: { id: string }) {
  async function handleDelete() {
    const ok = confirm("Tem certeza que deseja excluir este cliente?");
    if (!ok) return;

    await deleteClientAction(id);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
    >
      Excluir
    </button>
  );
}
