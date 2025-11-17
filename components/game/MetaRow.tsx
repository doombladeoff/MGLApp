import { Text, View } from "react-native";

export const MetaRow = ({ label, value }: { label: string; value?: string }) => {
    if (!value) return null;
    return (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text style={{ color: "gray" }}>{label}: </Text>
            <Text style={{ fontWeight: "600", color: "white" }}>{value}</Text>
        </View>
    );
};