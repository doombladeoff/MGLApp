export type GameStatus = "total" | "finished" | "playing" | "dropped" | "want" | "pause";
export const GameStatusNames: Record<GameStatus, string> = {
  total: "Всего",
  finished: "Пройдено",
  playing: "Играю",
  dropped: "Брошено",
  want: "Хочу",
  pause: "На паузе",
};

export type GameRatingIconName = 'angry' | 'sad' | 'less' | 'netural' | 'happy' | 'calm' | 'gray';

export type GameUsersStatus = {
  label: string;
  value: number;
  icon: string;
};

export type GameDataDB = {
  created_at: string;
  id: string;
  rating_avg: number;
  rating_count: number;
  rating_sum: number;
  title: string | null;
  cover_url: string | null;
};
