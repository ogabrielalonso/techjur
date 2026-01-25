import { Client } from '@notionhq/client';

// Initialize Notion client
let notionClient: Client | null = null;

export function getNotionClient(): Client {
  if (!notionClient) {
    const apiKey = process.env.NOTION_API_KEY;
    if (!apiKey) {
      throw new Error('NOTION_API_KEY is not configured');
    }
    notionClient = new Client({ auth: apiKey });
  }
  return notionClient;
}

// Database ID will be set after creation
let databaseId: string | null = null;

export function setDatabaseId(id: string) {
  databaseId = id;
}

export function getDatabaseId(): string | null {
  return databaseId || process.env.NOTION_DATABASE_ID || null;
}

// Types for diagnostic record in Notion
export interface NotionDiagnosticRecord {
  name: string;
  email: string;
  company: string;
  score: number;
  level: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  resultUrl: string;
}

/**
 * Create a new diagnostic record in Notion database
 */
export async function createDiagnosticInNotion(
  record: NotionDiagnosticRecord
): Promise<string | null> {
  const dbId = getDatabaseId();
  if (!dbId) {
    console.error('Notion database ID not configured');
    return null;
  }

  try {
    const notion = getNotionClient();

    // Note: In @notionhq/client v5.x, use data_source_id instead of database_id
    const response = await notion.pages.create({
      parent: { data_source_id: dbId, type: 'data_source_id' },
      properties: {
        'Nome': {
          title: [{ text: { content: record.name } }],
        },
        'Email': {
          email: record.email,
        },
        'Escritório': {
          rich_text: [{ text: { content: record.company } }],
        },
        'Score': {
          number: record.score,
        },
        'Nível': {
          select: { name: record.level },
        },
        'Q1': {
          select: { name: record.q1 },
        },
        'Q2': {
          select: { name: record.q2 },
        },
        'Q3': {
          select: { name: record.q3 },
        },
        'Q4': {
          select: { name: record.q4 },
        },
        'Link Resultado': {
          url: record.resultUrl,
        },
      },
    });

    return response.id;
  } catch (error) {
    console.error('Error creating record in Notion:', error);
    return null;
  }
}

// Helper to extract text from Notion properties
function getTitle(prop: unknown): string {
  const p = prop as { title?: { plain_text?: string }[] };
  return p?.title?.[0]?.plain_text || '';
}

function getRichText(prop: unknown): string {
  const p = prop as { rich_text?: { plain_text?: string }[] };
  return p?.rich_text?.[0]?.plain_text || '';
}

function getEmail(prop: unknown): string {
  const p = prop as { email?: string };
  return p?.email || '';
}

function getNumber(prop: unknown): number {
  const p = prop as { number?: number };
  return p?.number || 0;
}

function getSelect(prop: unknown): string {
  const p = prop as { select?: { name?: string } };
  return p?.select?.name || '';
}

function getUrl(prop: unknown): string {
  const p = prop as { url?: string };
  return p?.url || '';
}

function getCreatedTime(prop: unknown): string {
  const p = prop as { created_time?: string };
  return p?.created_time || new Date().toISOString();
}

// Simplified record for dashboard listing
export interface NotionDiagnosticListItem {
  id: string;
  notionId: string;
  clientName: string;
  clientEmail: string;
  companyName: string;
  score: number;
  level: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  resultUrl: string;
  createdAt: string;
}

/**
 * List all diagnostic records from Notion database (simplified for dashboard)
 */
export async function listDiagnosticsFromNotion(): Promise<NotionDiagnosticListItem[]> {
  const dbId = getDatabaseId();
  if (!dbId) {
    return [];
  }

  try {
    const notion = getNotionClient();

    // Note: In @notionhq/client v5.x, databases.query was renamed to dataSources.query
    const response = await notion.dataSources.query({
      data_source_id: dbId,
      sorts: [{ timestamp: 'created_time', direction: 'descending' }],
    });

    // Filter to only full page objects that have properties
    return response.results
      .filter((page): page is typeof page & { properties: Record<string, unknown>; created_time: string } =>
        'properties' in page && 'created_time' in page
      )
      .map((page) => {
        const props = page.properties;

        // Extract ID from result URL
        const resultUrl = getUrl(props['Link Resultado']);
        const idMatch = resultUrl.match(/\/resultado\/(.+)$/);
        const id = idMatch ? idMatch[1] : page.id;

        return {
          id,
          notionId: page.id,
          clientName: getTitle(props['Nome']),
          clientEmail: getEmail(props['Email']),
          companyName: getRichText(props['Escritório']),
          score: getNumber(props['Score']),
          level: getSelect(props['Nível']).toLowerCase(),
          q1: getSelect(props['Q1']),
          q2: getSelect(props['Q2']),
          q3: getSelect(props['Q3']),
          q4: getSelect(props['Q4']),
          resultUrl,
          createdAt: page.created_time || getCreatedTime(props['Data']),
        };
      });
  } catch (error) {
    console.error('Error listing records from Notion:', error);
    return [];
  }
}

/**
 * Get a single diagnostic record from Notion by ID
 */
export async function getDiagnosticFromNotion(diagnosticId: string): Promise<NotionDiagnosticListItem | null> {
  const dbId = getDatabaseId();
  if (!dbId) {
    return null;
  }

  try {
    const notion = getNotionClient();

    // Search for the record with matching result URL
    // Note: In @notionhq/client v5.x, databases.query was renamed to dataSources.query
    const response = await notion.dataSources.query({
      data_source_id: dbId,
      filter: {
        property: 'Link Resultado',
        url: {
          contains: diagnosticId,
        },
      },
    });

    // Filter to only full page objects that have properties
    const fullPages = response.results.filter(
      (page): page is typeof page & { properties: Record<string, unknown>; created_time: string } =>
        'properties' in page && 'created_time' in page
    );

    if (fullPages.length === 0) {
      return null;
    }

    const page = fullPages[0];
    const props = page.properties;

    return {
      id: diagnosticId,
      notionId: page.id,
      clientName: getTitle(props['Nome']),
      clientEmail: getEmail(props['Email']),
      companyName: getRichText(props['Escritório']),
      score: getNumber(props['Score']),
      level: getSelect(props['Nível']).toLowerCase(),
      q1: getSelect(props['Q1']),
      q2: getSelect(props['Q2']),
      q3: getSelect(props['Q3']),
      q4: getSelect(props['Q4']),
      resultUrl: getUrl(props['Link Resultado']),
      createdAt: page.created_time || getCreatedTime(props['Data']),
    };
  } catch (error) {
    console.error('Error getting record from Notion:', error);
    return null;
  }
}
