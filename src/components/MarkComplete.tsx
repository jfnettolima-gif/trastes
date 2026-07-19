"use client";

import { useState, useTransition } from "react";
import { concluirLicao } from "@/app/actions/progress";

export default function MarkComplete({
  lessonKey,
  path,
  label = "Marcar como concluído",
}: {
  lessonKey: string;
  path: string;
  label?: string;
}) {
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <button
      disabled={pending || done}
      onClick={() =>
        startTransition(async () => {
          await concluirLicao(lessonKey, path);
          setDone(true);
        })
      }
      className="btn-primary disabled:opacity-60"
    >
      {done ? "Concluído ✓" : pending ? "Salvando..." : label}
    </button>
  );
}
