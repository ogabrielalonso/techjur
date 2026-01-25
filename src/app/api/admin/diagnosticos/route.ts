import { NextRequest, NextResponse } from 'next/server';
import { listDiagnosticsFromNotion, getDiagnosticFromNotion } from '@/lib/notion';
import { calculateScore } from '@/lib/scoring';
import { generateActionPlans, identifyStrengths, identifyGaps } from '@/lib/templates';
import { DiagnosticAnswers, DiagnosticRecord, Answer } from '@/types/diagnostico';
import { validateSession } from '@/lib/session';

// Helper to get client IP
function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
         request.headers.get('x-real-ip') ||
         'unknown';
}

// Helper to check authentication
function checkAuth(request: NextRequest): { valid: boolean; error?: string } {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { valid: false, error: 'Token de autenticação não fornecido' };
  }

  const token = authHeader.substring(7);
  const clientIP = getClientIP(request);

  if (!validateSession(token, clientIP)) {
    return { valid: false, error: 'Sessão inválida ou expirada' };
  }

  return { valid: true };
}

// Convert Notion list item to full DiagnosticRecord
function convertToFullRecord(item: {
  id: string;
  clientName: string;
  clientEmail: string;
  companyName: string;
  score: number;
  level: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  createdAt: string;
}): DiagnosticRecord {
  const answers: DiagnosticAnswers = {
    q1: item.q1 as Answer,
    q2: item.q2 as Answer,
    q3: item.q3 as Answer,
    q4: item.q4 as Answer,
  };

  const score = calculateScore(answers);
  const actionPlans = generateActionPlans(answers);
  const strengths = identifyStrengths(answers);
  const gaps = identifyGaps(answers, score);

  return {
    id: item.id,
    clientName: item.clientName,
    clientEmail: item.clientEmail,
    companyName: item.companyName,
    answers,
    devolutiva: {
      score,
      answers,
      strengths,
      gaps,
      actionPlans: {
        q1: actionPlans.q1 || undefined,
        q2: actionPlans.q2 || undefined,
        q3: actionPlans.q3 || undefined,
        q4: actionPlans.q4 || undefined,
      },
    },
    createdAt: item.createdAt,
  };
}

export async function GET(request: NextRequest) {
  // Check authentication
  const auth = checkAuth(request);
  if (!auth.valid) {
    return NextResponse.json(
      { success: false, error: auth.error },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      // Get single record
      const item = await getDiagnosticFromNotion(id);
      if (!item) {
        return NextResponse.json(
          { success: false, error: 'Diagnóstico não encontrado' },
          { status: 404 }
        );
      }
      const record = convertToFullRecord(item);
      return NextResponse.json({ success: true, record });
    }

    // List all records
    const items = await listDiagnosticsFromNotion();
    const records = items.map(convertToFullRecord);

    return NextResponse.json({ success: true, records });
  } catch (error) {
    console.error('Error fetching diagnostics from Notion:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar diagnósticos' },
      { status: 500 }
    );
  }
}
