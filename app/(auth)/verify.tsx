import { Input } from "@/components/auth/Input";
import { useSignUp } from "@clerk/clerk-expo";
import { useHeaderHeight } from "@react-navigation/elements";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function VerifyAccount() {
    const headerHeight = useHeaderHeight();
    const { isLoaded, signUp, setActive } = useSignUp();
    const [code, setCode] = useState('');

    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            const attempt = await signUp.attemptEmailAddressVerification({ code })

            if (attempt.status === 'complete') {
                await setActive({ session: attempt.createdSessionId })
            } else {
                Alert.alert('Invalid code', 'Please try again')
            }
        } catch (err: any) {
            Alert.alert('Error', err.errors?.[0]?.message || err.message)
        }
    }

    return (
        <View
            style={{
                flexGrow: 1,
                paddingTop: headerHeight + 24,
                padding: 24,
                backgroundColor: '#0f0f0f'
            }}
        >
            <View style={{ gap: 16 }}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 28,
                        fontWeight: '700',
                        marginBottom: 4,
                    }}
                >
                    Подтверждение почты
                </Text>

                <Text style={{ color: '#80838A', fontSize: 16, marginBottom: 8 }}>
                    Введите 6-значный код, отправленный на ваш адрес электронной почты.
                </Text>

                <Input
                    value={code}
                    onChangeText={setCode}
                    placeholder="123456"
                    keyboardType="number-pad"
                />

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onVerifyPress}
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
            </View>
        </View>
    );
};