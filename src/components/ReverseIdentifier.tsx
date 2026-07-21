"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  pitchClassAt,
  noteNameFromPitchClass,
  frequencyAt,
} from "@/lib/music";
import { identifyChords, identifyScales } from "@/lib/identify";
import { playTone } from "@/lib/audio";

const FRET_MARKERS = new Set([3, 5, 7, 9, 12, 15]);
const FRETS = Array.from({ length: 16 }, (_, i) => i);
const STRING_LABELS = ["6ª", "5ª", "4ª", "3ª", "2ª", "1ª"];

// Rota de estudo para cada tipo de escala reconhecida.
const SCALE_LINK: Record<string, string> = {
  pentatonicaMenor: "/pentatonica-menor",
  pentatonicaMaior: "/pentatonica-maior",
  blues: "/escala-blues",
  escalaMaior: "/escala-maior",
  menorNatural: "/escalas-menores",
  menorHarmonica: "/escalas-menores",
  menorMelodica: "/escalas-menores",
  dorico: "/modos-gregos",
  frigio: "/modos-gregos",
  lidio: "/modos-gregos",
  mixolidio: "/modos-gregos",
  locrio: "/modos-gregos",
};

function keyOf(s: number, f: number) {
  return `${s}:${f}`;
}

export default function ReverseIdentifier() {
  // Casas marcadas, cada uma como "corda:casa".
  const [marked, setMarked] = useState<Set<string>>(new Set());

  function toggle(s: number, f: number) {
    playTone(frequencyAt(s, f));
    setMarked((prev) => {
      const next = new Set(prev);
      const k = keyOf(s, f);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  }

  // Classes de altura marcadas e as notas (para exibir).
  const { pcs, noteLabels } = useMemo(() => {
    const list: { s: number; f: number; pc: number }[] = [];
    marked.forEach((k) => {
      const [s, f] = k.split(":").map(Number);
      list.push({ s, f, pc: pitchClassAt(s, f) });
    });
    const uniquePcs = Array.from(new Set(list.map((x) => x.pc))).sort(
      (a, b) => a - b
    );
    return {
      pcs: uniquePcs,
      noteLabels: uniquePcs.map(noteNameFromPitchClass),
    };
  }, [marked]);

  const chords = useMemo(() => identifyChords(pcs), [pcs]);
  const scales = useMemo(() => identifyScales(pcs), [pcs]);

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm text-neutral-600">
          Clique nas casas para marcar notas. O Trastes identifica o acorde e as
          escalas que cabem.
        </p>
        <button
          onClick={() => setMarked(new Set())}
          className="text-sm rounded-md border border-amber-800/25 px-3 py-1 hover:bg-amber-50"
        >
          Limpar
        </button>
      </div>

      {/* notas marcadas */}
      <div className="mt-3 flex flex-wrap items-center gap-2 min-h-[32px]">
        <span className="text-xs text-neutral-500">Notas:</span>
        {noteLabels.length === 0 ? (
          <span className="text-sm text-neutral-400">nenhuma ainda</span>
        ) : (
          noteLabels.map((n) => (
            <span
              key={n}
              className="rounded-full bg-amber-100 text-amber-900 text-sm font-semibold px-2.5 py-0.5"
            >
              {n}
            </span>
          ))
        )}
      </div>

      {/* braço */}
      <div className="overflow-x-auto rounded-lg border border-amber-800/30 bg-[#3b2a1a] p-3 mt-4">
        <div className="flex ml-8">
          {FRETS.map((f) => (
            <div
              key={f}
              className="shrink-0 w-11 text-center text-[11px] text-amber-100/70"
            >
              {f}
              {f === 12 ? " ●●" : FRET_MARKERS.has(f) ? " ●" : ""}
            </div>
          ))}
        </div>

        {[0, 1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center">
            <div className="w-8 shrink-0 text-[11px] text-amber-100/80 pr-2 text-right">
              {STRING_LABELS[s]}
            </div>
            {FRETS.map((f) => {
              const isMarked = marked.has(keyOf(s, f));
              const noteName = noteNameFromPitchClass(pitchClassAt(s, f));
              return (
                <button
                  key={f}
                  onClick={() => toggle(s, f)}
                  title={`${noteName} · ${STRING_LABELS[s]} corda, casa ${f}`}
                  className={`shrink-0 relative border-r border-amber-100/20 flex items-center justify-center w-11 h-10
                    ${f === 0 ? "border-r-2 border-r-amber-100/60" : ""}`}
                >
                  <span className="absolute inset-x-0 top-1/2 h-[2px] bg-amber-100/40 -translate-y-1/2" />
                  {isMarked && (
                    <span className="z-10 flex items-center justify-center rounded-full text-[11px] font-semibold w-7 h-7 bg-rose-500 text-white ring-2 ring-yellow-300">
                      {noteName}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {pcs.length < 2 ? (
        <p className="mt-6 text-neutral-500">
          Marque pelo menos duas notas para ver a análise.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {/* acordes */}
          <div className="rounded-lg border border-amber-800/20 p-5">
            <p className="font-semibold text-amber-900 mb-2">Que acorde é este?</p>
            {chords.length === 0 ? (
              <p className="text-sm text-neutral-600">
                Essas notas não formam um acorde do dicionário. Pode ser um trecho de
                escala, um acorde com nota omitida, ou uma combinação mais exótica.
              </p>
            ) : (
              <ul className="space-y-2 text-sm">
                {chords.slice(0, 5).map((c, i) => (
                  <li
                    key={c.symbol + i}
                    className="flex items-baseline justify-between gap-2"
                  >
                    <span>
                      <strong className="text-amber-800 text-base">{c.symbol}</strong>{" "}
                      <span className="text-neutral-500">
                        {c.typeLabel.toLowerCase()}
                      </span>
                      {c.exact ? (
                        <span className="ml-1 text-emerald-700 text-xs">exato</span>
                      ) : (
                        <span className="ml-1 text-neutral-400 text-xs">
                          + {c.extraInMarked} nota(s) fora
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-neutral-500 shrink-0">
                      {c.notes.join(" ")}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-xs text-neutral-500">
              A identificação é por nome de nota (classe de altura), então inversões e
              acordes com a mesma tônica em oitavas diferentes contam igual.{" "}
              <Link href="/dicionario-acordes" className="text-amber-700 underline">
                ver formas no dicionário
              </Link>
            </p>
          </div>

          {/* escalas */}
          <div className="rounded-lg border border-amber-800/20 p-5">
            <p className="font-semibold text-amber-900 mb-2">
              Em que escalas essas notas cabem?
            </p>
            {scales.length === 0 ? (
              <p className="text-sm text-neutral-600">
                Nenhuma escala conhecida contém todas essas notas juntas. Tente tirar a
                nota mais &ldquo;de fora&rdquo; e veja o que aparece.
              </p>
            ) : (
              <ul className="space-y-1.5 text-sm">
                {scales.slice(0, 6).map((sc, i) => (
                  <li key={sc.fullLabel + i} className="flex items-baseline gap-2">
                    <span className="text-amber-800">🎯</span>
                    <span>
                      <strong>{sc.fullLabel}</strong>{" "}
                      {sc.extraInScale === 0 ? (
                        <span className="text-emerald-700 text-xs">
                          (encaixa exato)
                        </span>
                      ) : (
                        <span className="text-neutral-400 text-xs">
                          (+{sc.extraInScale} notas na escala)
                        </span>
                      )}{" "}
                      {SCALE_LINK[sc.scaleKey] && (
                        <Link
                          href={SCALE_LINK[sc.scaleKey]}
                          className="text-amber-700 underline text-xs"
                        >
                          ver
                        </Link>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-xs text-neutral-500">
              As primeiras da lista são as mais &ldquo;justas&rdquo; (menos notas de
              sobra), ou seja, as que mais combinam com o que você marcou.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
