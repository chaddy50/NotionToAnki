import { Client } from "@notionhq/client";
import { Page, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { createNewVocabularyCard } from "./anki";

const NOTION_KEY = "secret_aIE8wehUXTB6HNSgT0JAa2k65yp8Y7iDMqes7N0z8wu";
const VOCABULARY_ID = "9ab74f2d0f504a1f915601ef54fd4c0f";
const notion = new Client({ auth: NOTION_KEY });

export async function createVocabularyCardsFromDatabase() {
    const database = await getVocabularyDatabase();

    database.results.forEach(async page => {
        if (shouldCreateJapaneseCard(page)) {
            await createNewVocabularyCard("TestJapanese", getPropertyText(page, "English"), getPropertyText(page, "Hiragana"));
        }
        
        if (shouldCreateSpanishCard(page)) {
            await createNewVocabularyCard("TestSpanish", getPropertyText(page, "English"), getPropertyText(page, "Spanish"));
        }
    });
}

async function getVocabularyDatabase(): Promise<QueryDatabaseResponse> {
    const vocabularyDatabase = await notion.databases.query({
        database_id: VOCABULARY_ID,
    });
    return vocabularyDatabase;
}

function getPropertyText(page: Page, propertyName: string): string | undefined {
    const property = page.properties[propertyName];
    switch (property.type) {
        case 'title':
            return property.title[0]?.plain_text;
        case 'rich_text':
            return property.rich_text[0]?.plain_text;
        case 'select':
            return property.select?.name;
        default:
            return '';
    }
}

function shouldCreateJapaneseCard(page: any) {
    const hiragana = getPropertyText(page, "Hiragana");
    return hiragana && hiragana.length > 0;
}

function shouldCreateSpanishCard(page: any) {
    const spanish = getPropertyText(page, "Spanish");
    return  spanish && spanish.length > 0;
}