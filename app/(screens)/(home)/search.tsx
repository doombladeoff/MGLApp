import { IconSymbol } from "@/components/ui/icon-symbol";
import { HeaderBackButton, useHeaderHeight } from "@react-navigation/elements";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SearchScreen() {
    const insets = useSafeAreaInsets();
    const headerHeight = useHeaderHeight();
    const [query, setQuery] = useState("");
    const inputRef = useRef<TextInput>(null);

    const progress = useSharedValue(0);

    const openSearch = () => {
        progress.value = withTiming(1, { duration: 300 });
        inputRef.current?.focus();
    };

    const closeSearch = () => {
        progress.value = withTiming(0, { duration: 300 });
        inputRef.current?.blur();
        setQuery("");
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

    useEffect(() => {
        openSearch();
    }, []);

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
                        </View>
                    </Animated.View>

                    <Animated.View style={[searchButtonStyle, { top: -2, left: -8 }]}>
                        <Pressable hitSlop={10} onPress={openSearch}>
                            <IconSymbol name="magnifyingglass" size={28} color="white" />
                        </Pressable>
                    </Animated.View>

                    <Animated.View
                        style={[
                            cancelButtonStyle,
                            { position: "absolute", right: 12 },
                        ]}
                    >
                        <Pressable onPress={closeSearch} hitSlop={10}>
                            <Animated.Text style={{ color: "#0A84FF", fontSize: 16 }}>
                                Отмена
                            </Animated.Text>
                        </Pressable>
                    </Animated.View>
                </View>
            </Animated.View>

            <View style={{ flex: 1 }}>
            </View>
        </>
    );
}
