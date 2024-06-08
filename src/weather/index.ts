import fetch from "node-fetch";
import Suncalc from "suncalc";

import weather_data from "./weather_data";
import { DailyAPIType } from "./weatherType";
import { dateToTime, getMoonIcon, unixToTime } from "../util";

export default async function (lat: number, lon: number) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.OPENWEATHERMAP_API_KEY}&lat=${lat}&lon=${lon}&lang=kr&units=metric`
    );

    if (res.status >= 400 && res.status < 600)
        throw new Error(`OpenWeatherMap API Error: ${res.status}`);

    const data = (await res.json()) as DailyAPIType;

    const { weather } = data.list[0];
    const { sunrise, sunset } = data.city;

    // The Response list has weather per 3 hours
    // Get Max and Min temp for 24 hours
    const tempList = data.list.slice(0, 8).map((time) => Math.round(time.main.temp));
    const [temp_min, temp_max] = [Math.min(...tempList), Math.max(...tempList)];

    // Moon Data
    const { phase } = Suncalc.getMoonIllumination(new Date());
    const { rise: moonrise, set: moonset } = Suncalc.getMoonTimes(new Date(), lat, lon);

    return {
        weather: `날씨: ${weather_data[weather[0].id]} (${temp_min}°C ~ ${temp_max}°C)`,
        sun: `☀️ 일출: ${unixToTime(sunrise)} 일몰: ${unixToTime(sunset)}`,
        moon: `${getMoonIcon(phase)} 월출: ${dateToTime(moonrise)} 월몰: ${dateToTime(moonset)}`,
    };
}
