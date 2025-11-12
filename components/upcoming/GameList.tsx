import { FlatList, Text, View } from "react-native";
import { GameCard } from "./GameCard";

export default function GameList({ data, title }: { data: any[]; title?: string }) {
  if (!data) return null;

  return (
    <View>
      {title && <Text style={{ color: 'white', fontSize: 20, fontWeight: '600', marginBottom: 10, paddingLeft: 10 }}>{title}</Text>}
      <FlatList
        data={data}
        keyExtractor={(item: any) => item?.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => <GameCard item={item} />}
      />
    </View>
  );
};