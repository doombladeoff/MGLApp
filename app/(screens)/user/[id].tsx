import { UserCard } from "@/components/user/UserCard";
import { useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

export default function UserScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useUser();

  if (!user) return;

  return (
    <ScrollView contentContainerStyle={{ padding: 14 }}
      contentInsetAdjustmentBehavior='automatic'>
      <UserCard />
    </ScrollView>
  );
};