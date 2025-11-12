
import { getTopGames } from '@/api/getTopGames';
import { getUpcomingGames } from '@/api/getUpcuming';
import UpcomingGames from '@/components/upcoming/UpcomingGames';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from '@react-navigation/elements';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function formatRating(value?: number) {
  if (!value) return "—";
  return (value / 100 * 0.1).toFixed(1);
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [topGames, setTopGames] = useState([]);
  const [upcomingGames, setUpcomingGames] = useState([]);

  const getData = async (): Promise<void> => {
    try {
      const [topGames, upcomingGames] = await Promise.all([
        getTopGames(),
        getUpcomingGames(),
      ]);

      console.log(upcomingGames)
      setTopGames(topGames);
      setUpcomingGames(upcomingGames);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* TEST */}
      <View style={{ paddingTop: insets.top, gap: 5 }}>
        <Link href={{ pathname: '/(screens)/(game)/[id]', params: { id: 1942 } }} asChild>
          <Button color={'white'}>
            Game
          </Button>
        </Link>
        <Link href={{ pathname: '/(screens)/(game)/[id]', params: { id: 13166 } }} asChild>
          <Button color={'white'}>
            Game id 13166
          </Button>
        </Link>
      </View>

      <ScrollView contentInsetAdjustmentBehavior='automatic' contentContainerStyle={{ paddingHorizontal: 10 }}>
        <UpcomingGames data={upcomingGames || []} />
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '600', marginBottom: 10, paddingLeft: 10 }}>Самые популярные игры</Text>
          {topGames.map((el: any, index: number) => (
            <Link
              key={el.id}
              href={{
                pathname: '/(screens)/(game)/[id]',
                params: { id: el.id }
              }}
              asChild
            >
              <Pressable>
                <BlurView
                  intensity={60}
                  tint="dark"
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 18,
                    overflow: 'hidden',
                    marginBottom: 14,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                  }}
                >
                  <Image
                    source={{ uri: `https:${el.cover.url.replace("t_thumb", "t_cover_big")}` }}
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      opacity: 0.15,
                      borderRadius: 18,
                    }}
                    blurRadius={15}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                      flex: 1,
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 }}>
                      <View style={{ position: 'relative' }}>
                        <Image
                          source={{ uri: `https:${el.cover.url.replace("t_thumb", "t_cover_big")}` }}
                          style={{
                            width: 70,
                            height: 100,
                            borderRadius: 12,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                          }}
                        />
                        <View
                          style={{
                            position: 'absolute',
                            bottom: 4,
                            right: 4,
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            borderRadius: 8,
                            paddingHorizontal: 6,
                            paddingVertical: 2,
                          }}
                        >
                          <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}>
                            #{index + 1}
                          </Text>
                        </View>
                      </View>

                      <View style={{ flexShrink: 1 }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: '700',
                          }}
                          numberOfLines={1}
                        >
                          {el.name}
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Ionicons name="star" size={18} color="white" />
                      <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>
                        {`${formatRating(el.total_rating_count)}т` || 0}
                      </Text>
                    </View>
                  </View>
                </BlurView>
              </Pressable>
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};