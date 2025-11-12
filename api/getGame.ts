import axios from "axios";
import { getTwitchToken } from './getToken';

const IGDB_API_URL = "https://api.igdb.com/v4";

export async function getGameById(gameId: number) {
    const token = await getTwitchToken();

    const query = `
    fields 
      id,
      name,
      summary,
      storyline,
      category,
      cover.*,
      genres.*,
      keywords.*,
      game_modes.*,
      player_perspectives.*,
      themes.*,
      platforms.*,
      release_dates.*,
      screenshots.*,
      videos.*,
      websites.*,
      game_engines.*,
      similar_games.*,
      involved_companies.company.name,
      involved_companies.developer,
      involved_companies.publisher,
      age_ratings.*,
      artworks.*,
      collections.*,
      dlcs.*,
      franchises.*,
      expansions.*,
      language_supports.*,
      multiplayer_modes.*,
      alternative_names.*,
      ports.*,
      remakes.*,
      remasters.*,
      bundles.*,
      external_games.*,
      parent_game,
      version_parent;
    where id = ${gameId};
  `;

    const res = await axios.post(`${IGDB_API_URL}/games`, query, {
        headers: {
            "Client-ID": process.env.EXPO_PUBLIC_TWITCH_CLIENT_ID!,
            Authorization: `Bearer ${token}`,
            "Content-Type": "text/plain",
        },
    });

    console.log(res.data)
    return res.data;
}
