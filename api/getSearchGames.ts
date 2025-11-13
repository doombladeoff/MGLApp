import axios from "axios";
import { getTwitchToken } from './getToken';

const IGDB_API_URL = "https://api.igdb.com/v4";

/***
 * @param [offset=0] - смещение в запросе
 * @param [limit=20] - ограничение получаемых элементов
 * @default 
 *  offset = 0
 *  limit = 20
 * @example await getSearchGames('query',page * limit, limit);
 */
export async function getSearchGames(search: string, offset: number = 0, limit: number = 20) {
  if (!search.trim()) return [];

  const token = await getTwitchToken();

  const query = `
    fields
      id,
      name,
      rating,
      rating_count,
      total_rating,
      total_rating_count,
      cover.url,
      first_release_date,
      genres.name;
    where name ~ "${search}"* & cover.url != null & first_release_date != null;
    sort total_rating_count desc;
    limit ${limit};
    offset ${offset};
  `;

  try {
    const res = await axios.post(`${IGDB_API_URL}/games`, query, {
      headers: {
        "Client-ID": process.env.EXPO_PUBLIC_TWITCH_CLIENT_ID!,
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
      },
    });

    const data = res.data.map((game: any) => ({
      ...game,
      releaseYear: new Date(game.first_release_date * 1000).getFullYear(),
    }));

    return data;
  } catch (err) {
    console.error("Ошибка поиска игр:", err);
    return [];
  }
}
