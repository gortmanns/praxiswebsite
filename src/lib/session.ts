'use server';

import { getIronSession, IronSessionData } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  isLoggedIn: boolean;
  username?: string;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'pzir-admin-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  
  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
  }
  return session;
}
