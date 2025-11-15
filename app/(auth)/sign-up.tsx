import { Input } from '@/components/auth/Input';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen() {
    const { isLoaded, signUp } = useSignUp();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const onSignUpPress = async () => {
        if (!isLoaded) return

        try {
            await signUp.create({
                emailAddress,
                password,
            })

            await signUp.prepareEmailAddressVerification({
                strategy: 'email_code',
            })

            router.push({ pathname: '/(auth)/verify' });

        } catch (err: any) {
            Alert.alert('Error', err.errors?.[0]?.message || err.message)
        }
    };

    return (
        <View
            style={{
                flexGrow: 1,
                justifyContent: 'space-evenly',
                padding: 24,
                backgroundColor: '#0f0f0f'
            }}
        >
            <View style={{ gap: 16 }}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 34,
                        fontWeight: '700',
                    }}
                >
                    Регистрация
                </Text>
                <Input
                    autoCapitalize="none"
                    placeholder="Email"
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                />
                <Input
                    placeholder="Пароль"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onSignUpPress}
                    style={{
                        backgroundColor: '#0ea5e9',
                        padding: 14,
                        borderRadius: 12,
                        alignItems: 'center',
                        marginTop: 16,
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>Продолжить</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', gap: 6 }}>
                    <Text style={{ color: '#80838A', fontSize: 15 }}>
                        У вас уже есть аккаунт?
                    </Text>

                    <Link href="/sign-in">
                        <Text style={{ color: '#4C82FB', fontSize: 15, fontWeight: '600' }}>
                            Вход
                        </Text>
                    </Link>
                </View>
            </View>
        </View>
    );
};
