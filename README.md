# TechJur

Plataforma de Diagnóstico de Maturidade Tecnológica para Escritórios de Advocacia.

## Funcionalidades

- **Diagnóstico em 4 perguntas objetivas** - Avalia operação, dados, automação e cultura
- **Score de maturidade (1-5)** - Classificação em iniciante, intermediário ou avançado
- **Devolutiva completa** - Pontos fortes, gargalos e plano de ação detalhado
- **Dashboard do consultor** - Visualização de todos os diagnósticos realizados
- **Geração de PDF** - Relatório profissional para download
- **Envio por email** - Resultado enviado automaticamente para o cliente
- **Enriquecimento por IA** - Claude API para personalizar análises

## Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js 16 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | Next.js API Routes |
| IA | Claude API (Anthropic) |
| PDF | Puppeteer |
| Email | Resend |

## Instalação

```bash
# Navegar para o diretório
cd techjur

# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env.local

# Configurar as variáveis (opcional - funciona sem elas para teste)
# ANTHROPIC_API_KEY - Para enriquecimento com IA
# RESEND_API_KEY - Para envio de emails
```

## Executar

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm run start
```

Acesse: http://localhost:3000

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial |
| `/diagnostico` | Formulário de diagnóstico |
| `/resultado/[id]` | Resultado do diagnóstico |
| `/admin` | Dashboard do consultor |

## APIs

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/diagnostico` | POST | Criar diagnóstico |
| `/api/diagnostico?id=X` | GET | Buscar diagnóstico |
| `/api/diagnostico` | GET | Listar todos |
| `/api/enrich` | POST | Enriquecer com IA |
| `/api/pdf?id=X` | GET | Gerar PDF |
| `/api/email` | POST | Enviar email |

## Estrutura

```
techjur/
├── src/
│   ├── app/
│   │   ├── admin/           # Dashboard consultor
│   │   ├── api/             # APIs
│   │   │   ├── diagnostico/ # CRUD diagnósticos
│   │   │   ├── email/       # Envio de emails
│   │   │   ├── enrich/      # Enriquecimento IA
│   │   │   └── pdf/         # Geração PDF
│   │   ├── diagnostico/     # Formulário
│   │   └── resultado/[id]/  # Resultado
│   ├── components/
│   │   ├── diagnostico/     # Componentes do diagnóstico
│   │   └── ui/              # shadcn/ui
│   ├── lib/
│   │   ├── scoring.ts       # Lógica de pontuação
│   │   ├── templates.ts     # Templates de devolutiva
│   │   └── utils.ts         # Utilitários
│   └── types/
│       └── diagnostico.ts   # Tipos TypeScript
├── .env.example
└── README.md
```

## Próximos Passos

1. **Notion** - Configurar integração com Notion para persistência
2. **Autenticação** - Proteger dashboard do admin
3. **Deploy** - Vercel (zero config)

## Sobre

TechJur - Diagnóstico de Maturidade Tecnológica para Escritórios de Advocacia.

Desenvolvido com Next.js, Tailwind CSS, shadcn/ui, e Claude AI.
