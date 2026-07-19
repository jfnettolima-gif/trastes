"use client";

import { useActionState, useRef, useEffect } from "react";
import { criarUsuario, type CriarUsuarioState } from "./actions";

const initialState: CriarUsuarioState = {};

export default function CriarUsuarioForm() {
  const [state, action, pending] = useActionState(criarUsuario, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
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
            type="text"
            required
            minLength={6}
            placeholder="mínimo 6 caracteres"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="level">
            Nível
          </label>
          <select
            id="level"
            name="level"
            defaultValue="iniciante"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm bg-white"
          >
            <option value="iniciante">Iniciante</option>
            <option value="intermediario">Intermediário</option>
            <option value="avancado">Avançado</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="isAdmin" />
        Tornar esta pessoa administradora (pode criar outras contas)
      </label>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.ok && <p className="text-sm text-green-600">{state.ok}</p>}

      <button type="submit" disabled={pending} className="btn-primary">
        {pending ? "Criando..." : "Criar conta"}
      </button>
    </form>
  );
}
