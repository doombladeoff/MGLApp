import axios from "axios";
import { getTwitchToken } from './getToken';

const IGDB_API_URL = "https://api.igdb.com/v4";

export async function getGameById(gameId: number) {
    const token = await getTwitchToken();

    const query = `
    fields
      name,
      summary,
      cover.url,
      genres.name,
      platforms.name,
      game_modes.name,
      player_perspectives.name,
      release_dates.human,
      screenshots.url,
      screenshots.height,
      screenshots.width,
      screenshots.animated,
      screenshots.checksum,
      themes.name,
      keywords.name,
      game_engines.name;
    where id = ${gameId};
  `;

    const res = await axios.post(`${IGDB_API_URL}/games`, query, {
        headers: {
            "Client-ID": process.env.EXPO_PUBLIC_TWITCH_CLIENT_ID!,
            Authorization: `Bearer ${token}`,
            "Content-Type": "text/plain",
        },
    });

    return res.data;
}
