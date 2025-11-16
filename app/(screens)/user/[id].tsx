import { useSupabase } from "@/app/providers/SupabaseProvider";
import { UserCard } from "@/components/user/UserCard";
import { useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams } from "expo-router";
import { Button, ScrollView } from "react-native";

export default function UserScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useUser();
  const supabase = useSupabase();
  if (!user) return;

  const testInsert = async () => {
    const { data, error } = await supabase
      .from('Test')
      .insert({ test: 'Test field', user: user.id });
    console.error(error);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 14 }}
      contentInsetAdjustmentBehavior='automatic'>
      <UserCard />
      <Button title="test insert" onPress={testInsert} />
    </ScrollView>
  );
};