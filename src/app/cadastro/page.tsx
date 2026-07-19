"use client";

import { useActionState } from "react";
import Link from "next/link";
import { cadastrar, type CadastroState } from "./actions";

const initialState: CadastroState = {};

export default function CadastroPage() {
  const [state, action, pending] = useActionState(cadastrar, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4 py-10">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-amber-900">Trastes</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Crie sua conta e comece a aprender guitarra do jeito certo.
        </p>

        <form action={action} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Nome
            </label>
            <input
              id="name"
              name="name"
              required
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="level">
              Seu nível hoje
            </label>
            <select
              id="level"
              name="level"
              defaultValue="iniciante"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            >
              <option value="iniciante">Iniciante absoluto</option>
              <option value="intermediario">Já toco um pouco</option>
              <option value="avancado">Avançado</option>
            </select>
          </div>

          {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

          <button type="submit" disabled={pending} className="btn-primary w-full">
            {pending ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-6 text-sm text-neutral-500">
          Já tem conta?{" "}
          <Link href="/login" className="text-amber-700 font-medium">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
