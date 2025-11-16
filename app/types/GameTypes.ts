export type GameStatus = "total" | "finished" | "playing" | "dropped" | "want" | "pause";
export const GameStatusNames: Record<GameStatus, string> = {
  total: "Всего",
  finished: "Пройдено",
  playing: "Играю",
  dropped: "Брошено",
  want: "Хочу",
  pause: "Пауза",
};

export type GameRatingIconName = 'angry' | 'sad' | 'less' | 'netural' | 'happy' | 'calm' | 'gray';
