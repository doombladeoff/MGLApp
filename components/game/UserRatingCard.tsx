import { GameDataUserDB } from "@/app/(screens)/(game)/[id]";
import { GameRatingIconName, GameStatus, GameStatusNames } from "@/app/types/GameTypes";
import { CalculateRatingColor } from "@/utils/CalculateRatingColor";
import { useUser } from "@clerk/clerk-expo";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { UserRatingIcon } from "./UserRatingIcon/UserRatingIcon";

const { width } = Dimensions.get("screen");

export const UserRatingCard = ({ gameDataUserDB }: { gameDataUserDB?: GameDataUserDB }) => {
  const { user } = useUser();

  const scoreColor = CalculateRatingColor(gameDataUserDB?.rating || 0);

  const getIcon = (): GameRatingIconName => {
    if (!gameDataUserDB?.rating) return 'gray';

    const rating = gameDataUserDB.rating;

    if (rating >= 0.1 && rating < 1.7) return 'angry';
    if (rating >= 1.7 && rating < 3.4) return 'sad';
    if (rating >= 3.4 && rating < 5) return 'less';
    if (rating >= 5 && rating < 6.7) return 'netural';
    if (rating >= 6.7 && rating < 8.4) return 'happy';
    if (rating >= 8.4) return 'calm';

    return 'gray';
  };

  const iconName = getIcon();

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
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '600' }}>Ваша оценка</Text>
            <Text style={{ color: scoreColor, fontSize: 30, fontWeight: 'bold', }}>
              {gameDataUserDB?.rating != null ? gameDataUserDB.rating : 'NS'}
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '600' }}>{GameStatusNames[gameDataUserDB?.status as GameStatus] || "Без статуса"}</Text>
          </View>

        </View>

        <View style={{ position: 'absolute', right: 0 }}>
          <UserRatingIcon name={iconName} />
        </View>

      </BlurView>
    </TouchableOpacity>
  );
};