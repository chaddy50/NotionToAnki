import Notion from './interfaces/notion';
import NotionPage from './objects/notionPage';

async function createVocabularyCardsFromDatabase() {
	const database = await Notion.GetVocabularyDatabase();

	database.results.forEach(async (pageObject) => {
		const page = new NotionPage(pageObject);
		page.CreateCards();
	});
}

createVocabularyCardsFromDatabase();
