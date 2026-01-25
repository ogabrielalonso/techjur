import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { DiagnosticAnswers, ScoreResult } from '@/types/diagnostico';

const anthropic = new Anthropic();

interface EnrichRequest {
  answers: DiagnosticAnswers;
  score: ScoreResult;
  companyName: string;
  strengths: string[];
  gaps: string[];
}

const SYSTEM_PROMPT = `Você é um consultor especializado em maturidade tecnológica para escritórios de advocacia.

Seu papel é enriquecer a devolutiva do diagnóstico com insights personalizados e contextualizados.

REGRAS:
- Nunca use emojis
- Seja direto e objetivo
- Fale como uma consultoria experiente, clara e respeitosa
- Foque em clareza, execução possível, controle, previsibilidade e alívio operacional
- Sem vendas, sem exageros, sem promessas mágicas
- Personalize a análise para o nome do escritório quando fornecido

Forneça:
1. Uma análise breve (2-3 parágrafos) do cenário geral identificado
2. Uma recomendação prioritária específica para o contexto
3. Um insight sobre o potencial de evolução do escritório`;

export async function POST(request: NextRequest) {
  try {
    const body: EnrichRequest = await request.json();
    const { answers, score, companyName, strengths, gaps } = body;

    // Build context for Claude
    const context = `
Escritório: ${companyName}
Score de Maturidade: ${score.score}/5 (${score.level})
Pontos totais: ${score.totalPoints}/16

Respostas:
- Operação e Base Organizacional: ${answers.q1}
- Dados e Decisão: ${answers.q2}
- Automação: ${answers.q3}
- Visão e Cultura: ${answers.q4}

Pontos Fortes Identificados:
${strengths.map((s) => `- ${s}`).join('\n')}

Gargalos Identificados:
${gaps.map((g) => `- ${g}`).join('\n')}
`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Analise o diagnóstico de maturidade tecnológica abaixo e forneça uma análise enriquecida:\n\n${context}`,
        },
      ],
    });

    // Extract text from response
    const textBlock = message.content.find((block) => block.type === 'text');
    const enrichedContent = textBlock ? textBlock.text : '';

    return NextResponse.json({
      success: true,
      enrichedContent,
    });
  } catch (error) {
    console.error('Error enriching diagnostic:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao enriquecer diagnóstico',
        enrichedContent: '', // Return empty string so the app still works
      },
      { status: 200 } // Return 200 so the main flow continues
    );
  }
}
