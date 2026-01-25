'use client';

import { useTheme } from './theme-provider';
import { Button } from './ui/button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="min-touch w-10 h-10 p-0 rounded-xl glass hover:glow-cyan transition-all"
      aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {/* Sun icon (shown in dark mode) */}
      <svg
        className={`w-5 h-5 transition-all ${
          theme === 'dark'
            ? 'opacity-100 rotate-0 scale-100 text-neon-cyan'
            : 'opacity-0 rotate-90 scale-0 absolute'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>

      {/* Moon icon (shown in light mode) */}
      <svg
        className={`w-5 h-5 transition-all ${
          theme === 'light'
            ? 'opacity-100 rotate-0 scale-100 text-neon-purple'
            : 'opacity-0 -rotate-90 scale-0 absolute'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </Button>
  );
}
