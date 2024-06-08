import { Client, isFullBlock } from "@notionhq/client";
import fetch from "node-fetch";

/** Get xkcd image url and update the child block in the quote */
export default async function updateXkcd(notion: Client) {
    const res = await fetch("https://xkcd.com/info.0.json");
    const data = (await res.json()) as { img: string };
    const imageURL = data.img;

    const quoteChildren = await notion.blocks.children.list({
        block_id: process.env.QUOTE_BLOCK_ID!,
    });

    const quoteChild = quoteChildren.results[0];

    if (!isFullBlock(quoteChild)) throw new Error("Please make children block!");

    await notion.blocks.update({
        block_id: quoteChild.id,
        image: {
            external: {
                url: imageURL,
            },
        },
    });

    console.log("Xkcd Updated!");
}
