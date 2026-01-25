import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { calculateScore } from '@/lib/scoring';
import { generateActionPlans, identifyStrengths, identifyGaps } from '@/lib/templates';
import { DiagnosticAnswers, Devolutiva, DiagnosticRecord, Answer } from '@/types/diagnostico';
import { createDiagnosticInNotion, getDiagnosticFromNotion, listDiagnosticsFromNotion } from '@/lib/notion';

// In-memory storage (also saves to Notion)
const diagnosticRecords = new Map<string, DiagnosticRecord>();

// Use cryptographically secure UUID instead of predictable IDs
function generateId(): string {
  return `diag_${randomUUID()}`;
}

// Zod schemas for input validation
const AnswerSchema = z.enum(['A', 'B', 'C', 'D']);

const DiagnosticInputSchema = z.object({
  clientInfo: z.object({
    name: z.string()
      .min(2, 'Nome deve ter pelo menos 2 caracteres')
      .max(100, 'Nome deve ter no máximo 100 caracteres')
      .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Nome contém caracteres inválidos'),
    email: z.string()
      .email('Email inválido')
      .max(254, 'Email muito longo'),
    company: z.string()
      .min(2, 'Nome da empresa deve ter pelo menos 2 caracteres')
      .max(200, 'Nome da empresa deve ter no máximo 200 caracteres'),
  }),
  answers: z.object({
    q1: AnswerSchema,
    q2: AnswerSchema,
    q3: AnswerSchema,
    q4: AnswerSchema,
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input with Zod
    const validationResult = DiagnosticInputSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(e => e.message).join(', ');
      return NextResponse.json(
        { success: false, error: `Dados inválidos: ${errors}` },
        { status: 400 }
      );
    }

    const { clientInfo, answers } = validationResult.data;

    // Calculate score
    const score = calculateScore(answers);

    // Generate devolutiva
    const actionPlans = generateActionPlans(answers);
    const strengths = identifyStrengths(answers);
    const gaps = identifyGaps(answers, score);

    const devolutiva: Devolutiva = {
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
    };

    // Create record
    const id = generateId();
    const record: DiagnosticRecord = {
      id,
      clientName: clientInfo.name,
      clientEmail: clientInfo.email,
      companyName: clientInfo.company,
      answers,
      devolutiva,
      createdAt: new Date().toISOString(),
    };

    // Store record in memory
    diagnosticRecords.set(id, record);

    // Also save to Notion (async, don't wait)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const resultUrl = `${baseUrl}/resultado/${id}`;

    // Convert level to Portuguese for Notion (capitalize first letter)
    const levelPt = score.level.charAt(0).toUpperCase() + score.level.slice(1);

    createDiagnosticInNotion({
      name: clientInfo.name,
      email: clientInfo.email,
      company: clientInfo.company,
      score: score.score,
      level: levelPt,
      q1: answers.q1,
      q2: answers.q2,
      q3: answers.q3,
      q4: answers.q4,
      resultUrl,
    }).catch((error) => {
      console.error('Error saving to Notion:', error);
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error processing diagnostic:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao processar diagnóstico' },
      { status: 500 }
    );
  }
}

// Helper to convert Notion item to full DiagnosticRecord
function convertNotionToRecord(item: {
  id: string;
  clientName: string;
  clientEmail: string;
  companyName: string;
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
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    // Return all records - first from memory, then supplement with Notion
    const memoryRecords = Array.from(diagnosticRecords.values());
    const memoryIds = new Set(memoryRecords.map(r => r.id));

    // Get Notion records that aren't in memory
    const notionItems = await listDiagnosticsFromNotion();
    const notionRecords = notionItems
      .filter(item => !memoryIds.has(item.id))
      .map(convertNotionToRecord);

    const allRecords = [...memoryRecords, ...notionRecords].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ success: true, records: allRecords });
  }

  // First check memory
  let record = diagnosticRecords.get(id);

  // If not in memory, try Notion
  if (!record) {
    const notionItem = await getDiagnosticFromNotion(id);
    if (notionItem) {
      record = convertNotionToRecord(notionItem);
      // Cache in memory for future requests
      diagnosticRecords.set(id, record);
    }
  }

  if (!record) {
    return NextResponse.json(
      { success: false, error: 'Diagnóstico não encontrado' },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, record });
}
