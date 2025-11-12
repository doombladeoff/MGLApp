import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function CalendarScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Link href={{ pathname: '/(screens)/(game)/[id]', params: { id: 123 } }} asChild>
        <Pressable>
          <Text style={{ color: 'white' }}>GAME</Text>
        </Pressable>
      </Link>
    </View>
  )
}