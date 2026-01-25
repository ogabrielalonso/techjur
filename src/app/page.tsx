import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-magenta/5 rounded-full blur-[80px] animate-float" style={{ animationDelay: '-1.5s' }} />
      </div>

      {/* Cyber grid overlay */}
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-30" />

      {/* Header */}
      <Header />

      {/* Hero */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-fluid-12 lg:py-fluid-16">
        <div className="text-center mb-fluid-12 lg:mb-fluid-16">
          {/* Neon accent line */}
          <div className="neon-line w-24 mx-auto mb-8" />

          <h2 className="text-fluid-2xl lg:text-fluid-3xl font-bold mb-fluid-4">
            <span className="gradient-neon-text">Diagnóstico de Maturidade</span>
            <br />
            <span className="text-foreground">Tecnológica</span>
          </h2>

          <p className="text-fluid-base lg:text-fluid-lg text-muted-foreground max-w-2xl mx-auto mb-fluid-8">
            Avalie o nível de maturidade tecnológica do seu escritório de advocacia
            e receba um <span className="text-neon-cyan">plano de ação personalizado</span> e executável.
          </p>

          <Link href="/diagnostico">
            <Button size="lg" className="btn-neon-solid text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 min-touch rounded-xl">
              Iniciar Diagnóstico Gratuito
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-fluid-12 lg:mb-fluid-16">
          {/* Feature 1 */}
          <div className="card-futuristic p-6 sm:p-8 group">
            <div className="w-14 h-14 glass rounded-xl flex items-center justify-center mb-6 group-hover:glow-cyan transition-all">
              <svg className="w-7 h-7 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-3">
              4 Perguntas Objetivas
            </h3>
            <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
              Perguntas fechadas que representam situações reais do dia a dia do escritório.
              Responda com o cenário real para um diagnóstico preciso.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card-futuristic p-6 sm:p-8 group">
            <div className="w-14 h-14 glass rounded-xl flex items-center justify-center mb-6 group-hover:glow-purple transition-all">
              <svg className="w-7 h-7 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-3">
              Score de Maturidade
            </h3>
            <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
              Receba uma pontuação clara de 1 a 5, identificando seu nível atual
              e os pontos fortes e gargalos do escritório.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card-futuristic p-6 sm:p-8 sm:col-span-2 lg:col-span-1 group">
            <div className="w-14 h-14 glass rounded-xl flex items-center justify-center mb-6 group-hover:glow-magenta transition-all">
              <svg className="w-7 h-7 text-neon-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-3">
              Plano de Ação Prático
            </h3>
            <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
              Cada fragilidade identificada vem com um plano de ação detalhado:
              o que fazer, como fazer e ferramentas sugeridas.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="glass-strong rounded-2xl p-6 sm:p-8 lg:p-10 glow-cyan mb-fluid-12 lg:mb-fluid-16">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-2">
            <span className="gradient-neon-text">Como Funciona</span>
          </h3>
          <div className="neon-line w-16 mx-auto mb-8" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { step: 1, title: 'Preencha seus dados', desc: 'Nome, email e escritório' },
              { step: 2, title: 'Responda 4 perguntas', desc: 'Escolha A, B, C ou D' },
              { step: 3, title: 'Receba a devolutiva', desc: 'Score, pontos fortes e gargalos' },
              { step: 4, title: 'Execute o plano', desc: 'Ações práticas e ferramentas' },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-neon-cyan/20 rounded-full blur-lg group-hover:bg-neon-cyan/40 transition-all" />
                  <div className="relative w-full h-full bg-gradient-to-br from-neon-cyan to-neon-blue rounded-full flex items-center justify-center text-lg sm:text-xl font-bold text-background">
                    {item.step}
                  </div>
                </div>
                <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{item.title}</h4>
                <p className="text-muted-foreground text-xs sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-block glass-subtle rounded-2xl p-8 sm:p-10 hover-glow-cyan">
            <p className="text-muted-foreground mb-3 text-sm sm:text-base">
              Sem vendas. Sem exageros. Sem promessas mágicas.
            </p>
            <p className="text-foreground font-semibold mb-8 text-base sm:text-lg">
              Só <span className="text-neon-cyan">controle</span>, <span className="text-neon-purple">previsibilidade</span> e <span className="text-neon-green">alívio operacional</span>.
            </p>
            <Link href="/diagnostico">
              <Button size="lg" className="btn-neon-solid text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 min-touch rounded-xl">
                Começar Agora
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 glass-subtle border-t border-neon-cyan/10 mt-fluid-12 lg:mt-fluid-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
          <p className="text-muted-foreground text-sm sm:text-base">
            <span className="text-neon-cyan font-semibold">TechJur</span> | Diagnóstico de Maturidade Tecnológica para Escritórios de Advocacia
          </p>
        </div>
      </footer>
    </div>
  );
}
