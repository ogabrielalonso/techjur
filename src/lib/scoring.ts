import { Answer, DiagnosticAnswers, ScoreResult } from '@/types/diagnostico';

// Points per answer
const POINTS: Record<Answer, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
};

/**
 * Calculate the maturity score based on answers
 *
 * Logic:
 * - A = 1pt, B = 2pt, C = 3pt, D = 4pt
 * - Sum points (min 4, max 16)
 * - Convert to score 1-5
 * - Security rule: If 2+ answers are A, max score is 3
 */
export function calculateScore(answers: DiagnosticAnswers): ScoreResult {
  const points = [
    POINTS[answers.q1],
    POINTS[answers.q2],
    POINTS[answers.q3],
    POINTS[answers.q4],
  ];

  const totalPoints = points.reduce((sum, p) => sum + p, 0);

  // Count A answers
  const aCount = Object.values(answers).filter(a => a === 'A').length;
  const hasTwoOrMoreA = aCount >= 2;

  // Convert points to score
  let score: 1 | 2 | 3 | 4 | 5;
  let level: 'iniciante' | 'intermediário' | 'avançado';

  if (totalPoints <= 6) {
    score = 1;
    level = 'iniciante';
  } else if (totalPoints <= 9) {
    score = 2;
    level = 'iniciante';
  } else if (totalPoints <= 11) {
    score = 3;
    level = 'intermediário';
  } else if (totalPoints <= 14) {
    score = 4;
    level = 'avançado';
  } else {
    score = 5;
    level = 'avançado';
  }

  // Apply security rule: cap at 3 if 2+ A answers
  const cappedScore = hasTwoOrMoreA && score > 3;
  if (cappedScore) {
    score = 3;
    level = 'intermediário';
  }

  return {
    totalPoints,
    score,
    level,
    hasTwoOrMoreA,
    cappedScore,
  };
}

/**
 * Get score color for visual display (using semantic tokens)
 */
export function getScoreColor(score: number): string {
  if (score <= 2) return 'text-error';
  if (score === 3) return 'text-warning';
  return 'text-success';
}

/**
 * Get score background color (using semantic tokens)
 */
export function getScoreBgColor(score: number): string {
  if (score <= 2) return 'bg-error-muted';
  if (score === 3) return 'bg-warning-muted';
  return 'bg-success-muted';
}

/**
 * Get level label in Portuguese
 */
export function getLevelLabel(level: 'iniciante' | 'intermediário' | 'avançado'): string {
  const labels = {
    iniciante: 'Nível Iniciante',
    intermediário: 'Nível Intermediário',
    avançado: 'Nível Avançado',
  };
  return labels[level];
}
