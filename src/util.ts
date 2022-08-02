export function getDate() {
    const dateObj = new Date();
    const year = dateObj.getFullYear();

    const monthNoZero = dateObj.getMonth() + 1;
    const month = monthNoZero < 10 ? "0" + monthNoZero : monthNoZero;

    const dateNoZero = dateObj.getDate();
    const date = dateNoZero < 10 ? "0" + dateNoZero : dateNoZero;

    const dayArray = ["일", "월", "화", "수", "목", "금", "토"];
    const day = dayArray[dateObj.getDay()];

    return `${year}-${month}-${date} (${day})`;
}

export function getTime(unix: number) {
    const date = new Date(unix * 1000);

    const hourNoZero = date.getHours();
    const hour = hourNoZero < 10 ? "0" + hourNoZero : hourNoZero;

    const minuteNoZero = date.getMinutes();
    const minute = minuteNoZero < 10 ? "0" + minuteNoZero : minuteNoZero;

    return `${hour}:${minute}`;
}

export function getMoonIcon(phase: number) {
    if (phase < 2 / 9) return "🌒";
    if (phase < 3 / 9) return "🌓";
    if (phase < 4 / 9) return "🌔";
    if (phase < 5 / 9) return "🌕";
    if (phase < 6 / 9) return "🌖";
    if (phase < 7 / 9) return "🌗";
    return "🌘";
}
