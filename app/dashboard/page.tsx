import prisma from "@/lib/prisma";
import { MetricCard } from "@/components/metric-card";
import { Users, MapPin, Home, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default async function DashboardPage() {
  // ======== BUSCAS COM PRISMA ========

  const totalClientes = await prisma.clientes.count();

  const clientesComResidencia = await prisma.clientes.count({
    where: { residencia_fixa: true },
  });

  // Cidades
  const clientesCidades = await prisma.clientes.findMany({
    select: { cidade: true },
  });

  const cidadesMap = new Map<string, number>();
  clientesCidades.forEach((c) => {
    const count = cidadesMap.get(c.cidade) || 0;
    cidadesMap.set(c.cidade, count + 1);
  });

  const distribuicaoCidades = Array.from(cidadesMap.entries())
    .map(([cidade, count]) => ({ cidade, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Bairros
  const clientesBairros = await prisma.clientes.findMany({
    select: { bairro: true },
  });

  const bairrosMap = new Map<string, number>();
  clientesBairros.forEach((b) => {
    const count = bairrosMap.get(b.bairro) || 0;
    bairrosMap.set(b.bairro, count + 1);
  });

  const distribuicaoBairros = Array.from(bairrosMap.entries())
    .map(([bairro, count]) => ({ bairro, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // ========= RETORNO DA PÁGINA ========

  return (
    <div className="container py-10 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Visão geral dos seus clientes</p>
      </div>

      {/* MÉTRICAS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total de Clientes"
          value={totalClientes}
          icon={Users}
          description="Clientes cadastrados"
        />

        <MetricCard
          title="Com Residência Fixa"
          value={clientesComResidencia}
          icon={Home}
          description="Clientes com residência"
        />

        <MetricCard
          title="Cidades Atendidas"
          value={distribuicaoCidades.length}
          icon={MapPin}
          description="Diferentes cidades"
        />

        <MetricCard
          title="Bairros Atendidos"
          value={distribuicaoBairros.length}
          icon={TrendingUp}
          description="Diferentes bairros"
        />
      </div>

      {/* TABELAS */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* CINCO CIDADES */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Cidades</CardTitle>
            <CardDescription>
              Distribuição de clientes por cidade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {distribuicaoCidades.length > 0 ? (
                distribuicaoCidades.map((item) => (
                  <div
                    key={item.cidade}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{item.cidade}</span>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      {item.count} clientes
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhum cliente cadastrado ainda
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* CINCO BAIRROS */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Bairros</CardTitle>
            <CardDescription>
              Distribuição de clientes por bairro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {distribuicaoBairros.length > 0 ? (
                distribuicaoBairros.map((item) => (
                  <div
                    key={item.bairro}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{item.bairro}</span>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      {item.count} clientes
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhum cliente cadastrado ainda
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
