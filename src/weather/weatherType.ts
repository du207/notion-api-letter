import weather_data from "./weather_data";

export type Weather = {
    id: keyof typeof weather_data;
    main: string;
    description: string;
    icon: string;
};

export type Daily = {
    weather: Weather[];
    temp: {
        min: number;
        max: number;
    };
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
};

export type OneCallAPIType = {
    daily: Daily[];
};
