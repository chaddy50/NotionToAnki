import { createNewVocabularyCard } from "../interfaces/anki";

export default class NotionPage {
    //#region Private Properties
    private _page!: any;
    //#endregion

    //#region Constructors
    constructor(page: any) {
        this._page = page;
    }
    //#endregion

    //#region Properties
    public get english() {
        return this._page.properties["English"].title[0].plain_text;
    }

    private get spanish() {
        return this._page.properties["Spanish"].rich_text[0]?.plain_text;
    }

    private get hiragana() {
        return this._page.properties["Hiragana"].rich_text[0]?.plain_text;
    }

    private get type() {
        return this._page.properties["Type"].select.name;
    }
    //#endregion

    //#region Private Methods
    private shouldCreateHiraganaCard(): boolean {
        return this.hiragana && this.hiragana.length > 0;
    }

    private shouldCreateSpanishCard(): boolean {
        return this.spanish && this.spanish.length > 0;
    }

    private async createSpanishCard(): Promise<void> {
        createNewVocabularyCard(this.getDeck("TestSpanish"), this.english, this.spanish);
    }

    private async createHiraganaCard(): Promise<void> {
        createNewVocabularyCard(this.getDeck("TestJapanese"), this.english, this.hiragana);
    }

    private getDeck(topDeck: string) {
        return topDeck + this.getSubdeck();
    }

    private getSubdeck(): string {
        if (this.type && this.type.length > 0) {
            return "::Vocabulary::" + this.type + "s";
        }
        return "";
    }
    //#endregion

    //#region Public Methods
    public async createCards(): Promise<void> {
        if (this.shouldCreateHiraganaCard()) {
            await this.createHiraganaCard();
        }

        if (this.shouldCreateSpanishCard()) {
            await this.createSpanishCard();
        }
    }
    //#endregion
}