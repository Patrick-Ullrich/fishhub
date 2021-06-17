import { useCallback, useEffect } from "react";

export enum EventEnum {
  LoadGame = "LoadGame",
  PlayGame = "PlayGame",
  CaughtFish = "CaughtFish",
  MissedFish = "MissedFish",
}

const useAnalytics = () => {
  const trackPlayGame = async () => {
    await fetch("/api/analytics", {
      body: JSON.stringify({ event: EventEnum.PlayGame }),
      method: "POST",
    });
  };

  const trackCaughtFish = async () => {
    console.log("here");
    await fetch("/api/analytics", {
      body: JSON.stringify({ event: EventEnum.CaughtFish }),
      method: "POST",
    });
  };

  const trackMissedFish = async () => {
    await fetch("/api/analytics", {
      body: JSON.stringify({ event: EventEnum.MissedFish }),
      method: "POST",
    });
  };

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
