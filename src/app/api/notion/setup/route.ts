import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

// Expected database schema
const expectedProperties = {
  'Nome': { title: {} },
  'Email': { email: {} },
  'Escritório': { rich_text: {} },
  'Score': { number: { format: 'number' } },
  'Nível': {
    select: {
      options: [
        { name: 'Iniciante', color: 'red' },
        { name: 'Intermediário', color: 'yellow' },
        { name: 'Avançado', color: 'green' },
      ],
    },
  },
  'Q1': {
    select: {
      options: [
        { name: 'A', color: 'red' },
        { name: 'B', color: 'orange' },
        { name: 'C', color: 'yellow' },
        { name: 'D', color: 'green' },
      ],
    },
  },
  'Q2': {
    select: {
      options: [
        { name: 'A', color: 'red' },
        { name: 'B', color: 'orange' },
        { name: 'C', color: 'yellow' },
        { name: 'D', color: 'green' },
      ],
    },
  },
  'Q3': {
    select: {
      options: [
        { name: 'A', color: 'red' },
        { name: 'B', color: 'orange' },
        { name: 'C', color: 'yellow' },
        { name: 'D', color: 'green' },
      ],
    },
  },
  'Q4': {
    select: {
      options: [
        { name: 'A', color: 'red' },
        { name: 'B', color: 'orange' },
        { name: 'C', color: 'yellow' },
        { name: 'D', color: 'green' },
      ],
    },
  },
  'Link Resultado': { url: {} },
  'Data': { created_time: {} },
};

export async function GET(request: NextRequest) {
  const apiKey = process.env.NOTION_API_KEY;
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: 'NOTION_API_KEY not configured' },
      { status: 500 }
    );
  }

  try {
    const notion = new Client({ auth: apiKey });

    // Check current database schema
    if (action === 'check') {
      const databaseId = process.env.NOTION_DATABASE_ID;
      if (!databaseId) {
        return NextResponse.json(
          { success: false, error: 'NOTION_DATABASE_ID not configured' },
          { status: 500 }
        );
      }

      const database = await notion.databases.retrieve({ database_id: databaseId });

      // Check if properties exist
      if (!('properties' in database) || !database.properties) {
        return NextResponse.json({
          success: false,
          error: 'Database does not have properties',
          databaseId,
          rawResponse: JSON.stringify(database),
        });
      }

      const currentProps = Object.keys(database.properties);
      const expectedProps = Object.keys(expectedProperties);
      const missingProps = expectedProps.filter(p => !currentProps.includes(p));

      return NextResponse.json({
        success: true,
        databaseId,
        currentProperties: currentProps,
        expectedProperties: expectedProps,
        missingProperties: missingProps,
        isComplete: missingProps.length === 0,
      });
    }

    // Search for pages the integration has access to
    const response = await notion.search({
      filter: { property: 'object', value: 'page' },
    });

    const pages = response.results.map((page: unknown) => {
      const p = page as { id: string; properties?: { title?: { title?: { plain_text?: string }[] } }; parent?: { type: string } };
      return {
        id: p.id,
        title: p.properties?.title?.title?.[0]?.plain_text || 'Sem título',
        type: p.parent?.type,
      };
    });

    return NextResponse.json({ success: true, pages });
  } catch (error) {
    console.error('Error with Notion API:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: 'Failed to access Notion', details: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.NOTION_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: 'NOTION_API_KEY not configured' },
      { status: 500 }
    );
  }

  try {
    const { pageId, action } = await request.json();

    const notion = new Client({ auth: apiKey });

    // Update existing database schema
    if (action === 'update') {
      const databaseId = process.env.NOTION_DATABASE_ID;
      if (!databaseId) {
        return NextResponse.json(
          { success: false, error: 'NOTION_DATABASE_ID not configured' },
          { status: 500 }
        );
      }

      // Update database with all expected properties
      // Note: Using type assertion because Notion SDK v5 types don't include properties
      await notion.databases.update({
        database_id: databaseId,
        properties: expectedProperties,
      } as Parameters<typeof notion.databases.update>[0]);

      return NextResponse.json({
        success: true,
        message: 'Database schema updated successfully!',
        databaseId,
      });
    }

    // Create new database
    if (!pageId) {
      return NextResponse.json(
        { success: false, error: 'pageId is required for creating a new database' },
        { status: 400 }
      );
    }

    // Create database in the specified page with explicit properties
    // Note: Using type assertion because Notion SDK v5 types don't include properties
    const database = await notion.databases.create({
      parent: { type: 'page_id', page_id: pageId },
      title: [{ text: { content: 'Diagnósticos TechJur' } }],
      properties: {
        'Nome': { title: {} },
        'Email': { email: {} },
        'Escritório': { rich_text: {} },
        'Score': { number: { format: 'number' } },
        'Nível': {
          select: {
            options: [
              { name: 'Iniciante', color: 'red' },
              { name: 'Intermediário', color: 'yellow' },
              { name: 'Avançado', color: 'green' },
            ],
          },
        },
        'Q1': {
          select: {
            options: [
              { name: 'A', color: 'red' },
              { name: 'B', color: 'orange' },
              { name: 'C', color: 'yellow' },
              { name: 'D', color: 'green' },
            ],
          },
        },
        'Q2': {
          select: {
            options: [
              { name: 'A', color: 'red' },
              { name: 'B', color: 'orange' },
              { name: 'C', color: 'yellow' },
              { name: 'D', color: 'green' },
            ],
          },
        },
        'Q3': {
          select: {
            options: [
              { name: 'A', color: 'red' },
              { name: 'B', color: 'orange' },
              { name: 'C', color: 'yellow' },
              { name: 'D', color: 'green' },
            ],
          },
        },
        'Q4': {
          select: {
            options: [
              { name: 'A', color: 'red' },
              { name: 'B', color: 'orange' },
              { name: 'C', color: 'yellow' },
              { name: 'D', color: 'green' },
            ],
          },
        },
        'Link Resultado': { url: {} },
        'Data': { created_time: {} },
      },
    } as Parameters<typeof notion.databases.create>[0]);

    return NextResponse.json({
      success: true,
      databaseId: database.id,
      message: 'Database created successfully! Add NOTION_DATABASE_ID to your .env.local',
    });
  } catch (error) {
    console.error('Error with Notion database:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: 'Failed to operate on database', details: errorMessage },
      { status: 500 }
    );
  }
}
