import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

interface StatItemPorps {
  label: string;
  value: string;
  labelTextStyle?: StyleProp<TextStyle>;
  valueTextStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

export const StatItem = ({ label, value, labelTextStyle, valueTextStyle, style }: StatItemPorps) => {
  return (
    <View style={style}>
      <Text style={[{ color: "gray", fontSize: 20 }, labelTextStyle]}>{label}</Text>
      <Text style={[{ color: "white", fontWeight: "600", fontSize: 18 }, valueTextStyle]}>
        {value}
      </Text>
    </View>
  );
};