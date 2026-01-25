import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual, randomBytes } from 'crypto';
import { createSession, validateSession } from '@/lib/session';

// Re-export validateSession for use by other routes
export { validateSession };

// Simple in-memory rate limiting
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
         request.headers.get('x-real-ip') ||
         'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const attempts = loginAttempts.get(ip);

  if (!attempts) return false;

  // Reset if lockout time has passed
  if (now - attempts.lastAttempt > LOCKOUT_TIME) {
    loginAttempts.delete(ip);
    return false;
  }

  return attempts.count >= MAX_ATTEMPTS;
}

function recordAttempt(ip: string, success: boolean): void {
  const now = Date.now();

  if (success) {
    loginAttempts.delete(ip);
    return;
  }

  const attempts = loginAttempts.get(ip);
  if (attempts) {
    attempts.count++;
    attempts.lastAttempt = now;
  } else {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
  }
}

// Timing-safe password comparison
function secureCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);

    // Pad to same length to prevent length-based timing attacks
    const maxLength = Math.max(bufA.length, bufB.length);
    const paddedA = Buffer.alloc(maxLength);
    const paddedB = Buffer.alloc(maxLength);
    bufA.copy(paddedA);
    bufB.copy(paddedB);

    return bufA.length === bufB.length && timingSafeEqual(paddedA, paddedB);
  } catch {
    return false;
  }
}

// Generate session token
function generateSessionToken(): string {
  return randomBytes(32).toString('hex');
}

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);

  // Check rate limiting
  if (isRateLimited(clientIP)) {
    return NextResponse.json(
      { success: false, error: 'Muitas tentativas. Tente novamente em 15 minutos.' },
      { status: 429 }
    );
  }

  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Admin password not configured' },
        { status: 500 }
      );
    }

    if (typeof password !== 'string' || password.length === 0) {
      recordAttempt(clientIP, false);
      return NextResponse.json(
        { success: false, error: 'Senha inválida' },
        { status: 400 }
      );
    }

    if (secureCompare(password, adminPassword)) {
      recordAttempt(clientIP, true);

      // Generate session token and store in shared session storage
      const sessionToken = generateSessionToken();
      createSession(sessionToken, clientIP);

      return NextResponse.json({
        success: true,
        sessionToken
      });
    } else {
      recordAttempt(clientIP, false);

      // Add artificial delay to further prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 100));

      return NextResponse.json(
        { success: false, error: 'Senha incorreta' },
        { status: 401 }
      );
    }
  } catch {
    recordAttempt(clientIP, false);
    return NextResponse.json(
      { success: false, error: 'Erro ao verificar senha' },
      { status: 500 }
    );
  }
}
