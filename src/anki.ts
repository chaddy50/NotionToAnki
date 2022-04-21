import { XMLHttpRequest } from "xmlhttprequest-ts";
const ANKI_VERSION = 6;

export async function createNewVocabularyCard(deck: any, front: string | undefined, back: string | undefined) {
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
    }
    return await executeAnkiAction("addNote", params);
}

async function executeAnkiAction(action: string, params: any) {
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
            } catch (e) {
                console.log(params.note.fields.Front + ": " + e);
                if (e != "cannot create note because it is a duplicate") {
                    reject(e);
                }
                else {
                    resolve(e);
                }
            }
        });

        xhr.open('POST', 'http://127.0.0.1:8765');
        xhr.send(JSON.stringify({action, ANKI_VERSION, params}));
    });
}