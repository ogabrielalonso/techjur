import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { DiagnosticRecord } from '@/types/diagnostico';
import { DiagnosticPDF } from '@/components/pdf/DiagnosticPDF';
import React from 'react';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ success: false, error: 'ID não fornecido' }, { status: 400 });
  }

  // Get record from the diagnostico API
  let record: DiagnosticRecord | null = null;
  try {
    const baseUrl = request.nextUrl.origin;
    const response = await fetch(`${baseUrl}/api/diagnostico?id=${id}`);
    const data = await response.json();
    if (data.success) {
      record = data.record;
    }
  } catch (error) {
    console.error('Error fetching record:', error);
  }

  if (!record) {
    return NextResponse.json({ success: false, error: 'Diagnóstico não encontrado' }, { status: 404 });
  }

  try {
    const pdfElement = React.createElement(DiagnosticPDF, { record });
    // @ts-expect-error - renderToBuffer types don't match React 19
    const pdfBuffer = await renderToBuffer(pdfElement);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="diagnostico-${id}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao gerar PDF' },
      { status: 500 }
    );
  }
}
