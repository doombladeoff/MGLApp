import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 200
        }}
      />
    </Stack>
  )
}