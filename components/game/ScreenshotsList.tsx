import { Image } from "expo-image";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { IconSymbol } from "../ui/icon-symbol";

export const ScreenshotsList = ({ screenshots }: { screenshots: any[] }) => {
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <IconSymbol name="camera" size={24} color={'white'} />
        <Text style={{ color: 'white' }}>Скриншоты ({screenshots.length})</Text>
      </View>
      <FlatList
        data={screenshots}
        renderItem={({ item }) => (
          <Image
            source={{ uri: `https:${item.url}` }}
            style={{
              width: 320,
              height: 170,
              marginVertical: 20,
              marginRight: 20,
              borderRadius: 12,
              backgroundColor: "#222",
            }}
            contentFit="cover"
            transition={400}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};