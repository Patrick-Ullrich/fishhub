import { useInterval } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface IProps {
  isPlaying: boolean;
}

const useProgressBar = ({ isPlaying }: IProps) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!isPlaying) {
      setProgress(0);
    }
  }, [isPlaying]);

  // Detect Collision
  useInterval(
    () => {
      const catcher = document.getElementById("catcher")!;
      const fish = document.getElementById("fish")!;
      const wrapper = document.getElementById(
        "catching-progress-filled-wrapper"
      )!;

      const { y: yCatcher } = catcher.getBoundingClientRect();
      const { y: yFish } = fish.getBoundingClientRect();
      const catcherHeight = 50;
      const fishHeight = 50;

      // collision
      if (
        (yFish < yCatcher && yFish > yCatcher - catcherHeight) ||
        (yFish - fishHeight < yCatcher &&
          yFish - fishHeight > yCatcher - catcherHeight)
      ) {
        setProgress((prev) => (prev + 5 >= 100 ? 100 : prev + 5));
      } else {
        setProgress((prev) => (prev - 1 <= 0 ? 0 : prev - 2));
      }

      wrapper.style.height = progress + "%";
    },
    isPlaying ? 125 : null
  );

  return {
    progress,
    resetProgress: () => {
      setProgress(0);
      document.getElementById(
        "catching-progress-filled-wrapper"
      )!.style.height = 0 + "%";
    },
  };
};

export default useProgressBar;
