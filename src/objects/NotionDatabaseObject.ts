import Anki from '../integrations/Anki';
import NotionDatabaseObjectProperty, { GetValueFromProperty } from './NotionDatabaseObjectProperty';

//#region Constants
const SPANISH_DECK = 'TestSpanish';
const JAPANESE_DECK = 'TestJapanese';
//#endregion

export default class NotionDatabaseObject
{
	//#region Private Properties
	private _object!: RawNotionDatabaseObject;
	//#endregion

	//#region Constructors
	constructor(object: any)
	{
		this._object = object;
	}
	//#endregion

	//#region Properties
	public get language(): string
	{
		return GetValueFromProperty(this._object.properties["Language"]);
	}

	public get english(): string
	{
		return GetValueFromProperty(this._object.properties["English"]);
	}

	private get spanish(): string
	{
		return GetValueFromProperty(this._object.properties['Spanish']);
	}

	private get kana(): string
	{
		return GetValueFromProperty(this._object.properties["Kana"]);
	}

	private get partOfSpeech(): string
	{
		return GetValueFromProperty(this._object.properties['Part of Speech'])
	}
	//#endregion

	//#region Private Methods
	private shouldCreateKanaCard(): boolean
	{
		return this.language === "Japanese"
			&& this.kana?.length > 0;
	}

	private shouldCreateSpanishCard(): boolean
	{
		return this.language === "Spanish"
			&& this.spanish?.length > 0;
	}

	private async createSpanishCard(): Promise<void>
	{
		await Anki.CreateNewVocabularyCard(
			this.getDeck(SPANISH_DECK),
			this.english,
			this.spanish
		);
	}

	private async createKanaCard(): Promise<void>
	{
		await Anki.CreateNewVocabularyCard(
			this.getDeck(JAPANESE_DECK),
			this.english,
			this.kana
		);
	}

	private getDeck(topDeck: string): string
	{
		return topDeck + this.getSubdeck();
	}

	private getSubdeck(): string
	{
		if (this.partOfSpeech && this.partOfSpeech.length > 0)
		{
			return '::Vocabulary::' + this.partOfSpeech + 's';
		}
		return '';
	}
	//#endregion

	//#region Public Methods
	public async CreateCards(): Promise<void>
	{
		if (this.shouldCreateKanaCard())
		{
			await this.createKanaCard();
		}

		if (this.shouldCreateSpanishCard())
		{
			await this.createSpanishCard();
		}
	}
	//#endregion
}

export interface RawNotionDatabaseObject
{
	properties: {
		Book: NotionDatabaseObjectProperty,
		Kana: NotionDatabaseObjectProperty,
		Katakana: NotionDatabaseObjectProperty,
		Language: NotionDatabaseObjectProperty,
		"Part of Speech": NotionDatabaseObjectProperty,
		Chapter: NotionDatabaseObjectProperty,
		Spanish: NotionDatabaseObjectProperty,
		Kanji: NotionDatabaseObjectProperty,
		English: NotionDatabaseObjectProperty,
	};
}