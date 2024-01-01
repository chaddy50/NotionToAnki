import Notion from './integrations/Notion';
import NotionDatabaseObject from './objects/NotionDatabaseObject';

async function createVocabularyCardsFromDatabase(): Promise<void>
{
	const database = await Notion.GetVocabularyDatabase();

	database.results.forEach(async (_object) =>
	{
		const notionDatabaseObject = new NotionDatabaseObject(_object);
		notionDatabaseObject.CreateCards();
	});
}

createVocabularyCardsFromDatabase();
