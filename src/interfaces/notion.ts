import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const NOTION_KEY = "secret_aIE8wehUXTB6HNSgT0JAa2k65yp8Y7iDMqes7N0z8wu";
const VOCABULARY_ID = "9ab74f2d0f504a1f915601ef54fd4c0f";
const notion = new Client({ auth: NOTION_KEY });

export async function getVocabularyDatabase(): Promise<QueryDatabaseResponse> {
    const vocabularyDatabase = await notion.databases.query({
        database_id: VOCABULARY_ID,
    });
    return vocabularyDatabase;
}