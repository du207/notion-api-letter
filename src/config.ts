import { Client, isFullPage } from "@notionhq/client";

export type ConfigType = Record<string, string>;

type TitlePropertyRequest = {
    results: Array<{ title: { plain_text: string } }>;
};

type RichTextPropertyRequest = {
    results: Array<{ rich_text: { plain_text: string } }>;
};

export default async function getConfig(notion: Client): Promise<ConfigType> {
    const res = await notion.databases.query({
        database_id: process.env.CONFIG_DATABASE_ID!,
    });

    const getPropety = async (p: string) =>
        Promise.all(
            res.results.map(
                (item) =>
                    isFullPage(item) &&
                    notion.pages.properties.retrieve({
                        page_id: item.id,
                        property_id: item.properties[p].id,
                    })
            )
        );

    const names = (await getPropety("이름")) as TitlePropertyRequest[];
    const values = (await getPropety("값")) as RichTextPropertyRequest[];

    return names.reduce(
        (prev, curr, i) => ({
            ...prev,
            [curr.results[0].title.plain_text]: values[i].results[0].rich_text.plain_text,
        }),
        {}
    );
}
