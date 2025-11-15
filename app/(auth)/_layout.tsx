import { Stack } from 'expo-router';

export default function AuthRoutesLayout() {
    return (
        <Stack screenOptions={{
            headerBackTitle: 'Назад'
        }}>
            <Stack.Screen
                name='sign-in'
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='sign-up'
                options={{
                    headerTransparent: true,
                    headerTitle: ''
                }}
            />
            <Stack.Screen
                name='verify'
                options={{
                    headerTransparent: true,
                    headerTitle: ''
                }}
            />
        </Stack>
    );
};