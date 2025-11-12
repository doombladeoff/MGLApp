import { FlatList, Text, View } from "react-native";
import { UpcomingGameCard } from "./UpcomingGameCard";

export default function UpcomingGames({ data }: { data: any[] }) {
  if (!data) return null;

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '600', marginBottom: 10, paddingLeft: 10 }}>Скоро выйдут 💫</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item: any) => item?.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => <UpcomingGameCard item={item} />}
      />
    </View>
  );
};