import { getGameById } from "@/api/getGame";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { GameGenres } from "@/constants/genres";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, ScrollView, Text, View } from "react-native";

const { width } = Dimensions.get("screen");

export default function GameScreen() {
    const { id: gameId } = useLocalSearchParams<{ id: string }>();
    const [game, setGame] = useState<any>(null);

    const getData = async () => {
        const data = await getGameById(Number(gameId));
        setGame(data[0]);
    };

    useEffect(() => {
        getData();
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
                                        <StatItem label="MGL" value="9.0" />
                                        <StatItem label="Популяр." value="1.2т" />
                                        <StatItem label="Отзывы" value="93" />
                                    </View>
                                </View>
                            </View>
                        </BlurView>
                    </View>

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

                    {/* ЗАГЛУШКА */}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingTop: 24,
                            marginHorizontal: 8,
                        }}
                    >
                        {[
                            { label: "пройдено", value: "977" },
                            { label: "играю", value: "523" },
                            { label: "хочу", value: "812" },
                            { label: "брошено", value: "104" },
                        ].map((item, idx) => (
                            <View key={idx} style={{ alignItems: "center" }}>
                                <Text style={{ color: "gray", fontSize: 13 }}>{item.label}</Text>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        color: "white",
                                        fontSize: 15,
                                        marginTop: 2,
                                    }}
                                >
                                    {item.value}
                                </Text>
                            </View>
                        ))}
                    </View>

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
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <IconSymbol name="camera" size={24} color={'white'} />
                                <Text style={{ color: 'white' }}>Скриншоты ({screenshots.length})</Text>
                            </View>
                            <FlatList
                                data={screenshots}
                                renderItem={({ item }) => (
                                    <Image
                                        source={{ uri: `https:${item}` }}
                                        style={{
                                            width: 320,
                                            height: 170,
                                            marginVertical: 20,
                                            marginRight: 20,
                                            borderRadius: 12,
                                            backgroundColor: "#222",
                                        }}
                                        contentFit="cover"
                                        transition={400}
                                    />
                                )}
                                keyExtractor={(_, index) => index.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
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
