import { GameDataUserDB } from "@/app/(screens)/(game)/[id]";
import { useUser } from "@clerk/clerk-expo";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("screen");

export const UserRatingCard = ({ gameDataUserDB }: { gameDataUserDB?: GameDataUserDB }) => {
  const { user } = useUser();

  const scoreColor = 'gray'
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        marginTop: 20,
        shadowColor: "white",
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 0 },
      }}
    >
      <BlurView
        intensity={30}
        style={{
          width: width - 24,
          height: 140,
          overflow: "hidden",
          borderRadius: 20,
          justifyContent: 'center',
          padding: 14,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 12,
          }}
        >

          <Image
            source={{ uri: user?.imageUrl }}
            style={{ width: 90, height: 90, borderRadius: 100 }}
            contentFit="cover"
            transition={500}
          />

          <View style={{ height: 90, justifyContent: 'center' }}>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Ваша оценка</Text>
            <Text style={{ color: scoreColor, fontSize: 30, fontWeight: 'bold', }}>{`${gameDataUserDB?.rating.toFixed(1)}` || `NS`}</Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Без статуса</Text>
          </View>
        </View>
      </BlurView>
    </TouchableOpacity>
  );
};