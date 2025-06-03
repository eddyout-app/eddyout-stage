import fetch from "node-fetch";

export async function getWeatherForecast(lat: number, lon: number, date?: string) {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}
