import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { DiagnosticRecord, ActionPlan } from '@/types/diagnostico';
import { getLevelLabel } from '@/lib/scoring';
import { getScoreDescription } from '@/lib/templates';

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    padding: 40,
    lineHeight: 1.5,
    color: '#1f2937',
  },
  header: {
    textAlign: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#111827',
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  scoreBox: {
    textAlign: 'center',
    padding: 24,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 20,
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
  },
  scoreDescription: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 8,
  },
  columnsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  column: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
  },
  strengthsColumn: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  gapsColumn: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  columnTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  strengthsTitle: {
    color: '#166534',
  },
  gapsTitle: {
    color: '#991b1b',
  },
  listItem: {
    fontSize: 10,
    marginBottom: 4,
    paddingLeft: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
    color: '#111827',
    borderBottomWidth: 2,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 6,
  },
  actionPlan: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    padding: 16,
    marginBottom: 16,
  },
  actionPlanTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 12,
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderRadius: 4,
    color: '#374151',
  },
  subsection: {
    marginBottom: 12,
  },
  subsectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  text: {
    fontSize: 10,
  },
  quote: {
    fontSize: 10,
    fontStyle: 'italic',
    backgroundColor: '#f9fafb',
    padding: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#9ca3af',
  },
  highlight: {
    backgroundColor: '#eff6ff',
    padding: 12,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
    marginBottom: 12,
  },
  highlightTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 4,
  },
  highlightText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  toolsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tool: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 9,
  },
  result: {
    backgroundColor: '#f0fdf4',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  resultTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 4,
  },
  tagline: {
    textAlign: 'center',
    marginTop: 24,
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
  },
  taglineText: {
    fontSize: 10,
    color: '#6b7280',
  },
  taglineTextBold: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 4,
  },
  footer: {
    marginTop: 32,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
  },
  footerText: {
    fontSize: 9,
    color: '#9ca3af',
  },
});

interface ActionPlanSectionProps {
  plan: ActionPlan;
  title: string;
}

const ActionPlanSection: React.FC<ActionPlanSectionProps> = ({ plan, title }) => (
  <View style={styles.actionPlan} wrap={false}>
    <Text style={styles.actionPlanTitle}>{title}</Text>

    <View style={styles.subsection}>
      <Text style={styles.subsectionTitle}>Cenário Real</Text>
      <Text style={styles.quote}>{plan.scenarioReal}</Text>
    </View>

    <View style={styles.subsection}>
      <Text style={styles.subsectionTitle}>Como Grandes Escritórios Fazem</Text>
      <Text style={styles.text}>{plan.bestPractice}</Text>
    </View>

    <View style={styles.highlight}>
      <Text style={styles.highlightTitle}>Seu Próximo Passo</Text>
      <Text style={styles.highlightText}>{plan.nextStep}</Text>
    </View>

    <View style={styles.subsection}>
      <Text style={styles.subsectionTitle}>O Que Fazer</Text>
      <Text style={styles.text}>{plan.whatToDo}</Text>
    </View>

    <View style={styles.subsection}>
      <Text style={styles.subsectionTitle}>Como Fazer</Text>
      {plan.howToDo.map((step, index) => (
        <Text key={index} style={styles.listItem}>
          {index + 1}. {step}
        </Text>
      ))}
    </View>

    <View style={styles.subsection}>
      <Text style={styles.subsectionTitle}>Exemplos Práticos</Text>
      {plan.practicalExamples.map((example, index) => (
        <Text key={index} style={styles.listItem}>
          • {example}
        </Text>
      ))}
    </View>

    <View style={styles.subsection}>
      <Text style={styles.subsectionTitle}>Ferramentas Sugeridas</Text>
      <View style={styles.toolsContainer}>
        {plan.suggestedTools.map((tool, index) => (
          <Text key={index} style={styles.tool}>
            {tool}
          </Text>
        ))}
      </View>
    </View>

    <View style={styles.result}>
      <Text style={styles.resultTitle}>Resultado Esperado</Text>
      <Text style={styles.text}>{plan.expectedResult}</Text>
    </View>
  </View>
);

interface DiagnosticPDFProps {
  record: DiagnosticRecord;
}

export const DiagnosticPDF: React.FC<DiagnosticPDFProps> = ({ record }) => {
  const { devolutiva, clientName, companyName, createdAt } = record;
  const { score, strengths, gaps, actionPlans } = devolutiva;

  const scoreColor = score.score <= 2 ? '#dc2626' : score.score === 3 ? '#ca8a04' : '#16a34a';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Diagnóstico de Maturidade Tecnológica</Text>
          <Text style={styles.subtitle}>
            {companyName} | {clientName}
          </Text>
        </View>

        <View style={styles.scoreBox}>
          <Text style={[styles.scoreNumber, { color: scoreColor }]}>{score.score}/5</Text>
          <Text style={styles.scoreLabel}>{getLevelLabel(score.level)}</Text>
          <Text style={styles.scoreDescription}>{getScoreDescription(score)}</Text>
        </View>

        <View style={styles.columnsContainer}>
          <View style={[styles.column, styles.strengthsColumn]}>
            <Text style={[styles.columnTitle, styles.strengthsTitle]}>Pontos Fortes</Text>
            {strengths.map((s, index) => (
              <Text key={index} style={styles.listItem}>
                • {s}
              </Text>
            ))}
          </View>
          <View style={[styles.column, styles.gapsColumn]}>
            <Text style={[styles.columnTitle, styles.gapsTitle]}>Gargalos</Text>
            {gaps.map((g, index) => (
              <Text key={index} style={styles.listItem}>
                • {g}
              </Text>
            ))}
          </View>
        </View>

        {(actionPlans.q1 || actionPlans.q2 || actionPlans.q3 || actionPlans.q4) && (
          <>
            <Text style={styles.sectionTitle}>Plano de Ação</Text>
            {actionPlans.q1 && <ActionPlanSection plan={actionPlans.q1} title="Operação e Base Organizacional" />}
            {actionPlans.q2 && <ActionPlanSection plan={actionPlans.q2} title="Dados e Decisão" />}
            {actionPlans.q3 && <ActionPlanSection plan={actionPlans.q3} title="Automação" />}
            {actionPlans.q4 && <ActionPlanSection plan={actionPlans.q4} title="Visão e Cultura" />}
          </>
        )}

        <View style={styles.tagline}>
          <Text style={styles.taglineText}>Sem vendas. Sem exageros. Sem promessas mágicas.</Text>
          <Text style={styles.taglineTextBold}>
            Foco em clareza, execução possível, controle, previsibilidade e alívio operacional.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Diagnóstico realizado em {new Date(createdAt).toLocaleDateString('pt-BR')}
          </Text>
          <Text style={styles.footerText}>
            TechJur | Diagnóstico de Maturidade Tecnológica para Escritórios de Advocacia
          </Text>
        </View>
      </Page>
    </Document>
  );
};
