import fetch from "node-fetch";
import { load } from "cheerio";

export type RSSConfigType = {
    urls: string[];
};

type RichTextType = {
    text: {
        content: string;
        link?: {
            url: string;
        };
    };
    annotations?: {
        bold: boolean;
    };
};

const getRSS = async (url: string): Promise<RichTextType[]> => {
    const res = await fetch(url);
    const html = await res.text();

    const $ = load(html, { xmlMode: true });

    const feedTitle = $("channel > title").text();

    const titles = $("item > title")
        .map((i, el) => $(el).text())
        .get()
        .slice(0, 5);

    const links = $("item > link")
        .map((i, el) => $(el).text())
        .get()
        .slice(0, 5);

    const notionObjs = Array(3)
        .fill("")
        .map((_, i) => ({
            text: {
                content: `${titles[i]}\n`,
                link: {
                    url: links[i],
                },
            },
        }));

    return [
        {
            text: {
                content: `\n${feedTitle}\n`,
            },
            annotations: {
                bold: true,
            },
        },
        ...notionObjs,
    ];
};

export default async function getFeeds(config: RSSConfigType) {
    return (await Promise.all(config.urls.map((url) => getRSS(url)))).flat(1);
}
