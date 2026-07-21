"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/app/login/actions";
import { NAV_SECTIONS, NAV_FLAT } from "@/content/nav";

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Um item está ativo se a rota é exatamente ele ou uma sub-rota (/escala-maior/1).
function isAtivo(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

// Descobre em que seção mora a rota atual, para já abrir essa seção.
function secaoDaRota(pathname: string): string | null {
  for (const sec of NAV_SECTIONS) {
    if (sec.itens.some((i) => isAtivo(pathname, i.href))) return sec.titulo;
  }
  return null;
}

export default function Sidebar({
  userName,
  isAdmin,
}: {
  userName?: string;
  isAdmin?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Seção aberta (accordion de uma por vez). Começa na seção da rota atual.
  const [aberta, setAberta] = useState<string | null>(() => secaoDaRota(pathname));

  // Ao trocar de rota: fecha overlays e reabre a seção correspondente.
  useEffect(() => {
    setMobileOpen(false);
    setPaletteOpen(false);
    const s = secaoDaRota(pathname);
    if (s) setAberta(s);
  }, [pathname]);

  // Atalho global ⌘K / Ctrl+K abre a busca.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navContent = (
    <NavContent
      pathname={pathname}
      aberta={aberta}
      onToggle={(t) => setAberta((cur) => (cur === t ? null : t))}
      isAdmin={isAdmin}
      userName={userName}
    />
  );

  return (
    <>
      {/* Barra superior (só mobile) */}
      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-[#241a12] text-amber-50 px-4 h-14">
        <button
          aria-label="Abrir menu"
          onClick={() => setMobileOpen(true)}
          className="p-2 -ml-2 text-amber-100 hover:text-amber-300"
        >
          <BurgerIcon />
        </button>
        <Link href="/dashboard" className="font-bold tracking-tight">
          🎸 Trastes
        </Link>
        <button
          aria-label="Buscar"
          onClick={() => setPaletteOpen(true)}
          className="p-2 -mr-2 text-amber-100 hover:text-amber-300"
        >
          <SearchIcon />
        </button>
      </div>

      {/* Sidebar fixa (desktop) */}
      <aside className="hidden md:flex md:flex-col w-64 shrink-0 h-screen sticky top-0 bg-[#241a12] text-amber-50 border-r border-black/30">
        <div className="px-4 py-4">
          <Link href="/dashboard" className="font-bold text-lg tracking-tight">
            🎸 Trastes
          </Link>
        </div>
        <div className="px-3">
          <button
            onClick={() => setPaletteOpen(true)}
            className="w-full flex items-center gap-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 px-3 py-2 text-sm text-amber-100/70 transition-colors"
          >
            <SearchIcon />
            <span>Buscar</span>
            <kbd className="ml-auto text-[10px] rounded bg-white/10 px-1.5 py-0.5 font-mono">
              ⌘K
            </kbd>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-3">{navContent}</nav>
        <Footer isAdmin={isAdmin} userName={userName} />
      </aside>

      {/* Drawer (mobile) */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 max-w-[85%] bg-[#241a12] text-amber-50 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-4 py-4">
              <span className="font-bold text-lg">🎸 Trastes</span>
              <button
                aria-label="Fechar menu"
                onClick={() => setMobileOpen(false)}
                className="p-1 text-amber-100 hover:text-amber-300"
              >
                <CloseIcon />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-2">{navContent}</nav>
            <Footer isAdmin={isAdmin} userName={userName} />
          </div>
        </div>
      )}

      {/* Busca ⌘K */}
      {paletteOpen && (
        <CommandPalette
          onClose={() => setPaletteOpen(false)}
          onGo={(href) => {
            setPaletteOpen(false);
            router.push(href);
          }}
        />
      )}
    </>
  );
}

function NavContent({
  pathname,
  aberta,
  onToggle,
  isAdmin,
  userName,
}: {
  pathname: string;
  aberta: string | null;
  onToggle: (titulo: string) => void;
  isAdmin?: boolean;
  userName?: string;
}) {
  return (
    <div className="space-y-1">
      <Link
        href="/dashboard"
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isAtivo(pathname, "/dashboard")
            ? "bg-amber-500/20 text-amber-100"
            : "text-amber-100/80 hover:bg-white/5"
        }`}
      >
        <span className="text-amber-300">◆</span> Painel
      </Link>

      {NAV_SECTIONS.map((sec) => {
        const open = aberta === sec.titulo;
        const temAtivo = sec.itens.some((i) => isAtivo(pathname, i.href));
        return (
          <div key={sec.titulo}>
            <button
              onClick={() => onToggle(sec.titulo)}
              className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                temAtivo ? "text-amber-300" : "text-amber-100/50 hover:text-amber-100/80"
              }`}
            >
              <span>{sec.titulo}</span>
              <Chevron open={open} />
            </button>
            {open && (
              <div className="mt-0.5 mb-1 space-y-0.5">
                {sec.itens.map((item) => {
                  const ativo = isAtivo(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 rounded-lg py-1.5 pl-5 pr-3 text-sm transition-colors border-l-2 ${
                        ativo
                          ? "border-amber-400 bg-amber-500/15 text-amber-100 font-medium"
                          : "border-transparent text-amber-100/70 hover:bg-white/5 hover:text-amber-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {isAdmin && (
        <Link
          href="/admin/usuarios"
          className={`mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            isAtivo(pathname, "/admin/usuarios")
              ? "bg-amber-500/20 text-amber-200"
              : "text-amber-300/90 hover:bg-white/5"
          }`}
        >
          <span>⚙</span> Contas
        </Link>
      )}

      {/* Info do usuário só aparece aqui no mobile (no desktop vai no rodapé) */}
      <div className="md:hidden pt-2">
        {userName && (
          <p className="px-3 py-1 text-xs text-amber-100/50">{userName}</p>
        )}
      </div>
    </div>
  );
}

function Footer({ isAdmin, userName }: { isAdmin?: boolean; userName?: string }) {
  return (
    <div className="border-t border-white/10 px-3 py-3 flex items-center justify-between gap-2">
      <div className="min-w-0">
        {userName && (
          <p className="text-sm text-amber-100/90 truncate">{userName}</p>
        )}
        <p className="text-[11px] text-amber-100/40">{isAdmin ? "Administrador" : "Aluno"}</p>
      </div>
      <form action={logout}>
        <button className="text-xs rounded-lg border border-white/15 px-2.5 py-1.5 text-amber-100/80 hover:bg-white/5 hover:text-amber-100 transition-colors">
          Sair
        </button>
      </form>
    </div>
  );
}

function CommandPalette({
  onClose,
  onGo,
}: {
  onClose: () => void;
  onGo: (href: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const resultados = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return NAV_FLAT;
    return NAV_FLAT.filter(
      (i) => norm(i.label).includes(q) || norm(i.secao).includes(q)
    );
  }, [query]);

  useEffect(() => {
    setIdx(0);
  }, [query]);

  // Agrupa os resultados por seção, preservando a ordem original.
  const grupos = useMemo(() => {
    const map = new Map<string, typeof resultados>();
    for (const r of resultados) {
      if (!map.has(r.secao)) map.set(r.secao, []);
      map.get(r.secao)!.push(r);
    }
    return Array.from(map.entries());
  }, [resultados]);

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, resultados.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const alvo = resultados[idx];
      if (alvo) onGo(alvo.href);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden border border-amber-900/10">
        <div className="flex items-center gap-2 border-b border-neutral-200 px-4">
          <SearchIcon className="text-neutral-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ir para... (digite um módulo)"
            className="flex-1 py-3.5 text-sm outline-none bg-transparent"
          />
          <kbd className="text-[10px] rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-neutral-500">
            esc
          </kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto py-2">
          {resultados.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-neutral-400">
              Nada encontrado para “{query}”.
            </p>
          )}
          {grupos.map(([secao, itens]) => (
            <div key={secao} className="mb-1">
              <p className="px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                {secao}
              </p>
              {itens.map((item) => {
                const flatIndex = resultados.indexOf(item);
                const ativo = flatIndex === idx;
                return (
                  <button
                    key={item.href}
                    onMouseEnter={() => setIdx(flatIndex)}
                    onClick={() => onGo(item.href)}
                    className={`w-full text-left flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                      ativo ? "bg-amber-100 text-amber-900" : "text-neutral-700"
                    }`}
                  >
                    <span className={ativo ? "text-amber-500" : "text-neutral-300"}>
                      ›
                    </span>
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={`transition-transform ${open ? "rotate-90" : ""}`}
    >
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4-4" strokeLinecap="round" />
    </svg>
  );
}
