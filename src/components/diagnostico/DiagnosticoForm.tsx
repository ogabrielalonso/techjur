'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QuestionCard } from './QuestionCard';
import { QUESTIONS } from '@/lib/templates';
import { Answer, DiagnosticAnswers } from '@/types/diagnostico';
import { Header } from '@/components/header';

type Step = 'intro' | 'info' | 'q1' | 'q2' | 'q3' | 'q4' | 'processing';

interface ClientInfo {
  name: string;
  email: string;
  company: string;
}

export function DiagnosticoForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('intro');
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: '',
    email: '',
    company: '',
  });
  const [answers, setAnswers] = useState<Partial<DiagnosticAnswers>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswer = (questionKey: keyof DiagnosticAnswers, answer: Answer) => {
    setAnswers((prev) => ({ ...prev, [questionKey]: answer }));
  };

  const handleNext = () => {
    const steps: Step[] = ['intro', 'info', 'q1', 'q2', 'q3', 'q4', 'processing'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: Step[] = ['intro', 'info', 'q1', 'q2', 'q3', 'q4', 'processing'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setStep('processing');

    try {
      const response = await fetch('/api/diagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientInfo,
          answers: answers as DiagnosticAnswers,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push(`/resultado/${data.id}`);
      } else {
        alert('Erro ao processar diagnóstico. Tente novamente.');
        setStep('q4');
      }
    } catch {
      alert('Erro ao processar diagnóstico. Tente novamente.');
      setStep('q4');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProgress = () => {
    const progressMap: Record<Step, number> = {
      intro: 0,
      info: 10,
      q1: 30,
      q2: 50,
      q3: 70,
      q4: 90,
      processing: 100,
    };
    return progressMap[step];
  };

  const canProceed = () => {
    switch (step) {
      case 'intro':
        return true;
      case 'info':
        return clientInfo.name && clientInfo.email && clientInfo.company;
      case 'q1':
        return !!answers.q1;
      case 'q2':
        return !!answers.q2;
      case 'q3':
        return !!answers.q3;
      case 'q4':
        return !!answers.q4;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px]" />
      </div>
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-20" />

      {/* Header */}
      <Header showDashboard={false} showBackToHome={true} />

      <div className="max-w-lg mx-auto relative z-10 py-4 sm:py-6 px-4">
        {step !== 'intro' && (
          <div className="mb-4 sm:mb-6">
            <div className="glass rounded-full p-1">
              <Progress value={getProgress()} className="h-1.5" />
            </div>
          </div>
        )}

        {/* Intro Screen */}
        {step === 'intro' && (
          <div className="card-futuristic p-5 sm:p-6 glow-cyan">
            <div className="text-center mb-4">
              <div className="neon-line w-16 mx-auto mb-4" />
              <h2 className="text-lg sm:text-xl font-bold">
                <span className="gradient-neon-text">Diagnóstico de Maturidade</span>
                <br />
                <span className="text-foreground">Tecnológica</span>
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed text-sm">
                Vou fazer algumas perguntas objetivas sobre o dia a dia do seu escritório para entender como a operação funciona hoje.
              </p>

              <div className="glass p-4 rounded-xl border border-neon-cyan/20">
                <p className="font-semibold text-neon-cyan mb-2 text-sm">
                  Você receberá:
                </p>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  {[
                    'Nível de maturidade tecnológica',
                    'Pontos fortes e gargalos',
                    'Plano de ação prático',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="neon-dot mr-2 mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-muted-foreground/70 italic text-xs">
                Não existe resposta certa ou errada. Responda com o cenário real.
              </p>

              <Button onClick={handleNext} className="w-full btn-neon-solid rounded-xl py-3">
                Iniciar Diagnóstico
              </Button>
            </div>
          </div>
        )}

        {/* Client Info Screen */}
        {step === 'info' && (
          <div className="card-futuristic p-5 sm:p-6">
            <div className="mb-4">
              <h2 className="text-base sm:text-lg font-bold text-foreground">Seus Dados</h2>
              <p className="text-muted-foreground text-xs mt-1">
                Para receber o relatório completo
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-muted-foreground text-sm">Nome completo</Label>
                <Input
                  id="name"
                  value={clientInfo.name}
                  onChange={(e) => setClientInfo((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Seu nome"
                  className="input-neon rounded-lg py-2"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-muted-foreground text-sm">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="seu@email.com"
                  className="input-neon rounded-lg py-2"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="company" className="text-muted-foreground text-sm">Nome do escritório</Label>
                <Input
                  id="company"
                  value={clientInfo.company}
                  onChange={(e) => setClientInfo((prev) => ({ ...prev, company: e.target.value }))}
                  placeholder="Nome do escritório"
                  className="input-neon rounded-lg py-2"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={handleBack} className="flex-1 btn-neon rounded-lg py-2.5">
                  Voltar
                </Button>
                <Button onClick={handleNext} disabled={!canProceed()} className="flex-1 btn-neon-solid rounded-lg py-2.5">
                  Continuar
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Question Screens */}
        {step === 'q1' && (
          <div className="space-y-4">
            <QuestionCard
              questionNumber={1}
              questionText={QUESTIONS[0].text}
              options={QUESTIONS[0].options}
              selectedAnswer={answers.q1}
              onSelect={(a) => handleAnswer('q1', a)}
            />
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1 btn-neon rounded-lg py-2.5">
                Voltar
              </Button>
              <Button onClick={handleNext} disabled={!canProceed()} className="flex-1 btn-neon-solid rounded-lg py-2.5">
                Continuar
              </Button>
            </div>
          </div>
        )}

        {step === 'q2' && (
          <div className="space-y-4">
            <QuestionCard
              questionNumber={2}
              questionText={QUESTIONS[1].text}
              options={QUESTIONS[1].options}
              selectedAnswer={answers.q2}
              onSelect={(a) => handleAnswer('q2', a)}
            />
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1 btn-neon rounded-lg py-2.5">
                Voltar
              </Button>
              <Button onClick={handleNext} disabled={!canProceed()} className="flex-1 btn-neon-solid rounded-lg py-2.5">
                Continuar
              </Button>
            </div>
          </div>
        )}

        {step === 'q3' && (
          <div className="space-y-4">
            <QuestionCard
              questionNumber={3}
              questionText={QUESTIONS[2].text}
              options={QUESTIONS[2].options}
              selectedAnswer={answers.q3}
              onSelect={(a) => handleAnswer('q3', a)}
            />
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1 btn-neon rounded-lg py-2.5">
                Voltar
              </Button>
              <Button onClick={handleNext} disabled={!canProceed()} className="flex-1 btn-neon-solid rounded-lg py-2.5">
                Continuar
              </Button>
            </div>
          </div>
        )}

        {step === 'q4' && (
          <div className="space-y-4">
            <QuestionCard
              questionNumber={4}
              questionText={QUESTIONS[3].text}
              options={QUESTIONS[3].options}
              selectedAnswer={answers.q4}
              onSelect={(a) => handleAnswer('q4', a)}
            />
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1 btn-neon rounded-lg py-2.5">
                Voltar
              </Button>
              <Button onClick={handleSubmit} disabled={!canProceed() || isSubmitting} className="flex-1 btn-neon-solid rounded-lg py-2.5">
                {isSubmitting ? 'Processando...' : 'Ver Resultado'}
              </Button>
            </div>
          </div>
        )}

        {/* Processing Screen */}
        {step === 'processing' && (
          <div className="card-futuristic p-6 sm:p-8 glow-cyan">
            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-6">
                <div className="absolute inset-0 bg-neon-cyan/20 rounded-full blur-xl animate-pulse" />
                <div className="relative w-full h-full border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
                <div className="absolute inset-2 border-2 border-neon-purple/20 border-b-neon-purple rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              </div>
              <p className="text-base sm:text-lg font-semibold text-foreground mb-1">
                <span className="gradient-neon-text">Analisando suas respostas...</span>
              </p>
              <p className="text-muted-foreground text-sm">
                Preparando sua devolutiva personalizada.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
