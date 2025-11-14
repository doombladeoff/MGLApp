import { router, Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { Pressable, StyleSheet } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          headerShown: true,
          headerTitle: '',
          headerLeft: () => <Image source={require('@/assets/images/logoshort.svg')} style={{ height: 35, width: 100, marginLeft: 10 }} contentFit='contain' />,
          headerRight: () => (
            <Pressable
              hitSlop={10}
              onPress={() => router.push({ pathname: '/search' })}
              style={({ pressed }) => ({
                top: -2,
                right: 15,
                opacity: pressed ? 0.8 : 1
              })}
            >
              <IconSymbol name='magnifyingglass' size={28} color={'white'} />
            </Pressable>
          ),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Календарь',
          headerTitle: '',
          headerShown: true,
          headerTransparent: true,
          headerBackground: () => <BlurView style={StyleSheet.absoluteFill} />,
          headerLeft: () => <Image source={require('@/assets/images/logoshort.svg')} style={{ height: 35, width: 100, marginLeft: 10 }} contentFit='contain' />,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
        }}
      />
    </Tabs>
  );
}
