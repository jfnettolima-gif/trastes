import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AppShell from "@/components/AppShell";
import CriarUsuarioForm from "./CriarUsuarioForm";
import { excluirUsuario } from "./actions";

export default async function AdminUsuariosPage() {
  const admin = await requireAdmin();

  const usuarios = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      level: true,
      isAdmin: true,
      createdAt: true,
    },
  });

  return (
    <AppShell userName={admin.name} isAdmin={admin.isAdmin}>
      <h1 className="text-2xl font-bold text-amber-900">Administração · Contas</h1>
      <p className="text-neutral-600 mt-1 mb-6">
        Só você (administrador) vê esta área. Crie aqui as contas das pessoas que
        podem acessar o Trastes.
      </p>

      <div className="card p-6">
        <h2 className="font-semibold text-amber-900 mb-4">Criar nova conta</h2>
        <CriarUsuarioForm />
      </div>

      <div className="card p-6 mt-6">
        <h2 className="font-semibold text-amber-900 mb-4">
          Contas existentes ({usuarios.length})
        </h2>
        <div className="divide-y divide-neutral-200">
          {usuarios.map((u) => (
            <div key={u.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-neutral-800">
                  {u.name}
                  {u.isAdmin && (
                    <span className="ml-2 text-[11px] bg-amber-100 text-amber-800 rounded px-1.5 py-0.5">
                      admin
                    </span>
                  )}
                </p>
                <p className="text-sm text-neutral-500">
                  {u.email} · {u.level}
                </p>
              </div>
              {u.id !== admin.id && (
                <form action={excluirUsuario}>
                  <input type="hidden" name="id" value={u.id} />
                  <button className="text-sm text-red-600 hover:text-red-800">
                    Excluir
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
