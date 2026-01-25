import { Answer, ActionPlan, DiagnosticAnswers, ScoreResult } from '@/types/diagnostico';

// Questions data
export const QUESTIONS = [
  {
    id: 1,
    text: 'Qual cenário descreve melhor a operação atual do escritório?',
    options: [
      { value: 'A' as Answer, label: 'Não utilizamos sistemas jurídicos; o controle é feito manualmente (planilhas, agenda, e-mails)' },
      { value: 'B' as Answer, label: 'Utilizamos sistema jurídico, mas como apoio; grande parte do controle ocorre fora dele' },
      { value: 'C' as Answer, label: 'O sistema jurídico é a base da operação, com processos definidos e uso consistente' },
      { value: 'D' as Answer, label: 'Sistemas integrados e configurados sustentam a operação e a gestão do escritório' },
    ],
  },
  {
    id: 2,
    text: 'Quando o escritório precisa decidir prioridades, prazos ou estratégias, o que acontece?',
    options: [
      { value: 'A' as Answer, label: 'A decisão é baseada em urgência, percepção ou experiência individual' },
      { value: 'B' as Answer, label: 'Alguns números são consultados pontualmente, sem padrão ou acompanhamento' },
      { value: 'C' as Answer, label: 'Indicadores recorrentes orientam decisões operacionais' },
      { value: 'D' as Answer, label: 'Dados consolidados orientam decisões estratégicas e planejamento' },
    ],
  },
  {
    id: 3,
    text: 'Sobre tarefas repetitivas (cadastros, atualizações, conferências, envios), qual cenário se aplica?',
    options: [
      { value: 'A' as Answer, label: 'São majoritariamente manuais e consomem grande parte do tempo da equipe' },
      { value: 'B' as Answer, label: 'Existem automações pontuais, mas sem padronização ou integração' },
      { value: 'C' as Answer, label: 'Processos críticos possuem automações estáveis e confiáveis' },
      { value: 'D' as Answer, label: 'Automações integradas reduzem retrabalho, erros e dependência humana' },
    ],
  },
  {
    id: 4,
    text: 'Qual frase mais se aproxima da visão da liderança do escritório?',
    options: [
      { value: 'A' as Answer, label: 'Tecnologia é um custo necessário para funcionar' },
      { value: 'B' as Answer, label: 'Tecnologia ajuda na rotina, mas não muda o resultado do negócio' },
      { value: 'C' as Answer, label: 'Tecnologia é essencial para controle, eficiência e previsibilidade' },
      { value: 'D' as Answer, label: 'Tecnologia é pilar estratégico para crescimento, escala e competitividade' },
    ],
  },
];

// ============================================================================
// Q1: OPERAÇÃO E BASE ORGANIZACIONAL
// ============================================================================
const Q1_ACTION_PLANS: Partial<Record<Answer, ActionPlan>> = {
  A: {
    scenarioReal: 'O escritório opera no modo "memória e improviso". Informações críticas vivem em planilhas pessoais, e-mails dispersos, mensagens de WhatsApp e na cabeça de quem está há mais tempo. Quando alguém sai de férias, fica doente ou deixa o escritório, parte do conhecimento operacional vai junto. Prazos são lembrados no susto, clientes recebem informações desencontradas, e a equipe gasta energia considerável apenas para descobrir "onde está" determinada informação. O retrabalho é constante: a mesma informação é digitada múltiplas vezes, documentos são recriados porque ninguém sabe onde foi salvo o original, e erros aparecem por falta de padronização.',
    bestPractice: 'Os escritórios de alta performance entendem que organização não é burocracia — é libertação. Eles começam criando uma única fonte de verdade: um local central, acessível a todos, onde as informações essenciais da operação ficam consolidadas. Não precisa ser um sistema sofisticado. Precisa ser usado por todos, atualizado consistentemente, e consultado antes de qualquer decisão. O princípio é simples: se a informação não está no local oficial, ela não existe.',
    nextStep: 'Criar uma fonte única de verdade da operação jurídica.',
    whatToDo: 'Centralizar as informações críticas do escritório em um único local que toda a equipe use diariamente como referência oficial.',
    howToDo: [
      'Mapear as 5-7 informações mais consultadas no dia a dia (cliente, processo, fase, prazo, responsável, status, próxima ação)',
      'Criar uma estrutura central com essas informações — pode ser uma planilha bem organizada ou um sistema simples',
      'Definir regras claras: quem atualiza, quando atualiza, o que é obrigatório preencher',
      'Comunicar para toda a equipe: "A partir de agora, essa é a fonte oficial. Se não está aqui, não existe."',
      'Eliminar gradualmente as planilhas paralelas e controles individuais',
      'Incluir essa base nas reuniões de alinhamento — ela deve estar sempre aberta e visível',
    ],
    practicalExamples: [
      'Estrutura com abas por área: Contencioso, Consultivo, Trabalhista — cada aba com seus processos e status',
      'Coluna de "alerta" que muda de cor automaticamente quando o prazo está próximo',
      'Filtro rápido para ver apenas os casos de um advogado específico ou apenas prazos da semana',
      'Campo de "última atualização" para saber se a informação está fresca',
      'Reunião diária de 10 minutos com a planilha aberta no telão — cada um reporta o que fez e o que vai fazer',
      'Regra: antes de perguntar "onde está X?", a pessoa deve verificar na base central primeiro',
    ],
    suggestedTools: [
      'Sistema de gestão processual centralizado com acesso web',
      'Painel visual de acompanhamento de prazos e status',
      'Estrutura padronizada de organização de documentos',
      'Automação de alertas de prazos críticos',
    ],
    expectedResult: 'Redução imediata do tempo gasto procurando informações. Menos erros por falta de comunicação. Início de previsibilidade operacional. A equipe deixa de depender da memória e passa a confiar em um sistema. Férias e ausências deixam de ser momentos de crise.',
  },
  B: {
    scenarioReal: 'O escritório investiu em um sistema jurídico, mas ele virou apenas mais um lugar onde as coisas ficam — não O lugar. Na prática, a equipe ainda mantém planilhas paralelas "porque são mais rápidas", anotações pessoais "porque o sistema é complicado", e controles em e-mail "porque é mais fácil de encontrar". O resultado é uma operação fragmentada: parte da verdade está no sistema, parte em planilhas, parte na cabeça das pessoas. Quando há divergência, ninguém sabe qual informação é a correta. O sistema jurídico, que deveria simplificar, acabou adicionando mais uma camada de complexidade.',
    bestPractice: 'Os escritórios de alta performance não toleram múltiplas versões da realidade. Eles escolhem uma fonte oficial e fazem dela o centro absoluto da operação. Se o sistema jurídico foi escolhido, ele precisa ser reconfigurado para refletir a realidade do escritório — campos simplificados, fluxos ajustados, obrigatoriedades revisadas. E então vem a disciplina: todo mundo usa, todo mundo atualiza, e os controles paralelos são sistematicamente eliminados.',
    nextStep: 'Unificar a operação em torno de uma única fonte oficial.',
    whatToDo: 'Tornar o sistema jurídico (ou a ferramenta escolhida) o centro absoluto da operação, eliminando controles paralelos.',
    howToDo: [
      'Fazer um inventário de todos os controles paralelos existentes (planilhas, anotações, pastas de e-mail)',
      'Identificar por que a equipe não usa o sistema oficial (complexidade, lentidão, falta de campos, falta de treinamento)',
      'Simplificar o sistema: remover campos desnecessários, ajustar nomenclaturas, criar atalhos',
      'Migrar as informações críticas dos controles paralelos para o sistema oficial',
      'Definir uma data de corte: "A partir de X, apenas o sistema oficial vale"',
      'Eliminar ativamente os controles paralelos — não deixar que coexistam',
      'Treinar a equipe no uso correto e eficiente do sistema',
    ],
    practicalExamples: [
      'Auditoria mensal: verificar se alguém ainda mantém planilhas paralelas e entender o porquê',
      'Simplificação do cadastro de processos: reduzir de 30 campos para os 10 essenciais',
      'Criação de visões personalizadas para cada perfil (advogado, estagiário, financeiro)',
      'Implementação de status padronizados que todos entendem da mesma forma',
      'Ritual semanal de "limpeza de dados": corrigir inconsistências e atualizar informações defasadas',
    ],
    suggestedTools: [
      'Diagnóstico e otimização do sistema jurídico atual',
      'Migração e limpeza de dados de planilhas para sistema central',
      'Treinamento personalizado para a equipe',
      'Configuração de fluxos simplificados e intuitivos',
    ],
    expectedResult: 'Uma única versão da verdade. Decisões baseadas em informações consistentes. Redução do tempo gasto reconciliando dados de fontes diferentes. Equipe confiante no sistema e menos dependente de controles pessoais.',
  },
  C: {
    scenarioReal: 'O escritório já opera com o sistema jurídico como base central. Os processos estão cadastrados, os prazos são controlados, a equipe consulta o sistema antes de agir. Existe disciplina de uso e os controles paralelos foram praticamente eliminados. O desafio agora é diferente: como extrair mais valor dessa base sólida? Como conectar a operação jurídica com outras áreas do escritório? Como transformar dados operacionais em inteligência de negócio?',
    bestPractice: 'Os escritórios que já dominaram a base operacional passam a focar em integração e inteligência. Eles conectam o sistema jurídico com financeiro, com atendimento, com produção de documentos. Criam dashboards que transformam dados brutos em visões estratégicas. Automatizam fluxos entre sistemas. O sistema deixa de ser apenas um repositório e passa a ser o motor da operação.',
    nextStep: 'Integrar sistemas e extrair inteligência dos dados.',
    whatToDo: 'Conectar o sistema jurídico com outras áreas e criar visões estratégicas a partir dos dados operacionais.',
    howToDo: [
      'Mapear quais informações do sistema jurídico são necessárias em outras áreas (financeiro, comercial, gestão)',
      'Identificar processos que exigem retrabalho por falta de integração entre sistemas',
      'Criar conexões automatizadas entre sistemas (processo aprovado → financeiro lança, caso encerrado → cliente notificado)',
      'Desenvolver dashboards que mostrem não apenas status, mas tendências e padrões',
      'Implementar alertas inteligentes baseados em comportamento, não apenas em datas',
    ],
    practicalExamples: [
      'Integração automática: quando o advogado registra uma diligência, o financeiro já vê o custo',
      'Dashboard de rentabilidade por cliente, tipo de ação e advogado responsável',
      'Alerta inteligente: "Este tipo de caso costuma demorar X dias nesta fase, mas este está em Y — atenção"',
      'Relatório automático mensal para clientes estratégicos com evolução dos casos',
      'Visão consolidada de carga de trabalho: quem está sobrecarregado, quem pode absorver mais',
    ],
    suggestedTools: [
      'Integrações personalizadas entre sistemas jurídico e financeiro',
      'Dashboards de inteligência de negócio para gestão',
      'Automação de relatórios para clientes',
      'Sistema de alertas inteligentes baseado em padrões',
    ],
    expectedResult: 'Operação fluida entre áreas. Visão estratégica do negócio a partir de dados reais. Decisões de gestão baseadas em inteligência, não em intuição. Clientes impressionados com o nível de organização e transparência.',
  },
  D: {
    scenarioReal: 'O escritório atingiu um nível de maturidade em que os sistemas trabalham integrados. A operação é sustentada por tecnologia, não apesar dela. Os dados fluem entre áreas, a gestão tem visibilidade em tempo real, e a equipe opera com eficiência. O desafio agora é inovação: como usar tecnologia de ponta para criar vantagens competitivas? Como escalar a operação sem aumentar proporcionalmente a equipe? Como oferecer experiências que diferenciem o escritório no mercado?',
    bestPractice: 'Os escritórios líderes de mercado tratam tecnologia como diferencial competitivo. Eles exploram inteligência artificial para aumentar a produtividade dos advogados. Automatizam a experiência do cliente com portais de acompanhamento. Usam dados preditivos para antecipar resultados e orientar estratégias. Criam modelos de atendimento escaláveis que permitem crescer receita sem crescer proporcionalmente em custo.',
    nextStep: 'Explorar tecnologias avançadas para vantagem competitiva.',
    whatToDo: 'Implementar soluções de inteligência artificial, automação avançada e experiência diferenciada para clientes.',
    howToDo: [
      'Avaliar onde IA pode multiplicar a capacidade da equipe (análise de documentos, pesquisa jurídica, geração de minutas)',
      'Criar experiências digitais para clientes (portal de acompanhamento, comunicação automatizada, transparência total)',
      'Implementar análise preditiva para antecipar resultados e riscos',
      'Desenvolver modelos de precificação baseados em dados históricos reais',
      'Criar fluxos de atendimento escaláveis que mantêm qualidade mesmo com volume crescente',
    ],
    practicalExamples: [
      'Assistente de IA que analisa contratos e destaca cláusulas de risco em segundos',
      'Portal do cliente onde ele acompanha todos os casos em tempo real, sem precisar ligar para o escritório',
      'Sistema preditivo: "Casos com este perfil têm 73% de chance de acordo na fase X"',
      'Precificação dinâmica: proposta comercial gerada automaticamente com base em complexidade estimada',
      'Onboarding digital de clientes: documentos, assinaturas e cadastro feitos online em minutos',
    ],
    suggestedTools: [
      'Implementação de IA para análise e produção de documentos',
      'Portal personalizado de acompanhamento para clientes',
      'Sistema de análise preditiva de resultados',
      'Automação completa do ciclo de atendimento',
    ],
    expectedResult: 'Vantagem competitiva clara no mercado. Capacidade de escalar sem aumentar custos proporcionalmente. Clientes encantados com a experiência. Advogados focados em atividades de alto valor. Posicionamento como escritório inovador.',
  },
};

// ============================================================================
// Q2: DADOS E DECISÃO
// ============================================================================
const Q2_ACTION_PLANS: Partial<Record<Answer, ActionPlan>> = {
  A: {
    scenarioReal: 'O escritório opera no modo "apagar incêndios". Sem visão consolidada do que está acontecendo, as decisões são tomadas com base na urgência do momento: qual prazo está mais perto, qual cliente reclamou mais alto, qual advogado gritou primeiro. A liderança não consegue responder perguntas básicas como "quantos casos temos em cada fase?", "qual área é mais rentável?", "quem está sobrecarregado?". As reuniões de equipe são listas de problemas, não discussões estratégicas. A sensação é de que o escritório está sempre correndo atrás, nunca à frente.',
    bestPractice: 'Os escritórios de alta performance entendem que clareza vem antes de eficiência. Antes de otimizar, é preciso enxergar. Eles começam definindo poucos indicadores essenciais — três a cinco métricas que, se monitoradas consistentemente, dão visão do todo. Não é sobre criar dashboards elaborados; é sobre transformar dados brutos em clareza acionável. O objetivo é sair do "achismo" e entrar no "sabemos".',
    nextStep: 'Criar visão mínima e acionável do escritório.',
    whatToDo: 'Definir e acompanhar os indicadores essenciais que permitem enxergar a operação e tomar decisões informadas.',
    howToDo: [
      'Identificar as 3-5 perguntas que a liderança mais faz (ou deveria fazer) sobre a operação',
      'Transformar cada pergunta em um indicador mensurável',
      'Criar uma forma simples de calcular e visualizar esses indicadores semanalmente',
      'Estabelecer um ritual: toda segunda-feira, olhar esses números antes de qualquer reunião',
      'Usar os indicadores para priorizar: "O que os números estão nos dizendo que devemos fazer esta semana?"',
      'Registrar decisões tomadas com base nos dados e acompanhar resultados',
    ],
    practicalExamples: [
      'Indicador 1: Quantidade de processos por fase — mostra onde está o gargalo',
      'Indicador 2: Processos com prazo nos próximos 7 dias — mostra a pressão imediata',
      'Indicador 3: Distribuição de casos por advogado — mostra quem está sobrecarregado',
      'Indicador 4: Tempo médio em cada fase — mostra onde as coisas emperram',
      'Indicador 5: Casos novos vs. casos encerrados — mostra se o escritório está crescendo ou acumulando',
      'Reunião semanal de 30 minutos: "O que os números nos dizem? O que vamos fazer diferente?"',
    ],
    suggestedTools: [
      'Dashboard personalizado de indicadores operacionais',
      'Relatório automático semanal de métricas essenciais',
      'Sistema de alertas para desvios de padrão',
      'Painel visual para reuniões de gestão',
    ],
    expectedResult: 'Capacidade de responder perguntas sobre a operação com dados, não com "acho que". Decisões de priorização baseadas em fatos. Redução da sensação de descontrole. Reuniões produtivas focadas em análise e ação, não em listas de problemas.',
  },
  B: {
    scenarioReal: 'O escritório até consulta números de vez em quando — geralmente quando precisa justificar algo que já aconteceu ou responder a uma pergunta específica de um cliente ou sócio. Mas não existe rotina. Os dados são usados de forma reativa ("por que perdemos aquele cliente?") em vez de proativa ("quais clientes estão em risco?"). Não há acompanhamento consistente: os mesmos problemas se repetem porque não há ciclo de medir, decidir, agir, avaliar.',
    bestPractice: 'Os escritórios de alta performance criam rituais de decisão baseada em dados. Não basta ter os números — é preciso olhar para eles regularmente, sempre da mesma forma, e transformar análise em ação. O ritual é mais importante que a sofisticação: uma planilha simples revisada toda semana é mais poderosa que um dashboard elaborado que ninguém consulta.',
    nextStep: 'Criar rotina estruturada de decisão baseada em dados.',
    whatToDo: 'Estabelecer rituais fixos de análise de indicadores com decisões documentadas e acompanhamento de resultados.',
    howToDo: [
      'Definir um dia e horário fixo para revisão de indicadores (ex: toda segunda às 9h)',
      'Criar um formato padrão: quais indicadores olhar, em que ordem, que perguntas fazer',
      'Para cada análise, definir pelo menos uma ação concreta: "Com base nos dados, vamos fazer X"',
      'Documentar as decisões tomadas: o que foi decidido, por quê, resultado esperado',
      'Na semana seguinte, antes de olhar novos dados, revisar: "O que decidimos na semana passada funcionou?"',
      'Ajustar a estratégia com base no que os dados mostrarem',
    ],
    practicalExamples: [
      'Ritual de segunda: 30 minutos olhando os 5 indicadores principais com toda a equipe',
      'Documento de decisões: data, indicador que motivou, decisão tomada, responsável, prazo',
      'Exemplo: "Vimos que processos trabalhistas estão acumulando na fase de perícia → Decisão: priorizar agendamento de perícias esta semana → Responsável: Dr. Silva"',
      'Revisão mensal: quais decisões funcionaram, quais não funcionaram, o que aprendemos',
      'Indicadores de tendência: "Este mês vs. mês passado" para ver se estamos melhorando',
    ],
    suggestedTools: [
      'Sistema de gestão de decisões com rastreabilidade',
      'Painel comparativo de períodos (semana vs. semana, mês vs. mês)',
      'Relatório automático de "decisões pendentes de avaliação"',
      'Dashboard com indicadores de tendência e evolução',
    ],
    expectedResult: 'Cultura de decisão estruturada. Menos improviso e mais consistência. Capacidade de aprender com os resultados e melhorar continuamente. Equipe engajada em usar dados para resolver problemas.',
  },
  C: {
    scenarioReal: 'O escritório já usa indicadores para orientar a operação. Existe rotina de acompanhamento, a equipe sabe quais métricas importam, e decisões operacionais são tomadas com base em dados. O desafio agora é elevar o nível: como sair do operacional e ir para o estratégico? Como usar dados não apenas para gerenciar o dia a dia, mas para planejar o futuro? Como identificar oportunidades e riscos antes que se manifestem?',
    bestPractice: 'Os escritórios que dominam a gestão operacional evoluem para inteligência estratégica. Eles cruzam dados para encontrar padrões invisíveis. Usam análise histórica para prever tendências. Conectam indicadores de operação com indicadores de resultado de negócio. Transformam dados em vantagem competitiva.',
    nextStep: 'Evoluir de gestão operacional para inteligência estratégica.',
    whatToDo: 'Criar análises que conectem operação com estratégia e permitam decisões de longo prazo baseadas em dados.',
    howToDo: [
      'Identificar quais decisões estratégicas ainda são tomadas por intuição (precificação, aceitação de clientes, alocação de recursos)',
      'Definir quais dados históricos podem informar essas decisões',
      'Criar análises de correlação: "Quando X acontece, geralmente Y segue"',
      'Implementar indicadores preditivos, não apenas descritivos',
      'Usar dados para modelar cenários: "Se fizermos X, o impacto esperado é Y"',
    ],
    practicalExamples: [
      'Análise de rentabilidade real por tipo de caso, considerando horas investidas vs. honorários recebidos',
      'Modelo preditivo: casos com determinadas características têm maior probabilidade de durar mais/menos',
      'Análise de ciclo de vida de cliente: quando eles costumam trazer novos casos, quando eles vão embora',
      'Dashboard estratégico trimestral: evolução de receita, margem, produtividade, satisfação',
      'Simulador de cenários: "Se aumentarmos a equipe em X, o impacto em produtividade e rentabilidade seria..."',
    ],
    suggestedTools: [
      'Sistema de inteligência de negócio com análises avançadas',
      'Modelos preditivos para resultados de casos',
      'Dashboard estratégico para sócios e liderança',
      'Análise de rentabilidade por segmento de cliente e tipo de serviço',
    ],
    expectedResult: 'Decisões estratégicas informadas por dados históricos e projeções. Capacidade de antecipar tendências e agir proativamente. Precificação e alocação de recursos otimizadas. Visão clara do que gera e do que consome valor no escritório.',
  },
  D: {
    scenarioReal: 'O escritório opera com inteligência estratégica madura. Dados orientam desde a operação diária até o planejamento de longo prazo. A liderança tem visibilidade completa do negócio. O desafio agora é fronteira: como usar análise avançada para criar vantagens que a concorrência não consegue replicar? Como transformar dados em produtos e serviços inovadores?',
    bestPractice: 'Os escritórios líderes usam dados como diferencial competitivo. Eles oferecem aos clientes transparência total com dashboards personalizados. Usam inteligência artificial para identificar oportunidades e riscos. Criam benchmarks de mercado que posicionam o escritório como referência. Transformam conhecimento acumulado em propriedade intelectual.',
    nextStep: 'Transformar dados em vantagem competitiva e diferenciação de mercado.',
    whatToDo: 'Criar produtos e experiências baseados em dados que diferenciem o escritório no mercado.',
    howToDo: [
      'Desenvolver portal de transparência para clientes com visão em tempo real de seus casos',
      'Criar benchmarks internos que permitam comparar performance com referências de mercado',
      'Implementar IA para análise preditiva de resultados e recomendações estratégicas',
      'Desenvolver relatórios de inteligência setorial baseados em dados agregados',
      'Usar dados para criar novos modelos de negócio (success fee informado por probabilidade real, precificação dinâmica)',
    ],
    practicalExamples: [
      'Portal do cliente: ele acessa e vê todos os casos, andamentos, custos, documentos — sem precisar ligar',
      'Relatório trimestral: "Seus casos comparados com a média do mercado para este tipo de ação"',
      'IA que analisa petição da parte contrária e sugere argumentos de defesa com base em casos similares',
      'Modelo de precificação: "Baseado em 500 casos similares, o custo estimado é X com margem Y"',
      'Inteligência setorial: "Tendências em disputas trabalhistas do setor de tecnologia — baseado em nossos dados"',
    ],
    suggestedTools: [
      'Portal completo de transparência para clientes',
      'Sistema de IA para análise preditiva e recomendações',
      'Plataforma de benchmarking e inteligência de mercado',
      'Modelos de precificação inteligente baseados em dados',
    ],
    expectedResult: 'Posicionamento como escritório inovador e transparente. Clientes que enxergam valor único na parceria. Capacidade de precificar com precisão e rentabilidade. Vantagem competitiva baseada em ativos de dados que a concorrência não possui.',
  },
};

// ============================================================================
// Q3: AUTOMAÇÃO
// ============================================================================
const Q3_ACTION_PLANS: Partial<Record<Answer, ActionPlan>> = {
  A: {
    scenarioReal: 'O tempo dos advogados é consumido por tarefas que não exigem conhecimento jurídico: preencher os mesmos dados em vários lugares, criar documentos copiando e colando informações, conferir manualmente se prazos foram atualizados, enviar e-mails repetitivos de status para clientes. Cada hora gasta nessas tarefas é uma hora que não foi dedicada a atividades de valor — análise jurídica, estratégia, relacionamento com cliente. O custo invisível é enorme: advogados caros fazendo trabalho de baixo valor, erros por fadiga de tarefas repetitivas, atrasos porque alguém esqueceu um passo manual.',
    bestPractice: 'Os escritórios de alta performance começam identificando as tarefas que mais consomem tempo e mais geram erros — geralmente são as mesmas. Eles não tentam automatizar tudo de uma vez. Escolhem uma única tarefa crítica, automatizam com cuidado, validam por algumas semanas, e só então partem para a próxima. O princípio é: cada automação deve liberar tempo ou eliminar erro. Se não faz nenhum dos dois, não vale o esforço.',
    nextStep: 'Eliminar a tarefa manual mais custosa.',
    whatToDo: 'Identificar a tarefa repetitiva que mais consome tempo ou mais gera erros e automatizá-la completamente.',
    howToDo: [
      'Listar todas as tarefas repetitivas que a equipe realiza (cadastros, atualizações, conferências, envios)',
      'Para cada tarefa, estimar: frequência, tempo gasto, taxa de erro, impacto quando erro acontece',
      'Escolher a tarefa com maior impacto (tempo × frequência × consequência de erro)',
      'Mapear o processo atual passo a passo: o que acontece, em que ordem, que decisões são tomadas',
      'Desenhar o processo automatizado: o que será feito automaticamente, o que ainda precisa de humano',
      'Implementar a automação de forma controlada, testar por 2-3 semanas, ajustar',
      'Medir resultado: quanto tempo foi liberado, quantos erros foram eliminados',
    ],
    practicalExamples: [
      'Geração automática de procuração: advogado seleciona o caso, sistema gera documento completo com todos os dados',
      'Atualização automática de prazos: integração com tribunais atualiza andamentos sem intervenção humana',
      'E-mail automático de status: cliente recebe atualização toda vez que o caso muda de fase',
      'Cadastro único: informações do cliente inseridas uma vez são replicadas em todos os sistemas',
      'Conferência automática: sistema compara dados do processo com fontes oficiais e alerta divergências',
    ],
    suggestedTools: [
      'Automação de geração de documentos jurídicos',
      'Integração automática com sistemas de tribunais',
      'Sistema de comunicação automatizada com clientes',
      'Robô de cadastro e atualização de dados',
    ],
    expectedResult: 'Liberação imediata de horas que podem ser redirecionadas para atividades de valor. Eliminação de erros causados por tarefas repetitivas manuais. Equipe mais satisfeita por não fazer trabalho mecânico. Clientes atendidos com mais agilidade.',
  },
  B: {
    scenarioReal: 'O escritório já tem algumas automações funcionando, mas elas são frágeis. Foram criadas de forma isolada, geralmente por uma pessoa específica que "entende de tecnologia". Quando essa pessoa sai de férias ou deixa o escritório, ninguém sabe consertar. As automações às vezes falham silenciosamente — ninguém percebe que pararam de funcionar até que um problema aparece. Não há documentação, não há padronização, não há monitoramento.',
    bestPractice: 'Os escritórios de alta performance tratam automações como processos críticos, não como "gambiarras". Eles documentam como cada automação funciona. Garantem que mais de uma pessoa sabe operar e corrigir. Implementam alertas para saber quando algo falha. Criam rituais de verificação periódica. O objetivo é que as automações sejam confiáveis — a equipe pode confiar que elas vão funcionar.',
    nextStep: 'Tornar as automações existentes confiáveis e mantidas.',
    whatToDo: 'Documentar, padronizar e criar redundância nas automações para que não dependam de uma única pessoa.',
    howToDo: [
      'Fazer inventário de todas as automações existentes: o que fazem, quem criou, quem sabe operar',
      'Para cada automação crítica, criar documentação simples: o que faz, como funciona, como verificar se está funcionando',
      'Treinar pelo menos duas pessoas em cada automação crítica',
      'Implementar alertas: se a automação falhar, alguém precisa saber imediatamente',
      'Criar checklist semanal de verificação: "Todas as automações rodaram corretamente?"',
      'Estabelecer responsável por manutenção de automações (não precisa ser técnico, precisa ser organizado)',
    ],
    practicalExamples: [
      'Documento de cada automação: nome, o que faz, frequência, como verificar, contato se falhar',
      'Dashboard simples: verde = automação funcionando, vermelho = falha detectada',
      'Checklist de segunda-feira: verificar se todas as automações da semana anterior rodaram',
      'Reunião mensal de 15 minutos: revisar automações, identificar problemas, planejar melhorias',
      'Treinamento cruzado: cada automação tem "dono" principal e "backup"',
    ],
    suggestedTools: [
      'Sistema de monitoramento de automações com alertas',
      'Documentação estruturada de processos automatizados',
      'Dashboard de saúde das automações',
      'Treinamento e capacitação da equipe em automações',
    ],
    expectedResult: 'Automações confiáveis que a equipe pode confiar. Fim da dependência de pessoas específicas. Problemas detectados rapidamente, antes de causarem impacto. Fundação sólida para criar novas automações.',
  },
  C: {
    scenarioReal: 'O escritório tem automações estáveis nos processos críticos. A equipe confia nelas, há documentação, há monitoramento. O desafio agora é expandir: como automatizar mais processos? Como conectar automações que hoje funcionam isoladas? Como criar fluxos completos que atravessam múltiplas etapas sem intervenção manual?',
    bestPractice: 'Os escritórios que dominam automações pontuais evoluem para fluxos integrados. Eles mapeiam processos de ponta a ponta e identificam onde ainda há "costuras manuais" — momentos em que uma pessoa precisa pegar o resultado de uma automação e alimentar outra. Essas costuras são oportunidades de integração. O objetivo é criar fluxos que funcionam de forma autônoma: entrada de dados na ponta inicial, resultado na ponta final, sem intervenções manuais no meio.',
    nextStep: 'Conectar automações em fluxos integrados de ponta a ponta.',
    whatToDo: 'Eliminar as "costuras manuais" entre automações, criando fluxos que atravessam múltiplas etapas sem intervenção.',
    howToDo: [
      'Mapear processos de ponta a ponta: desde o gatilho inicial até o resultado final',
      'Identificar onde ainda há passos manuais entre automações ("costura")',
      'Priorizar por impacto: quais costuras geram mais retrabalho ou risco de erro',
      'Desenhar o fluxo ideal: como seria se tudo funcionasse integrado',
      'Implementar as conexões, testando cada integração antes de partir para a próxima',
      'Monitorar o fluxo completo, não apenas as automações individuais',
    ],
    practicalExamples: [
      'Fluxo de novo processo: cadastro → geração de documentos → distribuição → notificação ao cliente — tudo automático',
      'Fluxo de encerramento: sentença registrada → financeiro notificado → relatório final gerado → cliente comunicado',
      'Fluxo de cobrança: prazo de pagamento vencido → lembrete automático → escalonamento se não pagar → registro no sistema',
      'Fluxo de onboarding de cliente: proposta aceita → contrato gerado → assinatura digital → cadastro nos sistemas',
    ],
    suggestedTools: [
      'Orquestrador de fluxos automatizados',
      'Integrações entre sistemas jurídico, financeiro e comunicação',
      'Monitoramento de fluxos de ponta a ponta',
      'Automação de processos de onboarding e encerramento',
    ],
    expectedResult: 'Processos que funcionam de forma autônoma, sem intervenções manuais desnecessárias. Redução drástica de retrabalho. Velocidade muito maior na execução. Capacidade de escalar operação sem aumentar equipe proporcionalmente.',
  },
  D: {
    scenarioReal: 'O escritório opera com automações integradas que reduzem significativamente trabalho manual. Os fluxos funcionam de ponta a ponta. O desafio agora é inteligência: como fazer as automações tomarem decisões? Como usar IA para lidar com situações que antes exigiam julgamento humano? Como criar automações que aprendem e melhoram com o tempo?',
    bestPractice: 'Os escritórios líderes incorporam inteligência artificial nas automações. Não se trata de substituir advogados, mas de amplificar sua capacidade. IA que analisa documentos e destaca pontos de atenção. Automações que classificam e roteiam casos baseado em características. Sistemas que sugerem próximos passos baseado em padrões históricos. O objetivo é que as máquinas façam o trabalho mecânico de análise, liberando humanos para julgamento e estratégia.',
    nextStep: 'Incorporar inteligência artificial nas automações.',
    whatToDo: 'Adicionar camadas de IA que permitem às automações analisar, classificar e sugerir, não apenas executar.',
    howToDo: [
      'Identificar tarefas que hoje exigem "julgamento simples" — classificação, priorização, identificação de padrões',
      'Avaliar se há dados históricos suficientes para treinar modelos',
      'Começar com casos de uso de baixo risco: sugestões que humanos validam antes de executar',
      'Implementar feedback loop: quando o humano discorda da sugestão da IA, usar isso para melhorar o modelo',
      'Gradualmente aumentar a autonomia conforme o modelo se prova confiável',
    ],
    practicalExamples: [
      'IA que lê petição inicial e sugere classificação de risco, área do direito, e complexidade estimada',
      'Sistema que analisa contrato e destaca cláusulas potencialmente problemáticas',
      'Automação que prioriza tarefas do dia baseado em urgência real, não apenas data',
      'IA que sugere argumentos de defesa baseado em casos similares ganhos anteriormente',
      'Sistema que prevê duração do processo baseado em características conhecidas',
    ],
    suggestedTools: [
      'IA para análise e classificação de documentos jurídicos',
      'Sistema de priorização inteligente de tarefas',
      'Assistente de IA para pesquisa e argumentação',
      'Modelos preditivos de duração e resultado de processos',
    ],
    expectedResult: 'Automações que não apenas executam, mas analisam e sugerem. Advogados com capacidade multiplicada por IA. Decisões mais rápidas e informadas. Vantagem competitiva baseada em tecnologia que concorrentes não conseguem replicar facilmente.',
  },
};

// ============================================================================
// Q4: VISÃO E CULTURA
// ============================================================================
const Q4_ACTION_PLANS: Partial<Record<Answer, ActionPlan>> = {
  A: {
    scenarioReal: 'A liderança do escritório vê tecnologia como um mal necessário — algo que precisa existir para o básico funcionar, mas que é essencialmente um custo a ser minimizado. Investimentos em tecnologia são vistos com ceticismo: "Isso realmente vai trazer retorno?" ou "Funcionamos assim há anos, por que mudar?". A resistência não é necessariamente explícita, mas se manifesta em adiamentos, escolhas pelo mais barato, e falta de tempo dedicado a pensar estrategicamente sobre tecnologia. O resultado é um ciclo vicioso: como não há investimento inteligente, a tecnologia não entrega valor; como não entrega valor, não há motivação para investir.',
    bestPractice: 'Os escritórios de alta performance entendem que a forma de quebrar esse ciclo é começar pequeno, com vitórias rápidas e visíveis. Não adianta apresentar grandes planos de transformação digital — isso gera mais resistência. O caminho é identificar um problema concreto que a liderança sente, resolver esse problema com tecnologia de forma rápida e mensurável, e usar essa vitória para abrir espaço para o próximo passo. Cada pequeno sucesso constrói credibilidade.',
    nextStep: 'Gerar uma vitória rápida e visível que demonstre valor.',
    whatToDo: 'Identificar um problema que a liderança sente diretamente e resolvê-lo com tecnologia de forma mensurável.',
    howToDo: [
      'Conversar com a liderança: "Qual é a maior dor operacional do escritório hoje?"',
      'Escolher um problema que seja visível, sentido pela liderança, e resolvível em poucas semanas',
      'Implementar uma solução simples e focada — não tentar resolver tudo de uma vez',
      'Medir o resultado de forma objetiva: tempo economizado, erros eliminados, dinheiro poupado',
      'Apresentar o resultado para a liderança: "Investimos X, resolvemos Y problema, o ganho foi Z"',
      'Usar essa credibilidade para propor o próximo passo',
    ],
    practicalExamples: [
      'Problema: "Nunca sabemos quantos processos temos em cada fase" → Solução: dashboard simples → Resultado: visibilidade em tempo real',
      'Problema: "Clientes reclamam que não sabem o status dos casos" → Solução: e-mail automático de atualização → Resultado: redução de ligações',
      'Problema: "Perdemos prazos" → Solução: sistema de alertas → Resultado: zero prazos perdidos em 3 meses',
      'Apresentação de ROI: "Investimos R$X em automação de Y, economizamos Z horas por mês = R$W"',
    ],
    suggestedTools: [
      'Diagnóstico de dores operacionais prioritárias',
      'Implementação de solução rápida para problema crítico',
      'Dashboard de visibilidade para liderança',
      'Relatório de ROI de iniciativas tecnológicas',
    ],
    expectedResult: 'Liderança começa a ver tecnologia como investimento, não custo. Abertura para iniciativas mais ambiciosas. Mudança gradual de cultura sem trauma ou resistência. Credibilidade construída através de resultados concretos.',
  },
  B: {
    scenarioReal: 'A liderança reconhece que tecnologia ajuda no dia a dia — o sistema jurídico é usado, há algumas automações funcionando, a equipe usa ferramentas modernas. Mas a visão é limitada ao operacional: tecnologia serve para executar melhor o que já fazemos, não para transformar o negócio. Não há conexão entre tecnologia e estratégia. Discussões sobre "como crescer", "como diferenciar", "como escalar" não incluem tecnologia como variável central. O potencial de usar tecnologia como vantagem competitiva está sendo desperdiçado.',
    bestPractice: 'Os escritórios de alta performance fazem a liderança enxergar a conexão entre tecnologia e resultados de negócio. Não se trata de falar sobre tecnologia — é sobre falar sobre resultados e mostrar como tecnologia viabiliza esses resultados. Como tecnologia permite atender mais clientes com a mesma equipe. Como dados permitem precificar melhor. Como automação libera advogados para atividades de maior valor. A mudança de perspectiva vem quando a liderança para de ver tecnologia como ferramenta de suporte e começa a ver como alavanca de crescimento.',
    nextStep: 'Conectar tecnologia com metas de negócio da liderança.',
    whatToDo: 'Mostrar para a liderança como tecnologia pode resolver desafios estratégicos do escritório, não apenas operacionais.',
    howToDo: [
      'Entender quais são as ambições de negócio da liderança (crescer, escalar, diversificar, diferenciar)',
      'Para cada ambição, identificar o gargalo atual que impede de alcançá-la',
      'Mostrar como tecnologia pode eliminar ou reduzir esse gargalo',
      'Criar cenários comparativos: "Hoje fazemos X com Y recursos. Com tecnologia Z, poderíamos fazer 2X com os mesmos recursos"',
      'Incluir tecnologia nas discussões estratégicas do escritório',
      'Definir métricas de negócio (não técnicas) para avaliar iniciativas de tecnologia',
    ],
    practicalExamples: [
      'Ambição: crescer 30% → Gargalo: equipe já está no limite → Solução: automação que aumenta capacidade sem contratar',
      'Ambição: atender clientes maiores → Gargalo: não conseguimos mostrar organização → Solução: dashboard de transparência para cliente',
      'Ambição: ser mais rentável → Gargalo: não sabemos quais casos dão lucro → Solução: análise de rentabilidade por caso',
      'Reunião estratégica trimestral: "Quais são nossas metas? Como tecnologia pode ajudar a alcançá-las?"',
    ],
    suggestedTools: [
      'Diagnóstico de conexão entre tecnologia e estratégia de negócio',
      'Roadmap tecnológico alinhado com metas do escritório',
      'Dashboard de métricas de negócio (não técnicas)',
      'Análise de ROI de iniciativas tecnológicas em termos de resultados de negócio',
    ],
    expectedResult: 'Liderança vê tecnologia como alavanca estratégica, não apenas suporte. Tecnologia passa a fazer parte das discussões de planejamento. Investimentos avaliados por impacto em resultados de negócio. Cultura que conecta inovação com crescimento.',
  },
  C: {
    scenarioReal: 'A liderança já entende que tecnologia é essencial para eficiência e controle. Há investimentos consistentes, há visão de que tecnologia diferencia o escritório. O desafio agora é ir além: como passar de "tecnologia para eficiência" para "tecnologia para vantagem competitiva"? Como criar uma cultura onde inovação tecnológica é parte do DNA do escritório, não apenas uma área de suporte?',
    bestPractice: 'Os escritórios líderes criam estruturas formais para inovação. Eles dedicam tempo e recursos específicos para explorar novas tecnologias. Criam ambientes seguros para experimentar. Estabelecem métricas de inovação, não apenas de operação. Celebram tentativas, mesmo quando não dão certo. Conectam a equipe com o que há de mais novo no mercado jurídico e tecnológico.',
    nextStep: 'Criar estrutura formal de inovação tecnológica.',
    whatToDo: 'Estabelecer processos, recursos e cultura dedicados a explorar e implementar inovações tecnológicas.',
    howToDo: [
      'Definir um responsável ou comitê de inovação (não precisa ser full-time, precisa ter mandato claro)',
      'Alocar tempo e orçamento específicos para experimentação — não é "se sobrar tempo"',
      'Criar um processo para avaliar novas tecnologias: como identificamos, como testamos, como decidimos adotar',
      'Estabelecer métricas de inovação: quantas iniciativas testadas, quantas implementadas, impacto gerado',
      'Conectar a equipe com fontes de informação sobre inovação jurídica (eventos, publicações, comunidades)',
      'Celebrar aprendizados, não apenas sucessos — falhar rápido e aprender é valioso',
    ],
    practicalExamples: [
      'Comitê de inovação: reunião mensal para avaliar novas tecnologias e decidir o que testar',
      'Orçamento de experimentação: R$X por mês para testar novas ferramentas sem precisar de aprovação formal',
      'Piloto controlado: antes de adotar qualquer nova tecnologia, testar por 30 dias com escopo limitado',
      'Showcase trimestral: apresentação para o escritório sobre o que foi testado, o que funcionou, o que aprendemos',
      'Conexão externa: participação em eventos de legal tech, conversa com outros escritórios inovadores',
    ],
    suggestedTools: [
      'Estruturação de comitê de inovação e processos',
      'Programa de testes e pilotos controlados',
      'Dashboard de métricas de inovação',
      'Curadoria de tendências e oportunidades tecnológicas',
    ],
    expectedResult: 'Cultura de inovação contínua. Escritório sempre na fronteira do que há de novo. Equipe engajada com experimentação. Pipeline constante de melhorias sendo testadas e implementadas. Reputação de escritório inovador.',
  },
  D: {
    scenarioReal: 'O escritório já trata tecnologia como pilar estratégico. Há cultura de inovação, investimentos consistentes, e a liderança entende o valor de estar na fronteira. O desafio agora é liderança de mercado: como usar essa vantagem tecnológica para se posicionar como referência? Como atrair os melhores talentos que querem trabalhar em ambientes inovadores? Como criar um ciclo virtuoso onde a reputação de inovação atrai clientes que valorizam isso?',
    bestPractice: 'Os escritórios que são referência em inovação não apenas praticam — eles comunicam. Eles compartilham aprendizados, participam de discussões de mercado, são procurados por outros escritórios que querem aprender. Eles usam sua capacidade tecnológica como argumento comercial. Atraem talentos que querem trabalhar com o que há de mais moderno. Criam uma marca associada a inovação e excelência.',
    nextStep: 'Posicionar o escritório como referência de inovação no mercado.',
    whatToDo: 'Transformar a capacidade tecnológica interna em diferencial de mercado visível para clientes, talentos e comunidade.',
    howToDo: [
      'Documentar e compartilhar cases de inovação do escritório (respeitando confidencialidade)',
      'Participar ativamente de discussões de mercado sobre inovação jurídica',
      'Usar capacidade tecnológica como argumento comercial explícito em propostas',
      'Criar conteúdo que posicione o escritório como thought leader em tecnologia jurídica',
      'Atrair talentos destacando o ambiente de inovação',
      'Conectar-se com ecossistema de legal tech: startups, investidores, academia',
    ],
    practicalExamples: [
      'Case studies publicáveis: "Como reduzimos 70% do tempo de análise contratual com IA"',
      'Participação em eventos: palestras sobre inovação jurídica em conferências do setor',
      'Proposta comercial: seção específica sobre capacidade tecnológica como diferencial',
      'Programa de atração de talentos: "Venha trabalhar no escritório mais inovador do país"',
      'Parcerias com legal techs: early adopter de soluções inovadoras, troca de aprendizados',
    ],
    suggestedTools: [
      'Estratégia de posicionamento e comunicação de inovação',
      'Produção de conteúdo sobre tecnologia jurídica',
      'Programa de atração de talentos focado em inovação',
      'Parcerias estratégicas com ecossistema de legal tech',
    ],
    expectedResult: 'Reconhecimento de mercado como escritório inovador. Clientes que escolhem o escritório pela capacidade tecnológica. Talentos que querem trabalhar no ambiente mais moderno. Ciclo virtuoso onde reputação gera oportunidades que reforçam reputação.',
  },
};

/**
 * Get action plan for a specific question and answer
 */
export function getActionPlan(questionId: number, answer: Answer): ActionPlan | null {
  switch (questionId) {
    case 1:
      return Q1_ACTION_PLANS[answer] || null;
    case 2:
      return Q2_ACTION_PLANS[answer] || null;
    case 3:
      return Q3_ACTION_PLANS[answer] || null;
    case 4:
      return Q4_ACTION_PLANS[answer] || null;
    default:
      return null;
  }
}

/**
 * Generate all action plans based on answers
 */
export function generateActionPlans(answers: DiagnosticAnswers): Record<string, ActionPlan | null> {
  return {
    q1: getActionPlan(1, answers.q1),
    q2: getActionPlan(2, answers.q2),
    q3: getActionPlan(3, answers.q3),
    q4: getActionPlan(4, answers.q4),
  };
}

/**
 * Identify strengths based on answers
 */
export function identifyStrengths(answers: DiagnosticAnswers): string[] {
  const strengths: string[] = [];

  // Q1 Strengths
  if (answers.q1 === 'D') {
    strengths.push('Operação sustentada por sistemas integrados — informação flui entre áreas sem retrabalho');
    strengths.push('Base tecnológica sólida que permite escalar sem aumentar complexidade');
  } else if (answers.q1 === 'C') {
    strengths.push('Sistema jurídico centralizado como fonte única de verdade');
    strengths.push('Disciplina de uso que garante consistência das informações');
  }

  // Q2 Strengths
  if (answers.q2 === 'D') {
    strengths.push('Cultura de decisão estratégica orientada por dados consolidados');
    strengths.push('Capacidade de planejamento baseado em inteligência, não intuição');
  } else if (answers.q2 === 'C') {
    strengths.push('Indicadores operacionais estabelecidos e monitorados regularmente');
    strengths.push('Decisões do dia a dia informadas por métricas objetivas');
  }

  // Q3 Strengths
  if (answers.q3 === 'D') {
    strengths.push('Automações integradas que reduzem drasticamente trabalho manual');
    strengths.push('Processos que funcionam de forma autônoma, com mínima intervenção humana');
  } else if (answers.q3 === 'C') {
    strengths.push('Processos críticos automatizados de forma estável e confiável');
    strengths.push('Equipe confiante nas automações, com monitoramento adequado');
  }

  // Q4 Strengths
  if (answers.q4 === 'D') {
    strengths.push('Tecnologia posicionada como pilar estratégico de crescimento e diferenciação');
    strengths.push('Cultura de inovação que busca vantagem competitiva através de tecnologia');
  } else if (answers.q4 === 'C') {
    strengths.push('Liderança que reconhece tecnologia como essencial para eficiência');
    strengths.push('Investimentos consistentes em tecnologia como prioridade');
  }

  // Minor strengths if no major ones
  if (strengths.length === 0) {
    if (answers.q1 === 'B') {
      strengths.push('Sistema jurídico já existe e é utilizado — base para evolução');
    }
    if (answers.q2 === 'B') {
      strengths.push('Dados são consultados pontualmente — há abertura para cultura de métricas');
    }
    if (answers.q3 === 'B') {
      strengths.push('Automações pontuais já implementadas — fundação para expandir');
    }
    if (answers.q4 === 'B') {
      strengths.push('Tecnologia reconhecida como útil para rotina — espaço para elevar a visão');
    }
  }

  // Fallback strength
  if (strengths.length === 0) {
    strengths.push('Disposição para diagnosticar e buscar melhorias — primeiro passo para evolução');
  }

  return strengths;
}

/**
 * Identify gaps based on answers
 */
export function identifyGaps(answers: DiagnosticAnswers, score: ScoreResult): string[] {
  const gaps: string[] = [];

  // Score-based general gaps
  if (score.score <= 2) {
    gaps.push('Operação no modo "apagar incêndios" — equipe constantemente reagindo em vez de antecipando');
    gaps.push('Decisões baseadas em urgência e percepção, não em dados e análise');
    gaps.push('Risco operacional significativo — dependência de pessoas específicas para informações críticas');
  }

  // Q1 Gaps
  if (answers.q1 === 'A') {
    gaps.push('Informações críticas dispersas em múltiplos locais — alto risco de perda e inconsistência');
    gaps.push('Conhecimento operacional concentrado em pessoas — vulnerável a ausências e rotatividade');
    gaps.push('Retrabalho constante por falta de fonte única de verdade');
  } else if (answers.q1 === 'B') {
    gaps.push('Múltiplas versões da realidade coexistindo — sistema oficial e controles paralelos divergentes');
    gaps.push('Investimento em sistema jurídico não está sendo aproveitado em seu potencial');
  }

  // Q2 Gaps
  if (answers.q2 === 'A') {
    gaps.push('Incapacidade de responder perguntas básicas sobre a operação com dados');
    gaps.push('Liderança sem visibilidade real do que está acontecendo no escritório');
    gaps.push('Impossibilidade de identificar gargalos e oportunidades de melhoria');
  } else if (answers.q2 === 'B') {
    gaps.push('Dados usados apenas para explicar problemas passados, não para prevenir futuros');
    gaps.push('Ausência de rotina estruturada de análise e decisão');
  }

  // Q3 Gaps
  if (answers.q3 === 'A') {
    gaps.push('Advogados consumindo tempo significativo em tarefas que não exigem conhecimento jurídico');
    gaps.push('Custo invisível alto: profissionais caros fazendo trabalho de baixo valor');
    gaps.push('Erros recorrentes em tarefas repetitivas por fadiga e falta de padronização');
  } else if (answers.q3 === 'B') {
    gaps.push('Automações frágeis que dependem de pessoas específicas e falham silenciosamente');
    gaps.push('Risco de interrupção quando quem criou a automação não está disponível');
  }

  // Q4 Gaps
  if (answers.q4 === 'A') {
    gaps.push('Tecnologia vista como custo a minimizar, não investimento a otimizar');
    gaps.push('Ciclo vicioso: sem investimento → sem resultado → sem motivação para investir');
    gaps.push('Oportunidades de melhoria ignoradas por resistência cultural');
  } else if (answers.q4 === 'B') {
    gaps.push('Potencial de tecnologia como diferencial competitivo não explorado');
    gaps.push('Desconexão entre estratégia de negócio e investimentos em tecnologia');
  }

  return gaps;
}

/**
 * Get score description text
 */
export function getScoreDescription(score: ScoreResult): string {
  switch (score.score) {
    case 1:
      return 'O escritório está no início da jornada de maturidade tecnológica. A operação depende fortemente de processos manuais, memória das pessoas e controles informais. O potencial de ganho com organização e tecnologia é muito alto — pequenas mudanças podem gerar impacto significativo.';
    case 2:
      return 'Existem iniciativas de tecnologia, mas sem estrutura consistente. O escritório já deu alguns passos, mas há fragmentação e dependência de pessoas específicas. O momento é de consolidar o básico antes de avançar para o sofisticado.';
    case 3:
      return 'O escritório tem bases estabelecidas — sistemas em uso, alguns processos definidos, indicadores básicos. Ainda há espaço significativo para integração, automação e uso estratégico de dados. O desafio é passar do operacional para o estratégico.';
    case 4:
      return 'Boa maturidade tecnológica. O escritório já colhe benefícios de processos estruturados e decisões baseadas em dados. O foco agora é refinamento, integração avançada e exploração de tecnologias emergentes como diferencial competitivo.';
    case 5:
      return 'Maturidade avançada. Tecnologia é parte central da estratégia do escritório, não apenas suporte operacional. O momento é de inovação, liderança de mercado e exploração de fronteiras como IA e experiências digitais diferenciadas.';
    default:
      return '';
  }
}
