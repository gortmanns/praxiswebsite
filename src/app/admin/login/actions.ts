'use server';

import { z } from 'zod';
import { getSession } from '@/lib/session';
import { compare } from 'bcrypt';
import 'dotenv/config';

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

  const storedUsername = process.env.ADMIN_USERNAME;
  const storedPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!storedUsername || !storedPasswordHash) {
    console.error('Admin credentials are not set in .env file');
    return { success: false, error: 'Server-Konfigurationsfehler.' };
  }
  
  if (username !== storedUsername) {
    return { success: false, error: 'Ungültiger Benutzername oder falsches Passwort.' };
  }

  const passwordMatch = await compare(password, storedPasswordHash);

  if (!passwordMatch) {
    return { success: false, error: 'Ungültiger Benutzername oder falsches Passwort.' };
  }

  // Set session
  const session = await getSession();
  session.isLoggedIn = true;
  session.username = username;
  await session.save();

  return { success: true };
}
