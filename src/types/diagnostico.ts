// Types for the Diagnostic System

export type Answer = 'A' | 'B' | 'C' | 'D';

export interface Question {
  id: number;
  text: string;
  options: {
    value: Answer;
    label: string;
  }[];
}

export interface DiagnosticAnswers {
  q1: Answer;
  q2: Answer;
  q3: Answer;
  q4: Answer;
}

export interface ScoreResult {
  totalPoints: number;
  score: 1 | 2 | 3 | 4 | 5;
  level: 'iniciante' | 'intermediário' | 'avançado';
  hasTwoOrMoreA: boolean;
  cappedScore: boolean;
}

export interface ActionPlan {
  scenarioReal: string;
  bestPractice: string;
  nextStep: string;
  whatToDo: string;
  howToDo: string[];
  practicalExamples: string[];
  suggestedTools: string[];
  expectedResult: string;
}

export interface Devolutiva {
  score: ScoreResult;
  answers: DiagnosticAnswers;
  strengths: string[];
  gaps: string[];
  actionPlans: {
    q1?: ActionPlan;
    q2?: ActionPlan;
    q3?: ActionPlan;
    q4?: ActionPlan;
  };
  enrichedContent?: string;
}

export interface DiagnosticRecord {
  id: string;
  clientName: string;
  clientEmail: string;
  companyName: string;
  answers: DiagnosticAnswers;
  devolutiva: Devolutiva;
  createdAt: string;
  pdfUrl?: string;
  emailSent?: boolean;
}
