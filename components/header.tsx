"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo / Título */}
        <Link href="/clientes/dashboard" className="text-xl font-bold">
          MEUS CLIENTES
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/clientes"
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Lista de Clientes
          </Link>

          <Link
            href="/clientes/registrar"
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Novo Cliente
          </Link>
        </nav>

        {/* Menu Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>Navegação</SheetTitle>
              </SheetHeader>

              <div className="mt-4 flex flex-col gap-4 mx-4">
                <Link
                  href="/clientes"
                  className="text-sm font-medium hover:text-blue-600"
                >
                  Lista de Clientes
                </Link>

                <Link
                  href="/clientes/registrar"
                  className="text-sm font-medium hover:text-blue-600"
                >
                  Novo Cliente
                </Link>

                <Link
                  href="/dashboard"
                  className="text-sm font-medium hover:text-blue-600"
                >
                  Dashboard
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
