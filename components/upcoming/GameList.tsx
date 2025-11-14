import * as Crypto from 'expo-crypto';
import { FlatList, Text, View } from "react-native";
import { GameCard } from "./GameCard";

export default function GameList({ data, title }: { data: any[]; title?: string }) {
  if (!data.length) return (
    <>
      {title && <Text style={{ color: 'white', fontSize: 20, fontWeight: '600', marginBottom: 10, paddingLeft: 10 }}>{title}</Text>}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        {Array.from({ length: 5 }).map(() => (
          <View
            key={Crypto.randomUUID()}
            style={{
              width: 170,
              aspectRatio: 264 / 350,
              borderWidth: 0.5,
              borderColor: "#383A40",
              borderRadius: 16,
              backgroundColor: "rgba(255,255,255,0.03)",
              overflow: "hidden",
            }}
          />
        ))}
      </View>
    </>
  );

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