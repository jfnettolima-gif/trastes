"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { ONBOARDING_QUESTIONS } from "@/content/onboarding";

export async function salvarOnboarding(formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/login");

  const answers: Record<string, string> = {};
  for (const q of ONBOARDING_QUESTIONS) {
    answers[q.key] = String(formData.get(q.key) ?? "");
  }

  const dailyMinutes = Number(formData.get("tempoDisponivel")) || 30;

  await prisma.user.update({
    where: { id: session.userId },
    data: {
      onboarding: answers,
      dailyMinutes,
      onboardedAt: new Date(),
    },
  });

  redirect("/dashboard");
}
