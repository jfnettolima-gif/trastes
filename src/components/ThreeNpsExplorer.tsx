"use client";

import { useState } from "react";
import { NoteName, ScaleKey } from "@/lib/music";
import ThreeNpsView from "@/components/ThreeNpsView";

const POSICOES = [1, 2, 3, 4, 5, 6, 7];

export default function ThreeNpsExplorer({
  scaleKey,
  defaultRoot = "A",
  rootLabel = "menor",
}: {
  scaleKey: ScaleKey;
  defaultRoot?: NoteName;
  rootLabel?: string;
}) {
  const [posicao, setPosicao] = useState(1);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm text-neutral-600">Posição:</span>
        {POSICOES.map((n) => (
          <button
            key={n}
            onClick={() => setPosicao(n)}
            className={`w-9 h-9 rounded-full text-sm font-semibold border transition-colors ${
              posicao === n
                ? "bg-amber-800 text-white border-amber-800"
                : "border-amber-800/40 text-amber-800 hover:bg-amber-50"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <ThreeNpsView
        positionNumber={posicao}
        scaleKey={scaleKey}
        defaultRoot={defaultRoot}
        rootLabel={rootLabel}
      />
    </div>
  );
}
