import { DateTime } from "luxon";

export const getTime = (unix: number) =>
    DateTime.fromSeconds(unix).setZone(process.env.TZ).toFormat("HH:mm");

export function getMoonIcon(phase: number) {
    if (phase < 2 / 9) return "🌒";
    if (phase < 3 / 9) return "🌓";
    if (phase < 4 / 9) return "🌔";
    if (phase < 5 / 9) return "🌕";
    if (phase < 6 / 9) return "🌖";
    if (phase < 7 / 9) return "🌗";
    return "🌘";
}
