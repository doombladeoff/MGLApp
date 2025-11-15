import { Input } from '@/components/auth/Input'
import { useSignIn } from '@clerk/clerk-expo'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SignInScreen() {
    const insets = useSafeAreaInsets();
    const { signIn, setActive, isLoaded } = useSignIn();

    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

    const onSignInPress = async () => {
        if (!isLoaded) return
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            })
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    };

    return (
        <View
            style={{
                paddingTop: insets.top * 1.5,
                flexGrow: 1,
                justifyContent: 'space-evenly',
                padding: 24,
                backgroundColor: '#0f0f0f'
            }}
        >
            <View style={{ gap: 16 }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    flex: 1
                }}>
                    <View style={{
                        justifyContent: "flex-end",
                        paddingBottom: 10
                    }}>
                        <Text style={{ fontSize: 34, fontWeight: '700', color: 'white' }}>
                            Привет!
                        </Text>
                        <Text style={{ color: '#80838A', fontSize: 16 }}>
                            Давай знакомиться
                        </Text>
                    </View>

                    <Image
                        source={require('@/assets/images/logo-auth.svg')}
                        style={{
                            marginRight: 50,
                            width: 124,
                            height: 124,
                        }}
                    />
                </View>

                <Input
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                    placeholder="Email"
                    placeholderTextColor="gray"
                />
                <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Пароль"
                    placeholderTextColor="gray"
                    secureTextEntry
                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onSignInPress}
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

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12, gap: 4 }}>
                    <Text style={{ color: 'gray' }}>Нет аккаунта?</Text>
                    <Link href="/sign-up">
                        <Text style={{ color: '#0ea5e9', fontWeight: '600' }}>Регистрация</Text>
                    </Link>
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
                <Text style={{ marginHorizontal: 8, color: 'gray' }}>или</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
            </View>
        </View>
    );
};