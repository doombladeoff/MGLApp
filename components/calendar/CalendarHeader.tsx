import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CalendarHeaderCenterProps {
  date: Date,
  changeDay: (v: number) => void,
  onChange: (event: any, selectedDate?: Date) => void,
};

function CalendarHeaderCenter({ date, changeDay, onChange, }: CalendarHeaderCenterProps) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 4 }}>
      <Pressable onPress={() => changeDay(-1)}>
        <Ionicons name="chevron-back" size={26} color="white" />
      </Pressable>

      <DateTimePicker
        value={date}
        mode='date'
        locale="ru-RU"
        display={"default"}
        onChange={onChange}
        themeVariant="dark"
        style={{ left: -5 }}
      />

      <Pressable onPress={() => changeDay(1)}>
        <Ionicons name="chevron-forward" size={26} color="white" />
      </Pressable>
    </View>
  );
};

interface CalendarHeaderRightProps {
  resetDay: () => void
};

function CalendarHeaderRight({ resetDay }: CalendarHeaderRightProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <Pressable
        onPress={resetDay}
        style={{ width: 35 }}>
        <Ionicons name="refresh" size={26} color="white" />
      </Pressable>
      <Pressable style={{ width: 35 }}>
        <Ionicons name="filter" size={26} color="white" />
      </Pressable>
    </View>
  );
};

interface CalendarHeaderProps {
  date: Date,
  changeDay: (v: number) => void,
  onChange: (event: any, selectedDate?: Date) => void,
  resetDay: () => void
};

function CalendarHeader({ date, changeDay, onChange, resetDay }: CalendarHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <BlurView intensity={80} tint="dark">
      <View style={{ marginBottom: 10, marginTop: insets.top, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
        <View>
          <Image source={require('@/assets/images/logoshort.svg')} style={{ height: 35, width: 100, marginLeft: 10 }} contentFit='contain' />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 4 }}>
          <Pressable onPress={() => changeDay(-1)}>
            <Ionicons name="chevron-back" size={26} color="white" />
          </Pressable>

          <DateTimePicker
            value={date}
            mode='date'
            locale="ru-RU"
            display={"default"}
            onChange={onChange}
            themeVariant="dark"
            style={{ left: -5 }}
          />

          <Pressable onPress={() => changeDay(1)}>
            <Ionicons name="chevron-forward" size={26} color="white" />
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Pressable
            onPress={resetDay}
            style={{ width: 35 }}>
            <Ionicons name="refresh" size={26} color="white" />
          </Pressable>
          <Pressable style={{ width: 35 }}>
            <Ionicons name="filter" size={26} color="white" />
          </Pressable>
        </View>

      </View>
    </BlurView>
  );
};

export { CalendarHeader, CalendarHeaderCenter, CalendarHeaderRight };
