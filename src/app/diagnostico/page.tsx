import { DiagnosticoForm } from '@/components/diagnostico/DiagnosticoForm';

export const metadata = {
  title: 'Diagnóstico de Maturidade Tecnológica | TechJur',
  description: 'Avalie a maturidade tecnológica do seu escritório de advocacia',
};

export default function DiagnosticoPage() {
  return <DiagnosticoForm />;
}
