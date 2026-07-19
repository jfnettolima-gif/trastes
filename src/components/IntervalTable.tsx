"use client";

import { INTERVAL_LABELS } from "@/lib/music";
import { playTone } from "@/lib/audio";

const ROOT_FREQ = 220; // Lá3, só uma referência confortável de ouvir

export default function IntervalTable() {
  function tocar(semitons: number) {
    playTone(ROOT_FREQ, 0.5);
    setTimeout(() => {
      playTone(ROOT_FREQ * Math.pow(2, semitons / 12), 0.7);
    }, 550);
  }

  const linhas = Object.entries(INTERVAL_LABELS).map(([semitons, info]) => ({
    semitons: Number(semitons),
    ...info,
  }));

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-neutral-500 border-b">
            <th className="py-2 pr-4">Semitons</th>
            <th className="py-2 pr-4">Sigla</th>
            <th className="py-2 pr-4">Nome</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {linhas.map((l) => (
            <tr
              key={l.semitons}
              onClick={() => tocar(l.semitons)}
              className="border-b last:border-0 hover:bg-amber-50 cursor-pointer"
            >
              <td className="py-2 pr-4 text-neutral-500">{l.semitons}</td>
              <td className="py-2 pr-4 font-semibold text-amber-800">{l.short}</td>
              <td className="py-2 pr-4">{l.name}</td>
              <td className="py-2 text-amber-700">▶ ouvir</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
