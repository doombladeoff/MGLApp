import { GameStatus } from "@/app/types/GameTypes";
import { CalculateRatingColor } from "@/utils/CalculateRatingColor";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView, TextInput } from 'react-native-gesture-handler';

export default function WriteReviewScreen() {
  const { id, title, cover, rating, review, status } = useLocalSearchParams<{
    id: string,
    title: string,
    cover: string,

    rating: string,
    review: string,
    status: GameStatus
  }>();

  const [userRating, setUserRating] = useState(rating ? Number(rating) : 0);
  const [userStatus, setUserStatus] = useState<GameStatus>(status);
  const ratingColor = CalculateRatingColor(userRating || 0);

  return (
    <>
      <Stack.Screen
        options={{
          ...(__DEV__ && { headerTitle: `ID: ${id}` }),
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.8}>
              <View style={{ backgroundColor: 'white', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>{Number(rating) > 0 ? 'Обновить' : 'Добавить'}</Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView
        contentContainerStyle={{ padding: 10, paddingTop: 15, gap: 0 }}
        contentInsetAdjustmentBehavior='automatic'
        automaticallyAdjustKeyboardInsets
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Image
            source={{ uri: cover }}
            style={{
              width: 120,
              height: 175,
              borderRadius: 14,
              backgroundColor: 'gray'
            }}
          />
          <View>
            <Text style={{ color: ratingColor, fontSize: 60, fontWeight: 'bold' }}>{userRating <= 0 ? "NS" : userRating < 10 ? (userRating.toFixed(1)) : userRating}</Text>
            <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>{title || 'No title'}</Text>
          </View>
        </View>

        <View style={{ height: 400, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', }}>
          <TextInput
            placeholder="Напишите свой отзыв (до 5000 символов)"
            placeholderTextColor={'gray'}
            maxLength={5000}
            style={{ padding: 14, height: 400 }}
          />
        </View>
      </ScrollView>
    </>
  );
};