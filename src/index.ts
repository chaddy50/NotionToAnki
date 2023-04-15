import { getVocabularyDatabase } from './interfaces/notion';
import NotionPage from './objects/notionPage';

async function createVocabularyCardsFromDatabase() {
	const database = await getVocabularyDatabase();

	database.results.forEach(async (pageObject) => {
		const page = new NotionPage(pageObject);
		page.createCards();
	});
}

createVocabularyCardsFromDatabase();
