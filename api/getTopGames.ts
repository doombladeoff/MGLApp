import axios from "axios";
import { getTwitchToken } from './getToken';

const IGDB_API_URL = "https://api.igdb.com/v4";

export async function getTopGames() {
    const token = await getTwitchToken();

    const query = `
    fields 
    name,
    cover.*,
    screenshots.*,
    genres.*,
    rating,
    rating_count,
    total_rating,
    total_rating_count; 

    sort total_rating_count desc; 
    limit 15;
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
