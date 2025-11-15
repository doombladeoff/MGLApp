import { useUser } from "@clerk/clerk-expo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { PlatformColor, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";

export function UserCard() {
  const { user } = useUser();

  if (!user) return;

  return (
    <View
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
        backgroundColor: "#1d1e22",
      }}
    >
      <View style={{
        padding: 20,
      }}>
        <BlurView
          intensity={50}
          tint="dark"
          style={{
            position: "absolute",
            inset: 0,
            transform: [{ scale: 1.1 }],
            opacity: 0.5,
          }}
        />
        <LinearGradient
          colors={[
            "rgba(29,30,34,1)",
            "rgba(29,30,34,0.8)",
            "rgba(29,30,34,0)",
          ]}
          locations={[0, 0.15, 1]}
          style={{
            position: "absolute",
            inset: 0,
            transform: [{ scale: 1.1 }],
            height: "100%",
            width: "100%",
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            zIndex: 10,
          }}
        >
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Image
              source={{
                uri: user.imageUrl
              }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 80,
              }}
            />
            <View>
              <Text
                numberOfLines={2}
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  maxWidth: 180,
                }}
              >
                {user.fullName}
              </Text>

              <Text
                numberOfLines={1}
                style={{
                  marginTop: 4,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                @{user.firstName}
              </Text>

              {user.hasVerifiedEmailAddress && (
                <View style={{
                  marginTop: 10, borderWidth: 1, borderRadius: 100, paddingHorizontal: 20, paddingVertical: 4, borderColor: 'rgb(43, 223, 33)',
                  shadowColor: 'rgb(43, 223, 33)',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.3,
                  shadowRadius: 6
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <MaterialIcons name="verified" size={18} color='rgb(43, 223, 33)' />
                    <Text style={{ color: 'rgb(43, 223, 33)' }}>Verify</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <Link href={'/user/profile-edit'} asChild>
            <TouchableOpacity>
              <IconSymbol name='square.and.pencil' size={30} color={PlatformColor('link')} />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};
