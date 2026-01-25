// Shared session storage for admin authentication
// Note: In production, use Redis or database for session storage

interface SessionData {
  createdAt: number;
  ip: string;
}

// Use global to persist across hot reloads in development
const globalForSession = globalThis as unknown as {
  validSessions: Map<string, SessionData> | undefined;
};

export const validSessions = globalForSession.validSessions ?? new Map<string, SessionData>();

if (process.env.NODE_ENV !== 'production') {
  globalForSession.validSessions = validSessions;
}

export const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function validateSession(token: string | null, _ip: string): boolean {
  if (!token) return false;

  const session = validSessions.get(token);
  if (!session) return false;

  const now = Date.now();
  if (now - session.createdAt > SESSION_DURATION) {
    validSessions.delete(token);
    return false;
  }

  return true;
}

export function createSession(token: string, ip: string): void {
  validSessions.set(token, { createdAt: Date.now(), ip });
}
