import { useAuth } from "@clerk/clerk-expo";
import { useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function UserScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { signOut } = useAuth();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: 'white' }}>USER id: {id}</Text>
            <TouchableOpacity
                onPress={async () => {
                    try {
                        await signOut();
                    } catch (err) {
                        console.log("Logout error", err);
                    }
                }}
                style={{
                    marginTop: 20,
                    padding: 14,
                    borderRadius: 12,
                    backgroundColor: "#ff4d4d",
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
                    Выйти из аккаунта
                </Text>
            </TouchableOpacity>
        </View>
    );
};