import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Link href={{ pathname: '/(screens)/(game)/[id]', params: { id: 1942 } }} asChild>
        <Pressable>
          <Text style={{ color: 'white' }}>GAME</Text>
        </Pressable>
      </Link>

      <Link href={{ pathname: '/(screens)/(game)/[id]', params: { id: 13166 } }} asChild>
        <Pressable>
          <Text style={{ color: 'white' }}>GAME 13166</Text>
        </Pressable>
      </Link>
    </View>
  );
}
