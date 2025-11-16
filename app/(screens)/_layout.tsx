import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@clerk/clerk-expo';
import { Stack } from "expo-router";
import React from "react";
import { PlatformColor, TouchableOpacity } from "react-native";

export default function ScreensLayout() {
  const { signOut } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerTitle: '',
        headerBackTitle: 'Назад',
        contentStyle: { backgroundColor: '#0f0f0f' },
        headerStyle: { backgroundColor: '#0f0f0f' }
      }}
    >
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(game)/[id]"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: undefined },
          contentStyle: { backgroundColor: 'black' },
        }}
      />
      <Stack.Screen
        name="user/[id]"
        options={{
          headerRight: () => (
            <TouchableOpacity hitSlop={10} onPress={() => signOut()}>
              <IconSymbol name='rectangle.portrait.and.arrow.right.fill' size={30} color={PlatformColor('red')} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="user/profile-edit"
        options={{
          headerBackTitle: 'Профиль'
        }}
      />
    </Stack>
  );
}