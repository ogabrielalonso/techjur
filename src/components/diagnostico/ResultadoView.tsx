'use client';

import { DiagnosticRecord, ActionPlan } from '@/types/diagnostico';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { getScoreColor, getLevelLabel } from '@/lib/scoring';
import { getScoreDescription } from '@/lib/templates';
import { Header } from '@/components/header';

interface ResultadoViewProps {
  record: DiagnosticRecord;
}

function ScoreDisplay({ score, level }: { score: number; level: string }) {
  const getScoreGlow = (score: number) => {
    if (score <= 2) return 'glow-error';
    if (score === 3) return 'glow-warning';
    return 'glow-success';
  };

  const getScoreGradient = (score: number) => {
    if (score <= 2) return 'from-red-500 to-orange-500';
    if (score === 3) return 'from-amber-400 to-yellow-500';
    return 'from-neon-green to-neon-cyan';
  };

  return (
    <div className="text-center py-4 sm:py-6">
      <div className={`relative inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full ${getScoreGlow(score)}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${getScoreGradient(score)} rounded-full opacity-20 blur-xl`} />
        <div className="relative w-full h-full rounded-full glass border-2 flex items-center justify-center"
             style={{ borderColor: score <= 2 ? 'var(--error)' : score === 3 ? 'var(--warning)' : 'var(--neon-cyan)' }}>
          <span className={`text-2xl sm:text-3xl font-bold ${getScoreColor(score)}`}>
            {score}/5
          </span>
        </div>
      </div>
      <h2 className="text-lg sm:text-xl font-bold text-foreground mt-4">{getLevelLabel(level as 'iniciante' | 'intermediário' | 'avançado')}</h2>
      <p className="text-muted-foreground mt-2 max-w-md mx-auto text-xs sm:text-sm px-4">
        {getScoreDescription({ score: score as 1 | 2 | 3 | 4 | 5, level: level as 'iniciante' | 'intermediário' | 'avançado', totalPoints: 0, hasTwoOrMoreA: false, cappedScore: false })}
      </p>
    </div>
  );
}

function StrengthsSection({ strengths }: { strengths: string[] }) {
  return (
    <div className="card-futuristic overflow-hidden">
      <div className="relative px-4 pt-4 pb-2">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent" />
        <h3 className="text-neon-green flex items-center gap-2 text-sm sm:text-base font-semibold">
          <div className="w-8 h-8 rounded-lg glass flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          Pontos Fortes
        </h3>
      </div>
      <div className="px-4 pb-4">
        <ul className="space-y-2">
          {strengths.map((strength, index) => (
            <li key={index} className="flex items-start gap-2 glass-subtle p-2 rounded-lg">
              <span className="neon-dot mt-1 flex-shrink-0" style={{ background: 'var(--neon-green)', boxShadow: '0 0 10px var(--neon-green)' }} />
              <span className="text-foreground text-xs sm:text-sm">{strength}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function GapsSection({ gaps }: { gaps: string[] }) {
  return (
    <div className="card-futuristic overflow-hidden">
      <div className="relative px-4 pt-4 pb-2">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-error to-transparent" />
        <h3 className="text-error flex items-center gap-2 text-sm sm:text-base font-semibold">
          <div className="w-8 h-8 rounded-lg glass flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          Gargalos Identificados
        </h3>
      </div>
      <div className="px-4 pb-4">
        <ul className="space-y-2">
          {gaps.map((gap, index) => (
            <li key={index} className="flex items-start gap-2 glass-subtle p-2 rounded-lg">
              <span className="neon-dot mt-1 flex-shrink-0" style={{ background: 'var(--error)', boxShadow: '0 0 10px var(--error)' }} />
              <span className="text-foreground text-xs sm:text-sm">{gap}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ActionPlanCard({ plan, title }: { plan: ActionPlan; title: string }) {
  return (
    <div className="card-futuristic overflow-hidden">
      {/* Header with gradient */}
      <div className="relative px-4 pt-4 pb-2 glass">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
        <h3 className="text-neon-cyan text-sm sm:text-base font-semibold">{title}</h3>
      </div>

      <div className="px-4 pb-4 pt-3 space-y-4">
        {/* Cenário Real */}
        <div>
          <h4 className="font-semibold text-muted-foreground mb-1.5 text-xs sm:text-sm">Cenário Real</h4>
          <p className="text-foreground glass-subtle p-3 rounded-lg italic text-xs sm:text-sm border-l-2 border-neon-purple/50">
            {plan.scenarioReal}
          </p>
        </div>

        {/* Best Practice */}
        <div>
          <h4 className="font-semibold text-muted-foreground mb-1.5 text-xs sm:text-sm">Como Grandes Escritórios Fazem</h4>
          <p className="text-foreground glass p-3 rounded-lg text-xs sm:text-sm border-l-2 border-neon-cyan/50">
            {plan.bestPractice}
          </p>
        </div>

        {/* Next Step - Highlighted */}
        <div className="relative overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20" />
          <div className="relative p-3 border border-neon-cyan/30 rounded-lg">
            <h4 className="font-semibold text-neon-cyan mb-1 text-xs sm:text-sm">Seu Próximo Passo</h4>
            <p className="text-foreground text-sm sm:text-base font-medium">{plan.nextStep}</p>
          </div>
        </div>

        {/* What to Do */}
        <div>
          <h4 className="font-semibold text-muted-foreground mb-1.5 text-xs sm:text-sm">O Que Fazer</h4>
          <p className="text-foreground text-xs sm:text-sm">{plan.whatToDo}</p>
        </div>

        {/* How to Do */}
        <div>
          <h4 className="font-semibold text-muted-foreground mb-2 text-xs sm:text-sm">Como Fazer</h4>
          <ol className="space-y-2">
            {plan.howToDo.map((step, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-md glass flex items-center justify-center text-xs font-semibold text-neon-cyan">
                  {index + 1}
                </span>
                <span className="text-muted-foreground text-xs sm:text-sm pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Practical Examples */}
        <div>
          <h4 className="font-semibold text-muted-foreground mb-1.5 text-xs sm:text-sm">Exemplos Práticos</h4>
          <ul className="space-y-1.5 glass-subtle p-3 rounded-lg">
            {plan.practicalExamples.map((example, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-neon-cyan mt-0.5 text-xs">•</span>
                <span className="text-foreground text-xs sm:text-sm">{example}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools */}
        <div>
          <h4 className="font-semibold text-muted-foreground mb-2 text-xs sm:text-sm">Ferramentas Sugeridas</h4>
          <div className="flex flex-wrap gap-1.5">
            {plan.suggestedTools.map((tool, index) => (
              <Badge key={index} variant="secondary" className="glass px-2 py-1 text-xs border border-neon-cyan/20 text-neon-cyan">
                {tool}
              </Badge>
            ))}
          </div>
        </div>

        {/* Expected Result */}
        <div className="relative overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 to-neon-cyan/10" />
          <div className="relative p-3 border border-neon-green/30 rounded-lg">
            <h4 className="font-semibold text-neon-green mb-1 text-xs sm:text-sm">Resultado Esperado</h4>
            <p className="text-foreground text-xs sm:text-sm">{plan.expectedResult}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResultadoView({ record }: ResultadoViewProps) {
  const { devolutiva, clientName, companyName } = record;
  const actionPlans = devolutiva.actionPlans;
  const hasActionPlans = Object.values(actionPlans).some((plan) => plan !== undefined);

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch(`/api/pdf?id=${record.id}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `diagnostico-${record.id}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert('Erro ao gerar PDF. Tente novamente.');
      }
    } catch {
      alert('Erro ao gerar PDF. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[150px]" />
      </div>
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-15" />

      {/* Header */}
      <Header showDashboard={false} showBackToHome={true} />

      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5 relative z-10 py-4 sm:py-6 px-4">
        {/* Header */}
        <div className="text-center">
          <div className="neon-line w-16 mx-auto mb-4" />
          <h1 className="text-lg sm:text-xl font-bold">
            <span className="gradient-neon-text">Diagnóstico de Maturidade</span>
            <br />
            <span className="text-foreground">Tecnológica</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-xs sm:text-sm">
            <span className="text-neon-cyan">{companyName}</span> | {clientName}
          </p>
        </div>

        {/* Score Display */}
        <div className="card-futuristic p-3 sm:p-4 glow-cyan">
          <ScoreDisplay score={devolutiva.score.score} level={devolutiva.score.level} />
        </div>

        {/* Strengths and Gaps */}
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <StrengthsSection strengths={devolutiva.strengths} />
          <GapsSection gaps={devolutiva.gaps} />
        </div>

        {/* Action Plans */}
        {hasActionPlans && (
          <>
            <Separator className="my-4 sm:my-5 bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-base sm:text-lg font-bold">
                  <span className="gradient-neon-text">Plano de Ação</span>
                </h2>
                <div className="neon-line w-12 mx-auto mt-2 mb-3" />
                <p className="text-muted-foreground max-w-lg mx-auto text-xs sm:text-sm px-4">
                  Baseado nas suas respostas, elaboramos um plano prático e executável
                  para evoluir a maturidade tecnológica do seu escritório.
                </p>
              </div>

              <div className="space-y-4">
                {actionPlans.q1 && (
                  <ActionPlanCard plan={actionPlans.q1} title="Operação e Base Organizacional" />
                )}
                {actionPlans.q2 && (
                  <ActionPlanCard plan={actionPlans.q2} title="Dados e Decisão" />
                )}
                {actionPlans.q3 && (
                  <ActionPlanCard plan={actionPlans.q3} title="Automação" />
                )}
                {actionPlans.q4 && (
                  <ActionPlanCard plan={actionPlans.q4} title="Visão e Cultura" />
                )}
              </div>
            </div>
          </>
        )}

        {/* Final Note */}
        <div className="card-futuristic p-4 text-center">
          <p className="text-muted-foreground mb-2 text-xs sm:text-sm">
            Sem vendas. Sem exageros. Sem promessas mágicas.
          </p>
          <p className="text-foreground font-semibold text-xs sm:text-sm">
            Foco em <span className="text-neon-cyan">clareza</span>, <span className="text-neon-purple">execução possível</span>, <span className="text-neon-green">controle</span>, previsibilidade e alívio operacional.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleDownloadPDF} className="btn-neon-solid flex items-center gap-2 rounded-lg py-2.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Baixar PDF
          </Button>
          <Button variant="outline" onClick={() => window.print()} className="btn-neon rounded-lg py-2.5">
            Imprimir
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground pt-2">
          Diagnóstico realizado em {new Date(record.createdAt).toLocaleDateString('pt-BR')}
        </p>
      </div>
    </div>
  );
}
