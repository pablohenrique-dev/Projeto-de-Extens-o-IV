"use client";

import z from "zod";
import { updateClientAction } from "../actions/update-client.action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ESTADOS_BR } from "../../constants/states";

interface ClientData {
  id: string;
  nome_completo: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cpf: string | null;
  residencia_fixa: boolean;
  email: string | null;
  telefone: string;
  created_at: Date;
  updated_at: Date;
}

interface EditClientFormParams {
  client: ClientData;
}

const schema = z.object({
  nome_completo: z.string().min(3, "Nome é obrigatório"),
  telefone: z.string().min(8, "Telefone é obrigatório"),
  email: z.email("E-mail inválido").optional().or(z.literal("")),
  cpf: z.string().optional(),
  residencia_fixa: z.boolean(),
  rua: z.string().min(2, "Rua é obrigatória"),
  numero: z.string().min(1, "Número é obrigatório"),
  bairro: z.string().min(2, "Bairro é obrigatório"),
  cidade: z.string().min(2, "Cidade é obrigatória"),
  estado: z.string().min(2, "Estado é obrigatório"),
});

type FormValues = z.infer<typeof schema>;

export function EditClientForm({ client }: EditClientFormParams) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome_completo: client.nome_completo,
      telefone: client.telefone,
      email: client.email || "",
      cpf: client.cpf || "",
      residencia_fixa: client.residencia_fixa,
      rua: client.rua,
      numero: client.numero,
      bairro: client.bairro,
      cidade: client.cidade,
      estado: client.estado,
    },
  });

  async function onSubmit(values: FormValues) {
    const res = await updateClientAction(client.id, {
      ...values,
      cpf: values.cpf || null,
      email: values.email || null,
    });

    if (res.error) {
      setErrorMessage(res.error);
      return;
    }

    router.push("/clientes");
    router.refresh();
  }
  return (
    <div className="container mt-10 p-6 max-w-xl border rounded-xl shadow-sm">
      <h1 className="text-2xl font-semibold mb-4">Editar Cliente</h1>

      {errorMessage && (
        <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Informações de Contato</h2>
            <Separator className="mb-4" />

            <FormField
              control={form.control}
              name="nome_completo"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="José da Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(11) 99999-9999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>E-mail (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="email@exemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>CPF (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="000.000.000-00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">Endereço</h2>
            <Separator className="mb-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rua"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rua</FormLabel>
                    <FormControl>
                      <Input placeholder="Av. Central" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input placeholder="Centro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="São Paulo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="estado"
                render={({ field }) => (
                  <FormItem className="mt-4 flex-1">
                    <FormLabel>Estado</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ESTADOS_BR.map((estado) => (
                          <SelectItem key={estado.uf} value={estado.uf}>
                            {estado.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="residencia_fixa"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between border rounded-lg p-3 mt-4">
                    <div>
                      <FormLabel>Residência Fixa</FormLabel>
                      <FormDescription>
                        Marque se o cliente mora fixamente nesse endereço.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.push("/clientes")}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
