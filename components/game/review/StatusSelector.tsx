import { GameStatus, GameStatusNames } from "@/app/types/GameTypes";
import { GameTabIcon } from "@/components/user/Tabs/GameTabIcon";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type GAME_STATUSES_T = {
  s: GameStatus,
  icon: string,
  color: string,
};

const GAME_STATUSES: GAME_STATUSES_T[] = [
  { s: "finished", icon: "flag", color: 'rgb(0,240,255)' },
  { s: "playing", icon: "pacman", color: 'rgb(255,91,248)' },
  { s: "dropped", icon: "skull", color: 'rgb(255,121,79)' },
  { s: "want", icon: "stars", color: 'rgb(75,147,255)' },
  { s: "pause", icon: "hand", color: 'rgb(255,246,0)' },
] as const;

interface StatusSelectorProps {
  value: GameStatus | null;
  onChange: (v: GameStatus) => void;
};

export const StatusSelector = ({ value, onChange }: StatusSelectorProps) => {
  return (
    <View style={styles.container}>
      {GAME_STATUSES.map((status) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={status.s}
          style={[
            styles.button,
            value === status.s && {
              backgroundColor: status.color,
              borderColor: status.color,
            },
          ]}
          onPress={() => onChange(status.s)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text
              style={[
                styles.text,
                value === status.s && styles.textActive,
              ]}
            >
              {GameStatusNames[status.s]}
            </Text>
            <GameTabIcon name={status.icon} color={value === status.s ? 'black' : 'white'} />
          </View>

        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingBottom: 20,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: "rgba(255,255,255,0.1)",
  },
  text: {
    color: "#fff",
    fontSize: 14,
  },
  textActive: {
    color: '#000',
    fontSize: 14,
  },
});
