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
const anki_1 = require("../interfaces/anki");
class NotionPage {
    //#region Constructors
    constructor(page) {
        this._page = page;
    }
    //#endregion
    //#region Getters
    get english() {
        return this._page.properties["English"].title[0].plain_text;
    }
    get spanish() {
        var _a;
        return (_a = this._page.properties["Spanish"].rich_text[0]) === null || _a === void 0 ? void 0 : _a.plain_text;
    }
    get hiragana() {
        var _a;
        return (_a = this._page.properties["Hiragana"].rich_text[0]) === null || _a === void 0 ? void 0 : _a.plain_text;
    }
    //#endregion
    shouldCreateHiraganaCard() {
        return this.hiragana && this.hiragana.length > 0;
    }
    shouldCreateSpanishCard() {
        return this.spanish && this.spanish.length > 0;
    }
    createSpanishCard() {
        return __awaiter(this, void 0, void 0, function* () {
            (0, anki_1.createNewVocabularyCard)("TestSpanish", this.english, this.spanish);
        });
    }
    createHiraganaCard() {
        return __awaiter(this, void 0, void 0, function* () {
            (0, anki_1.createNewVocabularyCard)("TestJapanese", this.english, this.hiragana);
        });
    }
}
exports.default = NotionPage;
