
import { Stack } from "expo-router";
import { ActivityIndicator, SectionList, Text, View } from "react-native";

import { getCalendar } from '@/api/getCalendar';
import { CalendarHeaderCenter, CalendarHeaderRight } from "@/components/calendar/CalendarHeader";
import GameItem from "@/components/calendar/GameItem";
import { useHeaderHeight } from "@react-navigation/elements";
import { Image } from "expo-image";
import { useCallback, useEffect, useState } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const today = new Date();

export default function CalendarScreen() {
  const headerHeight = useHeaderHeight();

  const [date, setDate] = useState(today);
  const [loading, setLoading] = useState<boolean>(false);
  const [sections, setSections] = useState<{
    title: string;
    data: any;
  }[]>([]);

  const [debouncedDate, setDebouncedDate] = useState(date);

  async function getCalendarData() {

    setLoading(true);
    const [r1, r2, r3] = await Promise.all([
      getCalendar(0, date),
      getCalendar(500, date),
      getCalendar(1000, date),
    ]);

    if (!r1 || !r2 || !r3) return;

    const allGames = [...r1, ...r2, ...r3];
    const uniqueGames = Array.from(new Map(allGames.map(g => [g.id, g])).values());

    const groupedByDay = uniqueGames.reduce((acc: any, game: any) => {
      const day = game.releaseDate.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
      });

      if (!acc[day]) acc[day] = [];
      acc[day].push(game);
      return acc;
    }, {});

    const sections = Object.keys(groupedByDay)
      .sort((a, b) => {
        const year = new Date().getFullYear();
        return new Date(`${a} ${year}`).getTime() - new Date(`${b} ${year}`).getTime();
      })
      .map((day) => ({
        title: day,
        data: groupedByDay[day],
      }));

    setSections(sections);
    setLoading(false);
  };

  const changeDay = useCallback((offset: number) => {
    setDate(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() + offset);
      return d;
    });
  }, []);

  const onChange = useCallback((_: any, selectedDate?: Date) => {
    if (selectedDate) setDate(selectedDate);
  }, []);

  const resetDay = useCallback(() => {
    setDate(today);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedDate(date), 250);
    return () => clearTimeout(handler);
  }, [date]);

  useEffect(() => {
    getCalendarData();
  }, [debouncedDate]);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <CalendarHeaderCenter
              date={date}
              changeDay={changeDay}
              onChange={onChange}
            />
          ),
          headerRight: () => (
            <CalendarHeaderRight
              resetDay={resetDay}
            />
          ),
        }}
      />
      <View style={{ flex: 1 }}>
        {loading && (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={{ position: 'absolute', width: '100%', height: '100%', top: headerHeight, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 999 }}>
            <ActivityIndicator size='large' />
          </Animated.View>
        )}
        {(sections.length < 1) ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 35 }}>
            <Image source={require('@/assets/images/error_exclamation.png')} style={{ width: 100, height: 180, transform: [{ scale: 1.5 }] }} />
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>Ничего не найдено</Text>
          </View>
        ) : (
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ gap: 10, paddingTop: 40 }}
            scrollIndicatorInsets={{ top: 40 }}
            contentInsetAdjustmentBehavior='automatic'
            renderItem={({ item }) => (
              <GameItem item={item} />
            )}
          />
        )}
      </View>
    </>
  )
};