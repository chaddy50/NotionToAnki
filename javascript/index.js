"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notion_1 = require("./interfaces/notion");
const notionPage_1 = __importDefault(require("./objects/notionPage"));
function createVocabularyCardsFromDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const database = yield (0, notion_1.getVocabularyDatabase)();
        database.results.forEach((pageObject) => __awaiter(this, void 0, void 0, function* () {
            const page = new notionPage_1.default(pageObject);
            // if (page.shouldCreateHiraganaCard()) {
            //     page.createHiraganaCard();
            // }
            if (page.shouldCreateSpanishCard()) {
                page.createSpanishCard();
            }
        }));
    });
}
createVocabularyCardsFromDatabase();
