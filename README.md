# Notion to Anki
This project uses a combination of [AnkiConnect](https://foosoft.net/projects/anki-connect/) and [Notion API](https://developers.notion.com/).

**Anki must be runnning in order for this script to work!**

**As-is, this script requires very specific configuration to access the correct database in Notion. I have plans to make this configurable in the future, but for now it's all hard-coded. Change constants in Notion.ts to match your Notion configuration.**

## To Run
1. Make sure you have [NodeJS](https://nodejs.org/en) installed.
2. Make sure you have [Anki](https://apps.ankiweb.net/) installed, and have added the [AnkiConnect](https://foosoft.net/projects/anki-connect/) add on to it.
3. Make sure Anki is running on your computer
4. Clone the repo and navigate to the NotionToAnki folder
5. Execute the script by running:
``` typescript
npm run dev
```
