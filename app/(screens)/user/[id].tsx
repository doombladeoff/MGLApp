import { useSupabase } from "@/app/providers/SupabaseProvider";
import { UserCard } from "@/components/user/UserCard";
import { useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams } from "expo-router";
import { Alert, Button, ScrollView } from "react-native";

type GameStatus = "total" | "finished" | "playing" | "dropped" | "want" | "pause";
interface UserGame {
  game_id: string;
  title: string;
  cover_url: string | null;
  rating: number | null;
  review: string | null;
  status: GameStatus;
}

export default function UserScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useUser();
  const supabase = useSupabase();

  if (!user) return;

  async function addGameAndReview({
    gameId,
    gameTitle = null,
    gameCover = null,
    userId,
    rating = null,
    review = null,
    status = null,
  }: {
    gameId: any,
    gameTitle: any,
    gameCover: any,
    userId: any,
    rating: any,
    review: any,
    status: any,
  }) {
    // 1. Проверяем — существует ли игра
    const { data: existingGame, error: gameCheckError } = await supabase
      .from("games")
      .select("id")
      .eq("id", gameId)
      .single();

    if (gameCheckError && gameCheckError.code !== "PGRST116") {
      console.error("Ошибка проверки игры:", gameCheckError);
      throw gameCheckError;
    }

    // 2. Если игры нет — создаём
    if (!existingGame) {
      const { error: insertGameError } = await supabase
        .from("games")
        .insert({
          id: gameId,
          title: gameTitle,
          cover_url: gameCover,
        });

      if (insertGameError) {
        console.error("Ошибка создания игры:", insertGameError);
        throw insertGameError;
      }
    }

    // 3. Добавляем или обновляем отзыв пользователя
    const { data: reviewData, error: reviewError } = await supabase
      .from("user_game_reviews")
      .upsert(
        {
          user_id: userId,
          game_id: gameId,
          rating,
          review,
          status,
        },
        { onConflict: "user_id,game_id" }
      )
      .select("*")
      .single();

    if (reviewError) {
      console.error("Ошибка сохранения отзыва:", reviewError);
      throw reviewError;
    }

    return reviewData;
  }

  async function getUserGamesByStatus(userId: string) {
    const { data, error } = await supabase
      .from("user_game_reviews")
      .select(`
      game_id,
      rating,
      review,
      status,
      games (
        title,
        cover_url
      )
    `)
      .eq("user_id", userId);

    if (error) {
      console.error("Ошибка получения игр юзера:", error);
      return null;
    }

    const games: UserGame[] = data.map((item: any) => ({
      game_id: item.game_id,
      rating: item.rating,
      review: item.review,
      status: item.status,
      title: item.games.title,
      cover_url: item.games.cover_url,
    }));

    const grouped = {
      total: games,
      finished: games.filter(g => g.status === "finished"),
      playing: games.filter(g => g.status === "playing"),
      dropped: games.filter(g => g.status === "dropped"),
      want: games.filter(g => g.status === "want"),
      pause: games.filter(g => g.status === "pause"),
    };

    return grouped;
  }

  const testInsert = async () => {
    const { data, error } = await supabase
      .from('Test')
      .insert({ test: 'Test field', user: user.id });
    console.error(error);
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .neq('id', user.id);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      console.log(data);
    }
  };

  const addRew = async () => {
    await addGameAndReview({
      gameId: "1942",
      gameTitle: 'Ведьмак 3',
      gameCover: `https://images.igdb.com/igdb/image/upload/t_cover_big/coaarl.jpg`,
      userId: user.id,
      rating: 7,
      review: "Отличная игра!",
      status: "finished",
    });
  };

  const fetchUserGames = async () => {
    const userGames = await getUserGamesByStatus(user.id);
    console.log('USER GAMES:', userGames)
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 14 }}
      contentInsetAdjustmentBehavior='automatic'>
      <UserCard />
      <Button title="test insert" onPress={testInsert} />
      <Button title="fetch users" onPress={fetchUsers} />
      <Button title="add gamr" onPress={addRew} />
      <Button title="fetch user games" onPress={fetchUserGames} />
    </ScrollView>
  );
};