import { getGameById } from "@/api/getGame";
import { useSupabase } from "@/app/providers/SupabaseProvider";
import { GameDataDB, GameStatus, GameUsersStatus } from "@/app/types/GameTypes";
import { ScreenshotsList } from "@/components/game/ScreenshotsList";
import { UserRatingCard } from "@/components/game/UserRatingCard";
import { UsersCompleteStatus } from "@/components/game/UsersCompleteStatus";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { GameGenres } from "@/constants/genres";
import { useUser } from "@clerk/clerk-expo";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, ScrollView, Text, View } from "react-native";

const { width } = Dimensions.get("screen");

export type GameDataUserDB = {
    created_at: string
    game_id: string
    id: number
    rating: number
    review: string
    status: GameStatus
    updated_at: string
    user_id: string
};

export default function GameScreen() {
    const { id: gameId } = useLocalSearchParams<{ id: string }>();
    const [game, setGame] = useState<any>(null);
    const [gameDataDB, setGameDataDB] = useState<GameDataDB>();
    const [gameDataUserDB, setGameDataUserDB] = useState<GameDataUserDB>();
    const [gameUsersStatus, setGameUserStatus] = useState<GameUsersStatus[] | undefined>([]);

    const { user } = useUser();

    const supabase = useSupabase();

    const getData = async () => {
        const data = await getGameById(Number(gameId));
        return data[0];
    };

    const fetchGameData = async () => {
        const { data, error } = await supabase
            .from('games')
            .select('*')
            .eq('id', gameId);

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            console.log('GameData:', data);
            return data[0];
        }
    };

    const fetchGameDataByUser = async () => {
        const { data, error } = await supabase
            .from('user_game_reviews')
            .select('*')
            .eq('game_id', gameId)
            .eq('user_id', user?.id);
        if (error) {
            Alert.alert('Error', error.message);
        } else {
            console.log('[Rating] GameUserData:', data);
            return data[0];
        }
    };

    const getGameStatusCounts = async () => {
        const { data, error } = await supabase
            .from("user_game_reviews")
            .select("status")
            .eq("game_id", gameId);

        if (error) {
            console.error("Ошибка получения данных:", error);
            return;
        }

        const counts: any = {
            finished: 0,
            playing: 0,
            want: 0,
            dropped: 0,
        };

        data.forEach(item => {
            if (item.status in counts) {
                counts[item.status] += 1;
            }
        });

        const result: GameUsersStatus[] = [
            { label: "Пройдено", value: counts.finished, icon: 'flag' },
            { label: "Играю", value: counts.playing, icon: 'gamepad' },
            { label: "Хочу", value: counts.want, icon: 'stars' },
            { label: "Брошено", value: counts.dropped, icon: 'skull' },
        ];

        return result;
    };

    useEffect(() => {
        const load = async () => {
            const [gameData, gameDataDB, gameUserDataDB, getGameUserStatus] = await Promise.all([
                getData(),
                fetchGameData(),
                fetchGameDataByUser(),
                getGameStatusCounts(),
            ]);

            setGame(gameData);
            setGameDataDB(gameDataDB);
            setGameDataUserDB(gameUserDataDB);
            setGameUserStatus(getGameUserStatus)
        };

        load();
    }, [gameId]);

    if (!game) return null;

    const cover = game?.cover?.url?.replace("t_thumb", "t_cover_big");

    const screenshots = game?.screenshots?.map((s: any) =>
        s.url.replace("t_thumb", "t_screenshot_big")
    );
    const randomScreenshot =
        screenshots?.length > 0
            ? screenshots[Math.floor(Math.random() * screenshots.length)]
            : null;

    const developers = game?.involved_companies
        ?.filter((el: any) => el.developer)
        ?.map((el: any) => el.company.name)
        ?.join(", ");

    const publishers = game?.involved_companies
        ?.filter((el: any) => el.publisher)
        ?.map((el: any) => el.company.name)
        ?.join(", ");

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 12,
                    paddingBottom: 40,
                    backgroundColor: "black",
                    paddingTop: 170

                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ position: 'absolute', zIndex: 0, width: '100%', height: 220 }}>
                    <LinearGradient
                        colors={["transparent", "black"]}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            width,
                            height: 140,
                            zIndex: 999
                        }}
                    />
                    <Image
                        source={{ uri: randomScreenshot ? `https:${randomScreenshot}` : undefined }}
                        style={{ width, height: 220, position: 'absolute', top: 0, zIndex: 1 }}
                        contentFit="cover"
                        transition={500}
                    />
                </View>

                <View>
                    <View
                        style={{
                            shadowColor: "white",
                            shadowOpacity: 0.25,
                            shadowRadius: 8,
                            shadowOffset: { width: 0, height: 0 },
                        }}
                    >
                        <BlurView
                            intensity={30}
                            style={{
                                width: width - 24,
                                height: 140,
                                overflow: "hidden",
                                borderRadius: 20,
                            }}
                        >
                            <View
                                style={{
                                    padding: 10,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 12,
                                }}
                            >
                                {cover && (
                                    <Image
                                        source={{ uri: `https:${cover}` }}
                                        style={{ width: 90, height: 120, borderRadius: 12 }}
                                        contentFit="cover"
                                        transition={500}
                                    />
                                )}

                                <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                                    <View style={{ flexDirection: "row", alignItems: 'center', gap: 32, flex: 1 }}>
                                        <StatItem label="MGL" value={gameDataDB?.rating_avg} />
                                        <StatItem label="Популяр." value="1.2т" />
                                        <StatItem label="Отзывы" value={gameDataDB?.rating_count} />
                                    </View>
                                </View>
                            </View>
                        </BlurView>
                    </View>

                    {(user) && (
                        <UserRatingCard gameDataUserDB={gameDataUserDB} gameData={gameDataDB} game={game} />
                    )}

                    <View style={{ paddingTop: 20 }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "700",
                                color: "white",
                                marginBottom: 4,
                            }}
                        >
                            {game.name}
                        </Text>
                        <Text style={{ fontSize: 15, color: "gray" }}>
                            {game?.release_dates?.[0]?.y ?? "—"} |{" "}
                            {game.version_parent || game.parent_game
                                ? "Дополнение"
                                : "Основная игра"}
                        </Text>
                    </View>

                    <UsersCompleteStatus gameUsersStatus={gameUsersStatus || []} />

                    <View style={{ marginTop: 24, gap: 6 }}>
                        <MetaRow label="Разработчики" value={developers || "—"} />
                        <MetaRow label="Издатели" value={publishers || "—"} />
                        <MetaRow
                            label="Жанры"
                            value={game?.genres?.map((el: any) => GameGenres[el.id as keyof typeof GameGenres] ?? 'Неизвестно').join(", ")}
                        />
                        <MetaRow
                            label="Платформы"
                            value={game?.platforms?.map((el: any) => el.name).join(", ")}
                        />
                    </View>

                    {game?.summary && (
                        <View style={{ paddingTop: 24 }}>
                            <Text style={{ color: "gray", fontSize: 16, lineHeight: 22 }}>
                                {game.summary}
                            </Text>
                        </View>
                    )}

                    {screenshots?.length > 0 && (
                        <View style={{ paddingTop: 20 }}>
                            <ScreenshotsList screenshots={screenshots} />
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

function MetaRow({ label, value }: { label: string; value?: string }) {
    if (!value) return null;
    return (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text style={{ color: "gray" }}>{label}: </Text>
            <Text style={{ fontWeight: "600", color: "white" }}>{value}</Text>
        </View>
    );
};

function StatItem({ label, value }: { label: string; value: string }) {
    return (
        <View style={{ alignItems: "center" }}>
            <Text style={{ color: "gray", fontSize: 20 }}>{label}</Text>
            <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>
                {value}
            </Text>
        </View>
    );
};
