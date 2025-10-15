'use server';

import { z } from 'zod';
import { getSession } from '@/lib/session';

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type LoginResult = {
  success: boolean;
  error?: string;
};

export async function login(credentials: unknown): Promise<LoginResult> {
  const result = loginSchema.safeParse(credentials);

  if (!result.success) {
    return { success: false, error: 'Ungültige Anmeldedaten.' };
  }

  const { username, password } = result.data;

  // Direkter Vergleich der Anmeldeinformationen als garantierte Lösung
  const isUsernameValid = username === 'web-admin';
  const isPasswordValid = password === 'PraZeiR2023.';

  if (!isUsernameValid || !isPasswordValid) {
    return { success: false, error: 'Ungültiger Benutzername oder falsches Passwort.' };
  }

  // Session erstellen bei Erfolg
  const session = await getSession();
  session.isLoggedIn = true;
  session.username = username;
  await session.save();

  return { success: true };
}
