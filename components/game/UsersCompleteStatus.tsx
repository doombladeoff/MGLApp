import { GameUsersStatus } from "@/app/types/GameTypes";
import { Text, View } from "react-native";
import { GameTabIcon } from "../user/Tabs/GameTabIcon";

export const UsersCompleteStatus = ({ gameUsersStatus }: { gameUsersStatus: GameUsersStatus[] }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 24,
        marginHorizontal: 8,
      }}
    >
      {gameUsersStatus.map((item: GameUsersStatus) => (
        <View key={item.label} style={{ alignItems: 'flex-start' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ color: "gray", fontSize: 14 }}>{item.label}</Text>
            <GameTabIcon name={item.icon} color="gray" />
          </View>
          <Text
            style={{
              fontWeight: "bold",
              color: "rgba(255,255,255,0.5)",
              fontSize: 15,
              marginTop: 2,
            }}
          >
            {item.value}
          </Text>
        </View>
      ))}
    </View>
  );
};