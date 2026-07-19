"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4 py-10">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-amber-900">Trastes</h1>
        <p className="mt-1 text-sm text-neutral-500">Entre para continuar seus estudos.</p>

        <form action={action} className="mt-6 space-y-4">
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
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </div>

          {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

          <button type="submit" disabled={pending} className="btn-primary w-full">
            {pending ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-sm text-neutral-500">
          O acesso é restrito. Se você ainda não tem uma conta, fale com o
          administrador.
        </p>
      </div>
    </div>
  );
}
