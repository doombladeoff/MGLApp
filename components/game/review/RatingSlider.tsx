import { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const SLIDER_WIDTH = Dimensions.get("screen").width - 20;
const HANDLE_SIZE = 40;

const MAX_RATING = 10;
const STEP = 0.1;

export const RatingSlider = ({
    rating,
    setRating,
}: {
    rating: number;
    setRating: (v: number) => void;
}) => {
    const minX = 5;
    const maxX = SLIDER_WIDTH - HANDLE_SIZE - 5;

    const offset = useSharedValue(minX + (rating / MAX_RATING) * (maxX - minX));

    useEffect(() => {
        offset.value = minX + (rating / MAX_RATING) * (maxX - minX);
    }, [rating]);

    const pan = Gesture.Pan().onChange((event) => {
        let newX = offset.value + event.changeX;

        if (newX < minX) newX = minX;
        if (newX > maxX) newX = maxX;

        offset.value = newX;

        const rawRating = ((newX - minX) / (maxX - minX)) * MAX_RATING;

        const steppedRating = Math.round(rawRating / STEP) * STEP;

        scheduleOnRN(setRating, Number(steppedRating.toFixed(1)));
    });

    const sliderStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));

    return (
        <View style={styles.container}>
            <View style={styles.sliderTrack}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Text style={{ color: 'gray', fontWeight: '600', zIndex: 999, pointerEvents: 'none' }}>NS</Text>
                    <Text style={{ color: 'gray' }}>Сдвиньте для оценки &gt;   &gt;   &gt;   &gt;   &gt;   &gt;   &gt;   &gt;</Text>
                    <Text style={{ color: 'gray', fontWeight: '600', zIndex: 999, pointerEvents: 'none' }}>10</Text>
                </View>

                <GestureDetector gesture={pan}>
                    <Animated.View style={[styles.sliderHandle, sliderStyle]} />
                </GestureDetector>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: 20
    },
    sliderTrack: {
        width: SLIDER_WIDTH,
        height: 50,
        borderWidth: 0.5,
        borderColor: 'rgba(255,255,255,0.5)',
        borderRadius: 25,
        justifyContent: "center",
        paddingHorizontal: 5,
    },
    sliderHandle: {
        width: HANDLE_SIZE,
        height: HANDLE_SIZE,
        backgroundColor: "#fff",
        borderWidth: 3,
        borderColor: 'rgb(55,126,142)',
        borderRadius: HANDLE_SIZE / 2,
        position: "absolute",
        left: 0,
    },
});
