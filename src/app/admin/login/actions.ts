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

  // This is the secure and correct way to access environment variables on the server in Next.js
  const isUsernameValid = username === process.env.ADMIN_USERNAME;
  const isPasswordValid = password === process.env.ADMIN_PASSWORD;

  if (!isUsernameValid || !isPasswordValid) {
    return { success: false, error: 'Ungültiger Benutzername oder falsches Passwort.' };
  }

  // Set session
  const session = await getSession();
  session.isLoggedIn = true;
  session.username = username;
  await session.save();

  return { success: true };
}
