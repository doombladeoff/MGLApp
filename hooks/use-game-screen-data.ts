import { getGameById } from "@/api/getGame";
import { useSupabase } from "@/app/providers/SupabaseProvider";
import {
  GameDataDB,
  GameStatus,
  GameUsersStatus,
} from "@/app/types/GameTypes";
import { useUser } from "@clerk/clerk-expo";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";

export type GameDataUserDB = {
  created_at: string;
  game_id: string;
  id: number;
  rating: number;
  review: string;
  status: GameStatus;
  updated_at: string;
  user_id: string;
};

export function useGameScreenData({ gameId }: { gameId: string | number }) {
  const [game, setGame] = useState<any>(null);
  const [gameDataDB, setGameDataDB] = useState<GameDataDB>();
  const [gameDataUserDB, setGameDataUserDB] = useState<GameDataUserDB>();
  const [gameUsersStatus, setGameUserStatus] = useState<GameUsersStatus[]>([]);

  const isFirst = useRef(true);

  const supabase = useSupabase();
  const { user } = useUser();

  const fetchGameData = useCallback(async () => {
    const { data } = await supabase
      .from("games")
      .select("*")
      .eq("id", gameId)
      .single();

    return data;
  }, [supabase, gameId]);

  const fetchGameDataByUser = useCallback(async () => {
    if (!user?.id) return null;

    const { data } = await supabase
      .from("user_game_reviews")
      .select("*")
      .eq("game_id", gameId)
      .eq("user_id", user.id)
      .single();

    return data;
  }, [supabase, gameId, user]);

  const fetchStatusCounts = useCallback(async () => {
    const { data } = await supabase
      .from("user_game_reviews")
      .select("status")
      .eq("game_id", gameId);

    const counts: any = {
      finished: 0,
      playing: 0,
      want: 0,
      dropped: 0,
    };

    data?.forEach((item) => {
      if (counts[item.status] !== undefined)
        counts[item.status]++;
    });

    return [
      { label: "Пройдено", value: counts.finished, icon: "flag" },
      { label: "Играю", value: counts.playing, icon: "gamepad" },
      { label: "Хочу", value: counts.want, icon: "stars" },
      { label: "Брошено", value: counts.dropped, icon: "skull" },
    ];
  }, [supabase, gameId]);

  const loadAllData = useCallback(async () => {
    const [igdbGame, gameDB, userDB, statusList] = await Promise.all([
      getGameById(Number(gameId)).then((d) => d[0]),
      fetchGameData(),
      fetchGameDataByUser(),
      fetchStatusCounts(),
    ]);

    if (igdbGame?.screenshots) {
      igdbGame.screenshots = igdbGame.screenshots.map((s: any) => ({
        ...s,
        url: s.url.replace("t_thumb", "t_screenshot_big"),
      }));
    }

    setGame(igdbGame);
    setGameDataDB(gameDB);
    setGameDataUserDB(userDB);
    setGameUserStatus(statusList);
  }, [gameId, fetchGameData, fetchGameDataByUser, fetchStatusCounts]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);


  useFocusEffect(
    useCallback(() => {
      (async () => {
        if (isFirst.current) {
          isFirst.current = false;
          return;
        }

        console.log('[Focus fetch]')
        const [gameDB, userDB, statusList] = await Promise.all([
          fetchGameData(),
          fetchGameDataByUser(),
          fetchStatusCounts(),
        ]);

        setGameDataDB(gameDB);
        setGameDataUserDB(userDB);
        setGameUserStatus(statusList);
      }
      )();
    }, [fetchGameData, fetchGameDataByUser, fetchStatusCounts])
  );

  return { game, gameDataDB, gameDataUserDB, gameUsersStatus };
};