'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DiagnosticRecord } from '@/types/diagnostico';
import { getScoreColor, getLevelLabel } from '@/lib/scoring';
import { ThemeToggle } from '@/components/theme-toggle';

export default function AdminDashboard() {
  const [records, setRecords] = useState<DiagnosticRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('techjur_admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchRecords() {
      try {
        const token = sessionStorage.getItem('techjur_admin_token');
        const response = await fetch('/api/admin/diagnosticos', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.status === 401) {
          // Session expired or invalid
          sessionStorage.removeItem('techjur_admin_token');
          setIsAuthenticated(false);
          setError('Sessão expirada. Faça login novamente.');
          return;
        }

        if (data.success) {
          setRecords(data.records || []);
        }
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecords();
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success && data.sessionToken) {
        sessionStorage.setItem('techjur_admin_token', data.sessionToken);
        setIsAuthenticated(true);
      } else {
        setError(data.error || 'Senha incorreta');
      }
    } catch {
      setError('Erro ao verificar senha');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('techjur_admin_token');
    setIsAuthenticated(false);
    setPassword('');
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px]" />
        </div>
        <div className="fixed inset-0 cyber-grid pointer-events-none opacity-20" />

        <div className="card-futuristic w-full max-w-md p-8 glow-cyan relative z-10">
          <div className="text-center mb-8">
            <div className="neon-line w-16 mx-auto mb-6" />
            <h1 className="text-xl sm:text-2xl font-bold">
              <span className="gradient-neon-text">TechJur</span>
              <span className="text-foreground ml-2">Admin</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-2">Digite a senha para acessar o dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-muted-foreground">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                autoFocus
                className="input-neon min-touch rounded-xl"
              />
            </div>
            {error && (
              <p className="text-error text-sm">{error}</p>
            )}
            <Button type="submit" className="w-full btn-neon-solid min-touch rounded-xl">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const stats = {
    total: records.length,
    avgScore: records.length
      ? (records.reduce((sum, r) => sum + r.devolutiva.score.score, 0) / records.length).toFixed(1)
      : 0,
    iniciante: records.filter((r) => r.devolutiva.score.level === 'iniciante').length,
    intermediario: records.filter((r) => r.devolutiva.score.level === 'intermediário').length,
    avancado: records.filter((r) => r.devolutiva.score.level === 'avançado').length,
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px]" />
      </div>
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-15" />

      {/* Header */}
      <header className="relative z-10 glass-subtle border-b border-neon-cyan/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <h1 className="text-lg sm:text-xl font-bold text-neon-cyan text-glow-cyan">TechJur</h1>
            </Link>
            <Badge variant="secondary" className="glass border border-neon-purple/30 text-neon-purple">
              Dashboard
            </Badge>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <ThemeToggle />
            <Link href="/diagnostico" className="flex-1 sm:flex-none">
              <Button size="sm" className="w-full sm:w-auto btn-neon-solid min-touch rounded-xl">
                Novo Diagnóstico
              </Button>
            </Link>
            <Button size="sm" variant="outline" onClick={handleLogout} className="btn-neon min-touch rounded-xl">
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="card-futuristic p-4 hover-glow-cyan">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total</p>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="card-futuristic p-4 hover-glow-cyan">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Score Médio</p>
            <p className="text-2xl sm:text-3xl font-bold text-neon-cyan">{stats.avgScore}/5</p>
          </div>
          <div className="card-futuristic p-4">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Iniciante</p>
            <p className="text-2xl sm:text-3xl font-bold text-error">{stats.iniciante}</p>
          </div>
          <div className="card-futuristic p-4">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Intermediário</p>
            <p className="text-2xl sm:text-3xl font-bold text-warning">{stats.intermediario}</p>
          </div>
          <div className="card-futuristic p-4 col-span-2 sm:col-span-1">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Avançado</p>
            <p className="text-2xl sm:text-3xl font-bold text-neon-green">{stats.avancado}</p>
          </div>
        </div>

        {/* Records Table */}
        <div className="card-futuristic overflow-hidden">
          <div className="relative px-6 pt-6 pb-4">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Diagnósticos Realizados</h2>
          </div>

          <div className="px-6 pb-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="relative w-12 h-12 mx-auto mb-4">
                  <div className="absolute inset-0 bg-neon-cyan/20 rounded-full blur-lg animate-pulse" />
                  <div className="relative w-full h-full border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
                </div>
                <p className="text-muted-foreground">Carregando...</p>
              </div>
            ) : records.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Nenhum diagnóstico realizado ainda.</p>
                <Link href="/diagnostico">
                  <Button className="btn-neon-solid min-touch rounded-xl">Criar Primeiro Diagnóstico</Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-6 sm:mx-0">
                {/* Mobile Cards View */}
                <div className="sm:hidden space-y-4 px-6">
                  {records.map((record) => (
                    <div key={record.id} className="glass p-4 rounded-xl">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-foreground">{record.companyName}</p>
                          <p className="text-sm text-muted-foreground">{record.clientName}</p>
                          <p className="text-xs text-muted-foreground/70">{record.clientEmail}</p>
                        </div>
                        <Badge
                          className={`${
                            record.devolutiva.score.level === 'avançado'
                              ? 'bg-neon-green/20 text-neon-green border-neon-green/30'
                              : record.devolutiva.score.level === 'intermediário'
                              ? 'bg-warning/20 text-warning border-warning/30'
                              : 'bg-error/20 text-error border-error/30'
                          } border`}
                        >
                          {getLevelLabel(record.devolutiva.score.level)}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <span className={`text-lg font-bold ${getScoreColor(record.devolutiva.score.score)}`}>
                            {record.devolutiva.score.score}/5
                          </span>
                          <div className="flex gap-1">
                            {['q1', 'q2', 'q3', 'q4'].map((q) => (
                              <span key={q} className="inline-flex items-center justify-center w-6 h-6 rounded glass text-xs font-medium text-neon-cyan">
                                {record.answers[q as keyof typeof record.answers]}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Link href={`/resultado/${record.id}`}>
                          <Button variant="outline" size="sm" className="btn-neon min-touch rounded-lg">
                            Ver
                          </Button>
                        </Link>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(record.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <table className="hidden sm:table w-full">
                  <thead>
                    <tr className="border-b border-neon-cyan/10">
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm">Data</th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm">Escritório</th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm">Cliente</th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm">Score</th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm">Nível</th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm">Respostas</th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record) => (
                      <tr key={record.id} className="border-b border-neon-cyan/5 hover:bg-neon-cyan/5 transition-colors">
                        <td className="py-3 px-4 text-muted-foreground text-sm">
                          {new Date(record.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-3 px-4 font-medium text-foreground">{record.companyName}</td>
                        <td className="py-3 px-4 text-muted-foreground">
                          <div>{record.clientName}</div>
                          <div className="text-sm text-muted-foreground/70">{record.clientEmail}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-bold ${getScoreColor(record.devolutiva.score.score)}`}>
                            {record.devolutiva.score.score}/5
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={`${
                              record.devolutiva.score.level === 'avançado'
                                ? 'bg-neon-green/20 text-neon-green border-neon-green/30'
                                : record.devolutiva.score.level === 'intermediário'
                                ? 'bg-warning/20 text-warning border-warning/30'
                                : 'bg-error/20 text-error border-error/30'
                            } border`}
                          >
                            {getLevelLabel(record.devolutiva.score.level)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-1">
                            {['q1', 'q2', 'q3', 'q4'].map((q) => (
                              <span key={q} className="inline-flex items-center justify-center w-6 h-6 rounded glass text-xs font-medium text-neon-cyan">
                                {record.answers[q as keyof typeof record.answers]}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Link href={`/resultado/${record.id}`}>
                            <Button variant="outline" size="sm" className="btn-neon min-touch rounded-lg">
                              Ver
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
