import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export const GameCard = ({ item }: { item: any }) => {
  const coverUrl = `https:${item?.cover?.url?.replace("t_thumb", "t_cover_big")}`;
  const releaseDate = new Date(item?.first_release_date * 1000)
    .toLocaleDateString("ru-RU", { day: "numeric", month: "short" })
    .replace(".", "");

  return (
    <View
      style={{
        width: 170,
        borderWidth: 0.5,
        borderColor: "#383A40",
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.03)",
        overflow: "hidden",
      }}
    >
      <Link
        href={{
          pathname: '/(screens)/(game)/[id]',
          params: { id: item.id }
        }}
        asChild
      >
        <Pressable
          style={{
            borderRadius: 16,
            overflow: "hidden",
            aspectRatio: 264 / 350,
            backgroundColor: "rgba(255,255,255,0.05)",
          }}
        >
          <Image
            source={{ uri: coverUrl }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            transition={400}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
            }}
          />
        </Pressable>
      </Link>

      <View style={{ padding: 8, flexDirection: "column", gap: 4 }}>
        <Text
          numberOfLines={2}
          style={{
            color: "#fff",
            fontWeight: "700",
            fontSize: 13,
            lineHeight: 16,
          }}
        >
          {item?.name}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 12,
          }}
        >
          {item?.genres?.map((el: any) => el.name).join(", ")}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 8,
          paddingBottom: 6,
          paddingTop: 2,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Ionicons name="calendar" size={14} color={"gray"} />
          <Text style={{ color: "#ccc", fontSize: 12 }}>{releaseDate}</Text>
        </View>

        <Pressable
          style={{
            borderRadius: 999,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.1)",
            padding: 6,
            backgroundColor: "rgba(255,255,255,0.05)",
          }}
          onPress={() => console.log("Добавлено")}
        >
          <Ionicons name="add" size={14} color="white" />
        </Pressable>
      </View>
    </View>
  );
};
