import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/auth";

export default async function AppShell({
  children,
  userName,
  isAdmin,
}: {
  children: React.ReactNode;
  userName?: string;
  isAdmin?: boolean;
}) {
  // Se a página não informar explicitamente, descobrimos aqui se o usuário
  // logado é admin, para o link "Contas" aparecer em qualquer página.
  const showAdmin = isAdmin ?? (await getCurrentUser())?.isAdmin ?? false;
  return (
    <div className="min-h-screen bg-amber-50 md:flex">
      <Sidebar userName={userName} isAdmin={showAdmin} />
      <div className="flex-1 min-w-0">
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </div>
    </div>
  );
}
