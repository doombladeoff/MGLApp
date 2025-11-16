import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


import { useColorScheme } from '@/hooks/use-color-scheme';
import { ActivityIndicator } from 'react-native';
import SupabaseProvider from './providers/SupabaseProvider';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootStack() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (<ActivityIndicator />)
  }

  return (
    <Stack>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!!isSignedIn}>
        <Stack.Screen name="(screens)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  )
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <SupabaseProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <RootStack />
          <StatusBar style="auto" />
        </ThemeProvider>
      </SupabaseProvider>
    </ClerkProvider>
  );
}
