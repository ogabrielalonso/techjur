import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { DiagnosticRecord } from '@/types/diagnostico';
import { getLevelLabel } from '@/lib/scoring';

// Lazy initialization to avoid build errors when API key is not set
let resend: Resend | null = null;

function getResend(): Resend {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 503 }
      );
    }
    const body = await request.json();
    const { record, pdfBuffer } = body as {
      record: DiagnosticRecord;
      pdfBuffer?: string; // Base64 encoded PDF
    };

    const { clientEmail, clientName, companyName, devolutiva, id } = record;
    const { score } = devolutiva;

    // Build email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Seu Diagnóstico de Maturidade Tecnológica</title>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 24px; color: #111827; margin-bottom: 8px;">
            Diagnóstico de Maturidade Tecnológica
          </h1>
          <p style="color: #6b7280; font-size: 14px;">
            ${companyName}
          </p>
        </div>

        <p style="margin-bottom: 16px;">
          Olá, ${clientName}!
        </p>

        <p style="margin-bottom: 16px;">
          Seu diagnóstico de maturidade tecnológica foi concluído com sucesso.
        </p>

        <div style="background: #f9fafb; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
          <p style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">Sua Pontuação</p>
          <p style="font-size: 48px; font-weight: 700; color: ${
            score.score <= 2 ? '#dc2626' : score.score === 3 ? '#ca8a04' : '#16a34a'
          }; margin: 0;">
            ${score.score}/5
          </p>
          <p style="font-size: 18px; font-weight: 600; margin-top: 8px;">
            ${getLevelLabel(score.level)}
          </p>
        </div>

        <p style="margin-bottom: 16px;">
          Para ver sua devolutiva completa com pontos fortes, gargalos e plano de ação detalhado, clique no botão abaixo:
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/resultado/${id}"
             style="display: inline-block; background: #2563eb; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Ver Resultado Completo
          </a>
        </div>

        <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center;">
          <p style="color: #6b7280; font-size: 12px; margin-bottom: 8px;">
            Sem vendas. Sem exageros. Sem promessas mágicas.
          </p>
          <p style="color: #1f2937; font-size: 12px; font-weight: 600;">
            Só controle, previsibilidade e alívio operacional.
          </p>
        </div>

        <div style="margin-top: 24px; text-align: center; color: #9ca3af; font-size: 11px;">
          <p>TechJur | Diagnóstico de Maturidade Tecnológica</p>
        </div>
      </body>
      </html>
    `;

    // Prepare attachments if PDF is provided
    const attachments = pdfBuffer
      ? [
          {
            filename: `diagnostico-${id}.pdf`,
            content: pdfBuffer,
          },
        ]
      : [];

    // Send email
    const { data, error } = await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'TechJur <onboarding@resend.dev>',
      to: clientEmail,
      subject: `Seu Diagnóstico de Maturidade Tecnológica - ${companyName}`,
      html: emailHtml,
      attachments,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, error: 'Erro ao enviar email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, emailId: data?.id });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao enviar email' },
      { status: 500 }
    );
  }
}
