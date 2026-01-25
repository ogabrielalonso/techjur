'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Answer } from '@/types/diagnostico';

interface QuestionCardProps {
  questionNumber: number;
  questionText: string;
  options: { value: Answer; label: string }[];
  selectedAnswer?: Answer;
  onSelect: (answer: Answer) => void;
}

export function QuestionCard({
  questionNumber,
  questionText,
  options,
  selectedAnswer,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="card-futuristic w-full overflow-hidden">
      {/* Header with neon accent */}
      <div className="relative px-4 sm:px-5 pt-4 sm:pt-5 pb-3">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg glass flex items-center justify-center">
            <span className="text-neon-cyan font-bold text-sm">{questionNumber}</span>
          </div>
          <span className="text-xs text-muted-foreground">de 4</span>
        </div>
        <p className="text-base sm:text-lg font-semibold text-foreground leading-snug">{questionText}</p>
      </div>

      {/* Options */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5">
        <RadioGroup
          value={selectedAnswer}
          onValueChange={(value) => onSelect(value as Answer)}
          className="space-y-2"
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`relative flex items-start space-x-3 p-3 rounded-lg border transition-all cursor-pointer group ${
                selectedAnswer === option.value
                  ? 'glass border-neon-cyan/50 glow-cyan'
                  : 'glass-subtle border-transparent hover:border-neon-cyan/20'
              }`}
              onClick={() => onSelect(option.value)}
            >
              {/* Neon indicator on selection */}
              {selectedAnswer === option.value && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-neon-cyan rounded-r-full" />
              )}

              <RadioGroupItem
                value={option.value}
                id={option.value}
                className={`mt-0.5 min-w-[1rem] min-h-[1rem] w-4 h-4 border-2 ${
                  selectedAnswer === option.value
                    ? 'border-neon-cyan text-neon-cyan'
                    : 'border-muted-foreground/30 group-hover:border-neon-cyan/50'
                }`}
              />
              <Label
                htmlFor={option.value}
                className="cursor-pointer flex-1 text-sm leading-snug"
              >
                <span className={`font-bold mr-1.5 transition-colors ${
                  selectedAnswer === option.value
                    ? 'text-neon-cyan'
                    : 'text-muted-foreground group-hover:text-neon-cyan/70'
                }`}>
                  {option.value}.
                </span>
                <span className="text-foreground">{option.label}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
