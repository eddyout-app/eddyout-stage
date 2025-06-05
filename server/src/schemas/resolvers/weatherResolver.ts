import { getWeatherForecast } from "../../utils/getWeatherForecast.js";

export const weatherResolvers = {
  Query: {
    weatherForecast: async (
      _: any,
      { lat, lon }: { lat: number; lon: number }
    ) => {
      const data = await getWeatherForecast(lat, lon);
      // Map or filter relevant results here
      return data.list.map(
        (item: {
          dt_txt: string;
          main: { temp: number };
          weather: { description: string }[];
        }) => ({
          date: item.dt_txt,
          temperature: item.main.temp,
          description: item.weather[0].description,
        })
      );
    },
  },
};
