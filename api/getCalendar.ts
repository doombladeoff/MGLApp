import axios from "axios";
import { getTwitchToken } from "./getToken";

const IGDB_API_URL = "https://api.igdb.com/v4";

export async function getCalendar(offset = 0, date: any) {
    const token = await getTwitchToken();

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const startOfDay = Math.floor(start.getTime() / 1000);
    const endOfDay = Math.floor(end.getTime() / 1000);

    const query = `
    fields 
      id,
      name,
      category,
      first_release_date,
      platforms.*, 
      cover.url,
      genres.name,
      release_dates.human,
      release_dates.y,
      age_ratings,
      total_rating,
      total_rating_count;
    where 
      first_release_date >= ${startOfDay} &
      first_release_date <= ${endOfDay} &
      cover.url != null &
    platforms = (3,14,6,167,48,169,163,130,508,49) &
    age_ratings != (6,7,8);
    sort first_release_date asc;
    limit 500;
    offset ${offset};
  `;

    try {
        const res = await axios.post(
            `${IGDB_API_URL}/games`,
            query,
            {
                headers: {
                    "Client-ID": process.env.EXPO_PUBLIC_TWITCH_CLIENT_ID!,
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "text/plain",
                },
            }
        );

        return res.data.map((game: any) => ({
            ...game,
            releaseDate: new Date(game.first_release_date * 1000),
        }));

    } catch (error: any) {
        console.error("Ошибка:", error);
        return [];
    }
};
