"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const schema = z.object({
  name: z.string().min(2, "Digite o nome"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
  level: z.enum(["iniciante", "intermediario", "avancado"]),
  isAdmin: z.boolean().optional(),
});

export type CriarUsuarioState = { error?: string; ok?: string };

export async function criarUsuario(
  _prev: CriarUsuarioState,
  formData: FormData
): Promise<CriarUsuarioState> {
  // Só admin pode chegar aqui; requireAdmin redireciona quem não for.
  await requireAdmin();

  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: formData.get("password"),
    level: formData.get("level"),
    isAdmin: formData.get("isAdmin") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  }

  const { name, email, password, level, isAdmin } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Já existe uma conta com esse e-mail" };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      level,
      isAdmin: Boolean(isAdmin),
      // já cria com onboarding concluído para o acesso ser direto
      onboardedAt: new Date(),
    },
  });

  revalidatePath("/admin/usuarios");
  return { ok: `Conta criada para ${email}.` };
}

export async function excluirUsuario(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id || id === admin.id) return; // nunca exclui a própria conta
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/usuarios");
}
