"use client";

import { useMemo, useState } from "react";
import {
  ALL_NOTES,
  diatonicTriads,
  NoteName,
  pitchClass,
  ScaleKey,
} from "@/lib/music";
import { playTone } from "@/lib/audio";

const ESCALAS: { key: ScaleKey; label: string }[] = [
  { key: "escalaMaior", label: "Maior" },
  { key: "menorNatural", label: "Menor natural" },
];

// Progressões clássicas descritas por grau (0 = I ... 6 = vii). Assim elas
// funcionam em qualquer tom: os acordes saem do campo harmônico calculado.
const PROGRESSOES: { nome: string; graus: number[]; obs: string }[] = [
  { nome: "I - IV - V", graus: [0, 3, 4], obs: "A base do rock, blues e country." },
  { nome: "I - V - vi - IV", graus: [0, 4, 5, 3], obs: "A progressão pop mais famosa do mundo." },
  { nome: "vi - IV - I - V", graus: [5, 3, 0, 4], obs: "A mesma coisa, começando pela relativa menor." },
  { nome: "I - vi - IV - V", graus: [0, 5, 3, 4], obs: "O som dos anos 50 (doo-wop)." },
  { nome: "ii - V - I", graus: [1, 4, 0], obs: "A cadência mais importante do jazz." },
  { nome: "I - IV", graus: [0, 3], obs: "Simples e aberta, muito usada em folk." },
];

function noteFreq(note: NoteName): number {
  return 261.63 * Math.pow(2, pitchClass(note) / 12);
}

export default function ProgressionView({
  defaultRoot = "C",
  defaultScale = "escalaMaior",
}: {
  defaultRoot?: NoteName;
  defaultScale?: ScaleKey;
}) {
  const [rootNote, setRootNote] = useState<NoteName>(defaultRoot);
  const [scaleKey, setScaleKey] = useState<ScaleKey>(defaultScale);
  const [tocando, setTocando] = useState<string | null>(null);

  const triads = useMemo(
    () => diatonicTriads(rootNote, scaleKey),
    [rootNote, scaleKey]
  );

  function tocarAcorde(notes: NoteName[], delay: number) {
    notes.forEach((n, i) => {
      setTimeout(() => playTone(noteFreq(n), 0.9), delay + i * 70);
    });
  }

  function tocarProgressao(nome: string, graus: number[]) {
    setTocando(nome);
    const passo = 850;
    graus.forEach((g, i) => {
      const tri = triads[g];
      if (tri) tocarAcorde(tri.notes, i * passo);
    });
    setTimeout(() => setTocando(null), graus.length * passo);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 text-sm mb-5">
        <label className="flex items-center gap-2">
          Tom
          <select
            value={rootNote}
            onChange={(e) => setRootNote(e.target.value as NoteName)}
            className="border rounded px-2 py-1"
          >
            {ALL_NOTES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          Escala
          <select
            value={scaleKey}
            onChange={(e) => setScaleKey(e.target.value as ScaleKey)}
            className="border rounded px-2 py-1"
          >
            {ESCALAS.map((e) => (
              <option key={e.key} value={e.key}>
                {e.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="space-y-3">
        {PROGRESSOES.map((p) => {
          const acordes = p.graus.map((g) => triads[g]).filter(Boolean);
          const ativo = tocando === p.nome;
          return (
            <div
              key={p.nome}
              className={`border rounded-lg p-4 ${ativo ? "border-amber-500 bg-amber-50" : "border-amber-800/25"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-amber-800">{p.nome}</p>
                  <p className="text-sm text-neutral-600">
                    {acordes.map((a) => a.symbol).join(" → ")}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">{p.obs}</p>
                </div>
                <button
                  onClick={() => tocarProgressao(p.nome, p.graus)}
                  className="btn-primary shrink-0"
                  disabled={ativo}
                >
                  {ativo ? "Tocando..." : "▶ Tocar"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-neutral-500 mt-4">
        Os acordes de cada progressão saem do campo harmônico do tom escolhido, por
        isso mudam de nome quando você troca o tom, mas a relação (I, IV, V...) é
        sempre a mesma.
      </p>
    </div>
  );
}
