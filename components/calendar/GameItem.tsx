import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type GameItemProps = {
  item: {
    id: number;
    name: string;
    cover: { url: string };
    genres?: { name: string }[];
    platforms?: { name: string }[];
  };
  onPress?: () => void;
};

export default function GameItem({ item }: GameItemProps) {
  return (
    <Link
      href={{
        pathname: '/(screens)/(game)/[id]',
        params: { id: item.id }
      }}
      asChild
      style={styles.card}
    >
      <Pressable>
        <Image
          source={{ uri: `https:${item.cover.url.replace("t_thumb", "t_cover_big")}` }}
          style={styles.cover}
          transition={400}
        />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.genres} numberOfLines={1}>
            {item.genres?.map(g => g.name).join(', ')}
          </Text>
          <Text style={styles.platforms} numberOfLines={1}>
            {item.platforms?.map(p => p.name).join(', ')}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  cover: {
    width: 100,
    height: 140,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  genres: {
    color: 'gray',
    fontSize: 12,
  },
  platforms: {
    color: 'gray',
    fontSize: 12,
  },
});
