import { useState } from "react";
import { FlatList } from "react-native";
import { GameTab } from "./GameTab";

export type ActiveT = 'total' | 'finished' | 'playing' | 'dropped' | 'want' | 'pause';

export type TabsT = {
  key: ActiveT;
  label: string;
  icon: string;
  color: string;
};

const tabs: TabsT[] = [
  { key: "total", label: "Все", icon: "gamepad", color: '#fff' },
  { key: "finished", label: "Пройдено", icon: "flag", color: 'rgb(0,240,255)' },
  { key: "playing", label: "Играю", icon: "pacman", color: 'rgb(255,91,248)' },
  { key: "dropped", label: "Брошено", icon: "skull", color: 'rgb(255,121,79)' },
  { key: "want", label: "Хочу", icon: "stars", color: 'rgb(75,147,255)' },
  { key: "pause", label: "На пазе", icon: "hand", color: 'rgb(255,246,0)' },
] as const;

export function Tabs() {
  const [active, setActive] = useState<ActiveT>("total");

  return (
    <FlatList
      data={tabs}
      renderItem={({ item }) => <GameTab item={item} active={active} setActive={setActive} />}
      keyExtractor={(item) => item.key.toString()}
      contentContainerStyle={{
        gap: 25,
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 20
      }}
      showsHorizontalScrollIndicator={false}
      horizontal
      contentInsetAdjustmentBehavior='automatic'
    />
  );
};