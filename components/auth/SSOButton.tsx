import { useSignIn, useSSO } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { Text, TouchableOpacity } from "react-native";

type SSOButtonProps = {
    variant: "oauth_google" | "oauth_apple"
};

const buttonData = {
    oauth_google: {
        icon: require('@/assets/images/google.svg'),
        label: 'Google',
        background: '#fff',
        textColor: '#000',
        iconTint: undefined,
    },
    oauth_apple: {
        icon: require('@/assets/images/apple.svg'),
        label: 'Apple',
        background: '#000',
        textColor: '#fff',
        iconTint: 'white',
    },
};

export const SSOButton = ({ variant }: SSOButtonProps) => {
    const { startSSOFlow } = useSSO();
    const { setActive, isLoaded } = useSignIn();

    const signInWithSSO = async (strategy: typeof variant) => {
        if (!isLoaded) return;

        try {
            const { authSessionResult, createdSessionId } = await startSSOFlow({ strategy });
            if (authSessionResult?.type === 'success' && createdSessionId) {
                await setActive({ session: createdSessionId });
            } else {
                console.error('SSO not complete');
            }
        } catch (err) {
            console.error('SSO error', err);
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => signInWithSSO(variant)}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                padding: 14,
                borderRadius: 12,
                backgroundColor: buttonData[variant].background,
            }}
        >
            <Image
                source={buttonData[variant].icon}
                style={{
                    width: 24,
                    height: 24,
                    tintColor: buttonData[variant].iconTint,
                }}
            />

            <Text style={{ color: buttonData[variant].textColor, fontWeight: '600' }}>
                Продолжить с помощью {buttonData[variant].label}
            </Text>
        </TouchableOpacity>

    );
};