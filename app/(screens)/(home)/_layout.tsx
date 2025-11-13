import { IconSymbol } from "@/components/ui/icon-symbol";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: true,
          headerTitle: '',
          headerRight: () => (
            <Pressable
              hitSlop={10}
              onPress={() => router.push({ pathname: '/search' })}
              style={({ pressed }) => ({
                opacity: pressed ? 0.8 : 1
              })}
            >
              <IconSymbol name='magnifyingglass' size={28} color={'white'} />
            </Pressable>
          )
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />
    </Stack>
  )
}