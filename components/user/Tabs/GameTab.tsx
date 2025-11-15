import { Dispatch, SetStateAction, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { ActiveT, TabsT } from ".";
import { GameTabIcon } from "./GameTabIcon";

const count = 4;

export const GameTab = ({ item, active, setActive }: { item: TabsT, active: ActiveT, setActive: Dispatch<SetStateAction<ActiveT>> }) => {
  const isActive = active === item.key;
  const color = isActive ? item.color : "rgb(162,163,166)";

  const anim = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: anim.value }]
  }));

  useEffect(() => {
    anim.value = withTiming(-20 * count, { duration: 800 });
  }, []);

  return (
    <TouchableOpacity onPress={() => setActive(item.key)}>
      <View style={{ alignItems: "center", gap: 4, borderBottomWidth: 2, borderBottomColor: isActive ? item.color : "transparent" }}>
        <View style={{ alignItems: "center", gap: 4 }}>
          <Text style={{ color, fontSize: 12 }}>{item.label}</Text>
          <GameTabIcon name={item.icon} color={color} />
        </View>

        <View style={{ height: 20, width: 10, overflow: "hidden" }}>
          <Animated.View style={animatedStyles}>
            {Array.from({ length: 20 }).map((_, i) => (
              <View key={i} style={{ height: 20, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color, fontSize: 14, fontWeight: "bold" }}>{i % 10}</Text>
              </View>
            ))}
          </Animated.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
