"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const XMLHttpRequest = __importStar(require("xmlhttprequest"));
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
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.addEventListener('error', () => reject('failed to issue request'));
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
                        resolve(response.result);
                    }
                }
                catch (e) {
                    console.log(params.note.fields.Front + ": " + e);
                }
            });
            xhr.open('POST', 'http://127.0.0.1:8765');
            xhr.send(JSON.stringify({ action, ANKI_VERSION, params }));
        });
    });
}
