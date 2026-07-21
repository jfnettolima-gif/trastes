import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
// Fail-closed: sem segredo, o app não sobe. Evita cair no caso perigoso em
// que a chave viraria a string "undefined" (sessões trivialmente forjáveis).
if (!secretKey || secretKey.length < 32) {
  throw new Error(
    "SESSION_SECRET ausente ou fraco (mínimo 32 caracteres). Defina um segredo forte."
  );
}
const encodedKey = new TextEncoder().encode(secretKey);

export type Level = "iniciante" | "intermediario" | "avancado";

export type SessionPayload = {
  userId: string;
  name: string;
  email: string;
  level: Level;
  expiresAt: number;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function createSession(user: {
  id: string;
  name: string;
  email: string;
  level: Level;
}) {
  const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
  const session = await encrypt({
    userId: user.id,
    name: user.name,
    email: user.email,
    level: user.level,
    expiresAt,
  });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(expiresAt),
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getSession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  if (!cookie) return null;
  return decrypt(cookie);
}
