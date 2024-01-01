export default interface NotionDatabaseObjectProperty
{
    id: string;
    name: string;
    type: PropertyType;
    title: [{ plain_text: string }];
    rich_text: [{ plain_text: string }];
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
            return property.title[0].plain_text;
        case PropertyType.RichText:
            return property.rich_text[0].plain_text;
        case PropertyType.Select:
            return property.select.name;
        default:
            return "";
    }
}