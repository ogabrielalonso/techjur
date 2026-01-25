'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';

interface HeaderProps {
  showDashboard?: boolean;
  showBackToHome?: boolean;
}

export function Header({ showDashboard = true, showBackToHome = false }: HeaderProps) {
  return (
    <header className="relative z-10 glass-subtle border-b border-neon-cyan/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl sm:text-2xl font-bold text-neon-cyan text-glow-cyan">
            TechJur
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {showDashboard && (
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="min-touch text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all">
                Dashboard
              </Button>
            </Link>
          )}
          {showBackToHome && (
            <Link href="/">
              <Button variant="ghost" size="sm" className="min-touch text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all">
                Voltar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
