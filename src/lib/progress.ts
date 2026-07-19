import "server-only";
import { prisma } from "@/lib/prisma";
import { todasAsLicoes } from "@/content/curriculo";

export async function getProgressMap(userId: string) {
  const items = await prisma.progressItem.findMany({ where: { userId } });
  const map = new Map(items.map((i) => [i.lessonKey, i]));
  return map;
}

export async function getOverallProgress(userId: string) {
  const total = todasAsLicoes().length;
  const items = await prisma.progressItem.findMany({
    where: { userId, status: "concluido" },
  });
  const done = items.length;
  return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
}

export async function markLessonComplete(userId: string, lessonKey: string) {
  await prisma.progressItem.upsert({
    where: { userId_lessonKey: { userId, lessonKey } },
    update: { status: "concluido", completedAt: new Date() },
    create: { userId, lessonKey, status: "concluido", completedAt: new Date() },
  });
}
