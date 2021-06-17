import { useEffect } from "react";

enum EventEnum {
  LoadGame = "LoadGame",
  PlayGame = "PlayGame",
}

const useAnalytics = () => {
  const trackPlayGame = async () => {
    await fetch("/api/analytics", {
      body: JSON.stringify({ event: EventEnum.PlayGame }),
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

  return { trackPlayGame };
};

export default useAnalytics;
