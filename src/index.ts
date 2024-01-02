import Notion from './integrations/Notion';
import NotionDatabaseObject from './objects/NotionDatabaseObject';

async function createVocabularyCardsFromDatabase(): Promise<void>
{
	const database = await Notion.GetVocabularyDatabase();

	for (const _object of database.results)
	{
		const notionDatabaseObject = new NotionDatabaseObject(_object);
		await notionDatabaseObject.CreateCards();
	};
}

createVocabularyCardsFromDatabase();
