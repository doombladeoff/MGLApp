import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { memo } from "react";
import { Dimensions, View } from "react-native";

const { width } = Dimensions.get('screen');

const HeaderImge = ({ screenshots }: { screenshots: any[] }) => {

  const randomScreenshot =
    screenshots?.length > 0
      ? screenshots[Math.floor(Math.random() * screenshots.length)]
      : null;

  return (
    <View style={{ position: 'absolute', zIndex: 0, width: '100%', height: 220 }}>
      <LinearGradient
        colors={["transparent", "black"]}
        style={{
          position: "absolute",
          bottom: 0,
          width,
          height: 140,
          zIndex: 999
        }}
      />
      <Image
        source={{ uri: randomScreenshot ? `https:${randomScreenshot.url}` : undefined }}
        style={{ width, height: 220, position: 'absolute', top: 0, zIndex: 1 }}
        contentFit="cover"
        transition={500}
      />
    </View>
  );
};

export default memo(HeaderImge);