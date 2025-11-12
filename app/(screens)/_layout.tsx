import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <Stack>
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(game)/[id]"
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerBackTitle: 'Назад'
        }}
      />
    </Stack>
  );
}