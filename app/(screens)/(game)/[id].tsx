import HeaderImge from "@/components/game/HeaderImage";
import { MetaRow } from "@/components/game/MetaRow";
import { ScreenshotsList } from "@/components/game/ScreenshotsList";
import { StatsCard } from "@/components/game/StatsCard";
import { UserRatingCard } from "@/components/game/UserRatingCard";
import { UsersCompleteStatus } from "@/components/game/UsersCompleteStatus";
import { GameGenres } from "@/constants/genres";
import { useGameScreenData } from "@/hooks/use-game-screen-data";
import { useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function GameScreen() {
  const { id: gameId } = useLocalSearchParams<{ id: string }>();

  const {
    game,
    gameDataDB,
    gameDataUserDB,
    gameUsersStatus
  } = useGameScreenData({ gameId: gameId });

  const { user } = useUser();

  if (!game) return null;

  const cover = game?.cover?.url?.replace("t_thumb", "t_cover_big");

  const developers = game?.involved_companies
    ?.filter((el: any) => el.developer)
    ?.map((el: any) => el.company.name)
    ?.join(", ");

  const publishers = game?.involved_companies
    ?.filter((el: any) => el.publisher)
    ?.map((el: any) => el.company.name)
    ?.join(", ");

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: 40,
          backgroundColor: "black",
          paddingTop: 170

        }}
        showsVerticalScrollIndicator={false}
      >
        <HeaderImge screenshots={game?.screenshots || []} />
        <View>
          <StatsCard cover={cover} gameDataDB={gameDataDB} />
          {(user) && (
            <UserRatingCard
              gameDataUserDB={gameDataUserDB}
              gameData={gameDataDB}
              game={game}
            />
          )}

          <View style={{ paddingTop: 20 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "white",
                marginBottom: 4,
              }}
            >
              {game.name}
            </Text>
            <Text style={{ fontSize: 15, color: "gray" }}>
              {game?.release_dates?.[0]?.y ?? "—"} |{" "}
              {game.version_parent || game.parent_game
                ? "Дополнение"
                : "Основная игра"}
            </Text>
          </View>

          <UsersCompleteStatus gameUsersStatus={gameUsersStatus || []} />

          <View style={{ marginTop: 24, gap: 6 }}>
            <MetaRow label="Разработчики" value={developers || "—"} />
            <MetaRow label="Издатели" value={publishers || "—"} />
            <MetaRow
              label="Жанры"
              value={
                game?.genres?.map((el: any) =>
                  GameGenres[el.id as keyof typeof GameGenres] ?? 'Неизвестно')
                  .join(", ")
              }
            />
            <MetaRow
              label="Платформы"
              value={game?.platforms?.map((el: any) => el.name).join(", ")}
            />
          </View>

          {game?.summary && (
            <View style={{ paddingTop: 24 }}>
              <Text style={{ color: "gray", fontSize: 16, lineHeight: 22 }}>
                {game.summary}
              </Text>
            </View>
          )}

          {game?.screenshots?.length > 0 && (
            <View style={{ paddingTop: 20 }}>
              <ScreenshotsList screenshots={game.screenshots} />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};