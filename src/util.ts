import { DateTime } from "luxon";

/** Get HH:mm format from unix timestamp */
export const unixToTime = (unix: number) =>
    DateTime.fromSeconds(unix).setZone(process.env.TZ).toFormat("HH:mm");

/** Get HH:mm format from JS Date object */
export const dateToTime = (date: Date) =>
    DateTime.fromJSDate(date).setZone(process.env.TZ).toFormat("HH:mm");

/** Get Moon Icon from phase (0 ~ 1) */
export function getMoonIcon(phase: number) {
    if (phase < 2 / 9) return "🌒";
    if (phase < 3 / 9) return "🌓";
    if (phase < 4 / 9) return "🌔";
    if (phase < 5 / 9) return "🌕";
    if (phase < 6 / 9) return "🌖";
    if (phase < 7 / 9) return "🌗";
    return "🌘";
}
