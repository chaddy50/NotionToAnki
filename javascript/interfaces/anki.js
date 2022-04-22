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
exports.createNewVocabularyCard = void 0;
const xmlhttprequest_ts_1 = require("xmlhttprequest-ts");
const ANKI_VERSION = 6;
function createNewVocabularyCard(deck, front, back) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            note: {
                "deckName": deck,
                "modelName": "Basic (and reversed card)",
                "fields": {
                    "Front": front,
                    "Back": back
                },
                "options": {
                    "allowDuplicates": false,
                    "duplicateScope": "deck"
                }
            }
        };
        yield executeAnkiAction("addNote", params);
    });
}
exports.createNewVocabularyCard = createNewVocabularyCard;
function executeAnkiAction(action, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const xhr = new xmlhttprequest_ts_1.XMLHttpRequest();
        xhr.addEventListener('error', () => Promise.reject('failed to issue request'));
        xhr.addEventListener('load', () => {
            try {
                const response = JSON.parse(xhr.responseText);
                if (typeof response == "object") {
                    if (Object.getOwnPropertyNames(response).length != 2) {
                        throw 'response has an unexpected number of fields';
                    }
                    if (!response.hasOwnProperty('error')) {
                        throw 'response is missing required error field';
                    }
                    if (!response.hasOwnProperty('result')) {
                        throw 'response is missing required result field';
                    }
                    if (response.error) {
                        throw response.error;
                    }
                    Promise.resolve(response.result);
                }
            }
            catch (e) {
                console.log(params.note.fields.Front + ": " + e);
                if (e != "cannot create note because it is a duplicate") {
                    Promise.reject(e);
                }
                else {
                    Promise.resolve(e);
                }
            }
        });
        xhr.open('POST', 'http://127.0.0.1:8765');
        xhr.send(JSON.stringify({ action, ANKI_VERSION, params }));
    });
}
