import { getSearchGames } from "@/api/getSearchGames";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { GameGenres } from "@/constants/genres";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HeaderBackButton, useHeaderHeight } from "@react-navigation/elements";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import Animated, {
    FadeIn,
    FadeOut,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SearchScreen() {
    const insets = useSafeAreaInsets();
    const headerHeight = useHeaderHeight();
    const [query, setQuery] = useState("");
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState(true);
    const inputRef = useRef<TextInput>(null);
    const debounceRef = useRef<number | null>(null);

    const progress = useSharedValue(0);

    const openSearch = () => {
        progress.value = withTiming(1, { duration: 300 });
        inputRef.current?.focus();
    };

    const closeSearch = () => {
        progress.value = withTiming(0, { duration: 300 });
        inputRef.current?.blur();
        setQuery("");
        setData([]);
        setPage(0);
        setHasMore(true);
    };

    const backButtonStyle = useAnimatedStyle(() => ({
        opacity: withTiming(progress.value ? 0 : 1),
        transform: [
            { translateX: withTiming(progress.value ? -20 : 0) },
        ],
    }));

    const inputStyle = useAnimatedStyle(() => ({
        flex: 1,
        opacity: withTiming(progress.value),
        transform: [
            { translateX: withTiming(progress.value ? 0 : 40) },
        ],
        marginHorizontal: 8,
    }));

    const searchButtonStyle = useAnimatedStyle(() => ({
        opacity: withTiming(progress.value ? 0 : 1),
    }));

    const cancelButtonStyle = useAnimatedStyle(() => ({
        opacity: withTiming(progress.value),
    }));

    const loadData = async (pageNumber: number, searchText: string, reset = false) => {
        if (loading || !searchText.trim()) return;
        const LIMIT = 20;
        const offset = pageNumber * LIMIT;

        if (!reset && pageNumber > 0 && !hasMore) return;

        setLoading(true);

        try {
            const result = await getSearchGames(searchText, offset, LIMIT);
            if (reset) {
                setData(result);
            } else {
                setData(prev => [...prev, ...result]);
            }
            setHasMore(result.length === LIMIT);
            setPage(pageNumber);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error("Ошибка загрузки данных IGDB:", err);
        }
    };

    const handleLoadMore = async () => {
        if (!hasMore || loading) return;
        await loadData(page + 1, query);
    };

    useEffect(() => {
        openSearch();
    }, []);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (!query.trim()) {
            setData([]);
            setHasMore(true);
            setPage(0);
            return;
        }

        debounceRef.current = setTimeout(() => {
            loadData(0, query, true);
        }, 800);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [query]);

    const SearchItem = ({ item }: { item: any }) => {
        return (
            <Link
                href={{
                    pathname: "/(screens)/(game)/[id]",
                    params: { id: item.id },
                }}
                asChild
            >
                <Pressable>
                    <Animated.View
                        entering={FadeIn}
                        style={{
                            flexDirection: "row",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            borderRadius: 16,
                            overflow: "hidden",
                            padding: 10,
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <Image
                            source={{
                                uri: `https:${item?.cover?.url?.replace(
                                    "t_thumb",
                                    "t_cover_big"
                                )}`,
                            }}
                            style={{
                                width: 100,
                                height: 140,
                                borderRadius: 12,
                                backgroundColor: "rgba(255,255,255,0.1)",
                            }}
                            contentFit="cover"
                            transition={400}
                        />

                        <View style={{ flex: 1, justifyContent: "space-between" }}>
                            <View>
                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: 16,
                                        fontWeight: "700",
                                        flexShrink: 1,
                                    }}
                                    numberOfLines={2}
                                >
                                    {item?.name}
                                </Text>
                                <Text
                                    style={{
                                        color: "rgba(255,255,255,0.7)",
                                        marginTop: 2,
                                    }}
                                    numberOfLines={1}
                                >
                                    {item?.genres?.map((el: any) => GameGenres[el.id as keyof typeof GameGenres] ?? 'Неизвестно').join(", ")}
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginTop: 8,
                                }}
                            >
                                <Text style={{ color: "rgba(255,255,255,0.7)" }}>
                                    {item?.releaseYear}
                                </Text>

                                <Pressable
                                    style={{
                                        borderRadius: 999,
                                        borderWidth: 1,
                                        borderColor: "rgba(255,255,255,0.2)",
                                        padding: 6,
                                        backgroundColor: "rgba(255,255,255,0.05)",
                                    }}
                                    onPress={() => console.log("Добавлено")}
                                >
                                    <Ionicons name="add" size={16} color="white" />
                                </Pressable>
                            </View>
                        </View>
                    </Animated.View>
                </Pressable>
            </Link>
        );
    };

    const EmptyPlaceholder = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: -60, gap: 10 }}>
                <Ionicons name="game-controller" size={64} color="white" />
                <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>Время найти любимую игру?</Text>
            </View>
        );
    };

    return (
        <>
            <Animated.View
                style={{
                    backgroundColor: "rgb(18,18,18)",
                    paddingTop: insets.top,
                    paddingBottom: 10,
                    paddingHorizontal: 12,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        height: headerHeight - insets.top,
                    }}
                >
                    <Animated.View style={[backButtonStyle, { top: -2 }]}>
                        <HeaderBackButton tintColor="white" onPress={router.back} />
                    </Animated.View>

                    <Animated.View style={[inputStyle, { left: -42 }]}>
                        <View
                            style={{
                                backgroundColor: "#2C2C2E",
                                borderRadius: 12,
                                flexDirection: "row",
                                alignItems: "center",
                                paddingHorizontal: 10,
                                height: 36,
                            }}
                        >
                            <IconSymbol name="magnifyingglass" size={18} color="#B0B0B0" />
                            <TextInput
                                ref={inputRef}
                                placeholder="Поиск"
                                placeholderTextColor="#B0B0B0"
                                value={query}
                                onChangeText={setQuery}
                                style={{
                                    color: "white",
                                    fontSize: 16,
                                    flex: 1,
                                    marginLeft: 8,
                                }}
                                returnKeyType="search"
                            />
                            {query.length > 1 && (
                                <Animated.View entering={FadeIn} exiting={FadeOut}>
                                    <Pressable
                                        hitSlop={10}
                                        onPress={() => setQuery('')}
                                        style={{ padding: 4, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 100 }}>
                                        <IconSymbol name="xmark" size={14} color="#B0B0B0" />
                                    </Pressable>
                                </Animated.View>
                            )}
                        </View>
                    </Animated.View>

                    <Animated.View style={[searchButtonStyle, { top: -2, left: -8 }]}>
                        <Pressable hitSlop={10} onPress={openSearch}>
                            <IconSymbol name="magnifyingglass" size={28} color="white" />
                        </Pressable>
                    </Animated.View>

                    <Animated.View
                        style={[cancelButtonStyle, { position: "absolute", right: 12 }]}
                    >
                        <Pressable onPress={closeSearch} hitSlop={10}>
                            <Animated.Text style={{ color: "#0A84FF", fontSize: 16 }}>
                                Отмена
                            </Animated.Text>
                        </Pressable>
                    </Animated.View>
                </View>
            </Animated.View>
            {data.length < 1 ? (
                <EmptyPlaceholder />
            ) : (
                <View style={{ flex: 1, backgroundColor: "black" }}>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ padding: 12, gap: 12 }}
                        contentInsetAdjustmentBehavior="automatic"
                        keyboardDismissMode="on-drag"
                        onEndReachedThreshold={0.8}
                        onEndReached={handleLoadMore}
                        ListFooterComponent={
                            loading ? <ActivityIndicator size="large" color="white" /> : null
                        }
                        renderItem={({ item }) => <SearchItem item={item} />}
                    />
                </View>
            )}
        </>
    );
}
