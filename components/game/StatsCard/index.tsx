import { CalculateRatingColor } from "@/utils/CalculateRatingColor";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { Dimensions, StyleSheet, View } from "react-native";
import { StatItem } from "./StatItem";

const { width } = Dimensions.get('screen');

export const StatsCard = ({ cover, gameDataDB }: { cover: string; gameDataDB: any }) => {

  const ratingColor = CalculateRatingColor(gameDataDB?.rating_avg || 0);

  return (
    <View style={styles.shadow}>
      <BlurView intensity={30} style={styles.container}>
        <View style={styles.row}>
          <Image
            source={{ uri: `https:${cover}` }}
            style={styles.img}
            contentFit="cover"
            transition={500}
          />
          <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: 'center', gap: 42, flex: 1 }}>
              <StatItem
                label="MGL"
                value={gameDataDB?.rating_avg}
                labelTextStyle={{
                  fontSize: 16,
                  textAlign: 'left',
                  color: 'rgba(255,255,255,0.8)'
                }}
                valueTextStyle={{
                  color: ratingColor,
                  fontSize: 28,
                  fontWeight: 'bold'
                }}
              />
              <StatItem
                label="Популяр."
                value="1.2т"
                labelTextStyle={{
                  fontSize: 16,
                  textAlign: 'left',
                  color: 'rgba(255,255,255,0.8)'
                }}
                valueTextStyle={{
                  fontSize: 28,
                  fontWeight: 'bold'
                }}
              />
              <StatItem
                label="Отзывы"
                value={gameDataDB?.rating_count}
                labelTextStyle={{
                  fontSize: 16,
                  textAlign: 'left',
                  color: 'rgba(255,255,255,0.8)'
                }}
                valueTextStyle={{
                  fontSize: 28,
                  fontWeight: 'bold'
                }}
              />
            </View>
          </View>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "white",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  container: {
    width: width - 24,
    height: 140,
    overflow: "hidden",
    borderRadius: 20,
  },
  row: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  img: {
    width: 90,
    height: 120,
    borderRadius: 12,
    backgroundColor: 'gray'
  }
});
