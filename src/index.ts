import "dotenv/config";

import { Client } from "@notionhq/client";
import getConfig, { ConfigType } from "./config.js";
import getWeather from "./weather/index.js";
import getFeeds from "./feeds.js";
import updateXkcd from "./xkcd.js";
import { DateTime } from "luxon";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const makeQuote = async (config: ConfigType) => {
    const lat = Number(config["lat"]) ?? 37.53;
    const lon = Number(config["lon"]) ?? 127.02;

    const { weather, sun, moon } = await getWeather(lat, lon);
    const rssObjs = await getFeeds(JSON.parse(config["rss"]));

    const date = DateTime.now()
        .setZone(process.env.TZ)
        .setLocale("ko")
        .toFormat("yyyy-LL-dd (ccc)");

    return [
        {
            text: {
                content: `📅 ${date}\n`,
            },
            annotations: {
                bold: true,
            },
        },
        {
            text: {
                content: `${weather}\n${sun}\n${moon}\n`,
            },
        },
        ...rssObjs,
        {
            text: {
                content: "\n\nRecent Xkcd",
            },
            annotations: {
                bold: true,
            },
        },
    ];
};

const updateQuote = async () => {
    try {
        const config = await getConfig(notion);
        const quote = await makeQuote(config);

        await notion.blocks.update({
            block_id: process.env.QUOTE_BLOCK_ID!,
            quote: {
                rich_text: quote,
            },
        });

        // Unfortunately, we should update the image individually
        await updateXkcd(notion);

        console.log("Updated!");
    } catch (err) {
        console.error(err);
    }
};

updateQuote();
