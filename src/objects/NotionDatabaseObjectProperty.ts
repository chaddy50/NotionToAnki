
export default interface NotionDatabaseObjectProperty
{
    id: string;
    name: string;
    type: PropertyType;
}

interface TitleProperty extends NotionDatabaseObjectProperty
{
    title: [{ plain_text: string }];
}

interface RichTextProperty extends NotionDatabaseObjectProperty
{
    rich_text: [{ plain_text: string }];
}

interface SelectProperty extends NotionDatabaseObjectProperty
{
    select: { name: string }
}

export enum PropertyType
{
    Checkbox = "checkbox",
    CreatedBy = "created_by",
    CreatedTime = "created_time",
    Date = "date",
    Email = "email",
    Files = "files",
    Formula = "formula",
    LastEditedBy = "last_edited_by",
    LastEditedTime = "last_edited_time",
    MultiSelect = "multi_select",
    Number = "number",
    People = "people",
    PhoneNumber = "phone_number",
    Relation = "relation",
    RichText = "rich_text",
    RollUp = "rollup",
    Select = "select",
    Status = "status",
    Title = "title",
    URL = "url"
}

export function GetValueFromProperty(property: NotionDatabaseObjectProperty): string
{
    switch (property.type)
    {
        case PropertyType.Title:
            return (property as TitleProperty).title[0]?.plain_text;
        case PropertyType.RichText:
            return (property as RichTextProperty).rich_text[0]?.plain_text;
        case PropertyType.Select:
            return (property as SelectProperty).select?.name;
        default:
            return "";
    }
}