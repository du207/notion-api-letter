import weather_data from "./weather_data";

export type Weather = {
    id: keyof typeof weather_data;
    main: string;
    description: string;
    icon: string;
};

export type Time = {
    dt: number;
    weather: Weather[];
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
    };
};

export type DailyAPIType = {
    list: Time[];
    city: {
        sunrise: number;
        sunset: number;
    };
};
