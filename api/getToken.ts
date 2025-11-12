import AsyncStorage from "@react-native-async-storage/async-storage";

const TWITCH_TOKEN_URL = "https://id.twitch.tv/oauth2/token";
const CLIENT_ID = process.env.EXPO_PUBLIC_TWITCH_CLIENT_ID!;
const CLIENT_SECRET = process.env.EXPO_PUBLIC_TWITCH_CLIENT_SECRET!;

export async function getTwitchToken(): Promise<string> {
    const cached = await AsyncStorage.getItem("twitch_token");

    if (cached) {
        const { token, expiresAt } = JSON.parse(cached);
        if (Date.now() < expiresAt) {
            return token;
        }
    }

    const res = await fetch(TWITCH_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: "client_credentials",
        }).toString(),
    });

    console.log(res, CLIENT_ID, CLIENT_SECRET)
    if (!res.ok) {
        throw new Error("Не удалось получить токен Twitch");
    }

    const data = await res.json();
    const token = data.access_token;
    const expiresAt = Date.now() + data.expires_in * 1000 - 60_000; // за минуту до истечения

    await AsyncStorage.setItem("twitch_token", JSON.stringify({ token, expiresAt }));

    return token;
}
