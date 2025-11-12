import axios from "axios";
import { getTwitchToken } from "./getToken";

export async function getNewReleases() {
    const token = await getTwitchToken();
    const now = Math.floor(Date.now() / 1000);
    const twoDaysAgo = now - 2 * 24 * 60 * 60;

    const query = `
    fields 
      name, 
      first_release_date, 
      cover.url, 
      genres.name;
    where first_release_date >= ${twoDaysAgo}
      & first_release_date <= ${now}
      & cover != null;
    sort first_release_date desc;
    limit 25;
  `;

    const res = await axios.post("https://api.igdb.com/v4/games", query, {
        headers: {
            "Client-ID": process.env.EXPO_PUBLIC_TWITCH_CLIENT_ID!,
            Authorization: `Bearer ${token}`,
            "Content-Type": "text/plain",
        },
    });

    return res.data;
};
