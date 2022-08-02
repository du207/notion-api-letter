import fetch from "node-fetch";
import weather_data from "./weather_data";
import { OneCallAPIType } from "./weatherType";
import { getMoonIcon, getTime } from "../util";

export default async function (lat: number, lon: number) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?appid=${process.env.OPENWEATHERMAP_API_KEY}&exclude=current,minutely,hourly,alerts&lat=${lat}&lon=${lon}&lang=kr&units=metric`
    );

    if (res.status >= 400 && res.status < 600)
        throw new Error(`OpenWeatherMap API Error: ${res.status}`);

    const data = (await res.json()) as OneCallAPIType;

    const { weather, temp, sunrise, sunset, moonrise, moonset, moon_phase } = data.daily[0];

    return {
        weather: `날씨: ${weather_data[weather[0].id]} (${temp.min}°C ~ ${temp.max}°C)`,
        sun: `☀️ 일출: ${getTime(sunrise)} 일몰: ${getTime(sunset)}`,
        moon: `${getMoonIcon(moon_phase)} 월출: ${getTime(moonrise)} 월몰: ${getTime(moonset)}`,
    };
}
