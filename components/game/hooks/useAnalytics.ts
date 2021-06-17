import { useCallback, useEffect } from "react";

export enum EventEnum {
  LoadGame = "LoadGame",
  PlayGame = "PlayGame",
  CaughtFish = "CaughtFish",
  MissedFish = "MissedFish",
}

const useAnalytics = () => {
  const trackPlayGame = useCallback(
    () => async () => {
      await fetch("/api/analytics", {
        body: JSON.stringify({ event: EventEnum.PlayGame }),
        method: "POST",
      });
    },
    []
  );

  const trackCaughtFish = useCallback(
    () => async () => {
      await fetch("/api/analytics", {
        body: JSON.stringify({ event: EventEnum.CaughtFish }),
        method: "POST",
      });
    },
    []
  );

  const trackMissedFish = useCallback(
    () => async () => {
      await fetch("/api/analytics", {
        body: JSON.stringify({ event: EventEnum.MissedFish }),
        method: "POST",
      });
    },
    []
  );

  useEffect(() => {
    const trackLoadGame = async () => {
      await fetch("/api/analytics", {
        body: JSON.stringify({ event: EventEnum.LoadGame }),
        method: "POST",
      });
    };
    trackLoadGame();
  }, []);

  return { trackPlayGame, trackCaughtFish, trackMissedFish };
};

export default useAnalytics;
