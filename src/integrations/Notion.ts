import { Client } from '@notionhq/client';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

const NOTION_KEY = 'secret_aIE8wehUXTB6HNSgT0JAa2k65yp8Y7iDMqes7N0z8wu';
const VOCABULARY_ID = '1835d21a5481456e94b8e52cc16c54da';
const notion = new Client({ auth: NOTION_KEY });

export default class Notion
{
	public static async GetVocabularyDatabase(): Promise<QueryDatabaseResponse>
	{
		const vocabularyDatabase = await notion.databases.query({
			database_id: VOCABULARY_ID,
		});
		return vocabularyDatabase;
	}
}
