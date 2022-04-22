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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVocabularyDatabase = void 0;
const client_1 = require("@notionhq/client");
const NOTION_KEY = "secret_aIE8wehUXTB6HNSgT0JAa2k65yp8Y7iDMqes7N0z8wu";
const VOCABULARY_ID = "9ab74f2d0f504a1f915601ef54fd4c0f";
const notion = new client_1.Client({ auth: NOTION_KEY });
function getVocabularyDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const vocabularyDatabase = yield notion.databases.query({
            database_id: VOCABULARY_ID,
        });
        return vocabularyDatabase;
    });
}
exports.getVocabularyDatabase = getVocabularyDatabase;
