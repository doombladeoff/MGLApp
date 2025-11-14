import { router, Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Pressable } from 'react-native';

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
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
        }}
      />
    </Tabs>
  );
}
