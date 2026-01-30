# TechJur - VyndHub

## Overview
Aplicação web para serviços jurídicos com integração de IA.

## Tech Stack
- **Framework**: Next.js 16
- **UI**: React 19, Tailwind 4, Radix UI
- **AI**: Anthropic Claude SDK
- **Database**: Notion API
- **Email**: Resend
- **PDF**: React PDF Renderer
- **Validation**: Zod
- **Deploy**: Vercel

## Estrutura
```
techjur/
├── src/
│   ├── app/          # App Router (Next.js)
│   ├── components/   # UI components
│   └── lib/          # Utilities
├── public/           # Static assets
└── package.json
```

## Comandos
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production
npm run lint     # Run ESLint
```

## Guidelines
- Usar App Router do Next.js 16
- Componentes com Radix UI + Tailwind
- Validação de dados com Zod
- Manter types TypeScript rigorosos
- Usar Server Components quando possível
- Client Components apenas quando necessário (interatividade)

## Integrações
- **Anthropic**: AI para análise jurídica
- **Notion**: Database de casos/clientes
- **Resend**: Envio de emails transacionais

## Environment Variables
Copiar `.env.example` para `.env.local` e configurar:
- `ANTHROPIC_API_KEY`
- `NOTION_API_KEY`
- `RESEND_API_KEY`
