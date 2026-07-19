"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { markLessonComplete } from "@/lib/progress";
import { prisma } from "@/lib/prisma";

export async function concluirLicao(lessonKey: string, path: string) {
  const session = await getSession();
  if (!session) return;
  await markLessonComplete(session.userId, lessonKey);
  await prisma.studySession.create({
    data: { userId: session.userId, durationMin: 5, focus: lessonKey.split(".")[0] },
  });
  revalidatePath(path);
  revalidatePath("/dashboard");
}
