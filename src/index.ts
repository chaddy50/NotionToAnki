import { execFile } from "child_process";
import { getVocabularyDatabase } from "./interfaces/notion";
import NotionPage from "./objects/notionPage";

const ANKI_FILE_PATH = "C:\\Program Files\\Anki\\anki.exe";

async function makeSureAnkiIsRunning(): Promise<void> {
    execFile("C:\\Files\\Development\\Projects\\Notion to Anki\\src\\startAnki.bat", (error) => {
        console.log("error: " + error);
    });
}

async function createVocabularyCardsFromDatabase() {
    const database = await getVocabularyDatabase();

    database.results.forEach(async pageObject => {
        const page = new NotionPage(pageObject);
        page.createCards();
    });
}

async function doTheStuff() {
    makeSureAnkiIsRunning();
    createVocabularyCardsFromDatabase();
}

doTheStuff();