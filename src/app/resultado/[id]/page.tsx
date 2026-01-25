'use client';

import { useEffect, useState, use } from 'react';
import { DiagnosticRecord } from '@/types/diagnostico';
import { ResultadoView } from '@/components/diagnostico/ResultadoView';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ResultadoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [record, setRecord] = useState<DiagnosticRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecord() {
      try {
        const response = await fetch(`/api/diagnostico?id=${id}`);
        const data = await response.json();

        if (data.success) {
          setRecord(data.record);
        } else {
          setError(data.error || 'Diagnóstico não encontrado');
        }
      } catch {
        setError('Erro ao carregar diagnóstico');
      } finally {
        setLoading(false);
      }
    }

    fetchRecord();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px]" />
        </div>
        <div className="fixed inset-0 cyber-grid pointer-events-none opacity-20" />

        <div className="card-futuristic w-full max-w-md p-12 glow-cyan relative z-10">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-8">
              <div className="absolute inset-0 bg-neon-cyan/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-full h-full border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
              <div className="absolute inset-2 border-2 border-neon-purple/20 border-b-neon-purple rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            </div>
            <p className="text-lg sm:text-xl font-semibold text-foreground">
              <span className="gradient-neon-text">Carregando resultado...</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-error/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px]" />
        </div>
        <div className="fixed inset-0 cyber-grid pointer-events-none opacity-20" />

        <div className="card-futuristic w-full max-w-md p-8 relative z-10">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full glass flex items-center justify-center">
              <svg className="w-8 h-8 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-lg sm:text-xl font-semibold text-foreground mb-2">
              {error || 'Diagnóstico não encontrado'}
            </p>
            <p className="text-muted-foreground mb-8 text-sm sm:text-base">
              O diagnóstico pode ter expirado ou o link está incorreto.
            </p>
            <Link href="/diagnostico">
              <Button className="btn-neon-solid min-touch rounded-xl">Fazer Novo Diagnóstico</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <ResultadoView record={record} />;
}
