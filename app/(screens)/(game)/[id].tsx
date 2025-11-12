import { getGameById } from "@/api/getGame";
import { Image } from 'expo-image';
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

export default function GameScreen() {
    const { id: gameId } = useLocalSearchParams<{ id: string }>();
    const [game, setGame] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const data = await getGameById(Number(gameId));
            setGame(data[0]);
        })();
    }, [gameId]);

    const screenshots = game?.screenshots?.map((s: any) => {
        return s.url.replace("t_thumb", "t_screenshot_big");
    });

    if (!game || !screenshots) return null;

    return (
        <ScrollView
            contentInsetAdjustmentBehavior='automatic'
            contentContainerStyle={{ paddingHorizontal: 12 }}
        >
            {screenshots?.slice(0, 3).map((img, index) => (
                <Image
                    key={index}
                    source={{ uri: `https:${img}` }}
                    style={{ width: 280, height: 140, marginVertical: 20, backgroundColor: 'red' }}
                    contentFit='cover'
                />
            ))}
            <Text style={{ color: 'white' }}>{game.name}</Text>
            <Text style={{ color: 'white' }}>{game.summary}</Text>
            <Text style={{ color: 'white' }}>Genres: {game.genres?.map(g => g.name).join(", ")}</Text>
            <Text style={{ color: 'white' }}>Platforms: {game.platforms?.map(p => p.name).join(", ")}</Text>
        </ScrollView>
    );
};