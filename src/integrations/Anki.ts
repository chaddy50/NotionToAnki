const ANKI_VERSION = 6;

export default class Anki
{
	public static async CreateNewVocabularyCard(
		deck: string,
		front: string | undefined,
		back: string | undefined
	): Promise<void>
	{
		const params = {
			note: {
				deckName: deck,
				modelName: 'Basic (and reversed card)',
				fields: {
					Front: front,
					Back: back,
				},
				options: {
					allowDuplicates: false,
					duplicateScope: 'deck',
				},
			},
		};
		await this.executeAnkiAction('addNote', params);
	}

	private static async executeAnkiAction(action: string, params = {}): Promise<void>
	{
		try
		{
			const response = await fetch("http://127.0.0.1:8765", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ action, version: ANKI_VERSION, params }),
			});

			const result = JSON.parse(await response.text());
			if (Object.getOwnPropertyNames(result).length != 2)
			{
				throw 'response has an unexpected number of fields';
			}
			if (!result.hasOwnProperty('error'))
			{
				throw 'response is missing required error field';
			}
			if (!result.hasOwnProperty('result'))
			{
				throw 'response is missing required result field';
			}
			if (result.error)
			{
				throw result.error;
			}
		}
		catch (e)
		{
			console.error(e);
		}
	}
}
