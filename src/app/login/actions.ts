"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Informe a senha"),
});

export type LoginState = { error?: string };

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "E-mail ou senha inválidos." };
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });

  // Hash "chamariz": se o e-mail não existir, ainda gastamos o mesmo tempo de
  // um bcrypt.compare, para não revelar por tempo de resposta quais e-mails
  // têm conta (enumeração de usuários).
  const DUMMY_HASH = "$2b$10$pC/RX/UDjgtIqmX4WsHcm.EFSY5b.A.S3wj/l8AXYxOFVHfW/26ou";
  const hashParaComparar = user?.passwordHash ?? DUMMY_HASH;
  const ok = await bcrypt.compare(parsed.data.password, hashParaComparar);

  if (!user || !ok) {
    return { error: "E-mail ou senha inválidos." };
  }

  await createSession({
    id: user.id,
    name: user.name,
    email: user.email,
    level: user.level as "iniciante" | "intermediario" | "avancado",
  });

  redirect(user.onboardedAt ? "/dashboard" : "/onboarding");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
