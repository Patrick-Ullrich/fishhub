import { useInterval } from "@chakra-ui/react";
import { useRef } from "react";

interface IProps {
  isPlaying: boolean;
}

const useFish = ({ isPlaying }: IProps) => {
  const yRef = useRef(5);
  const randomPositionRef = useRef<number | null>(null);
  const randomCountdownRef = useRef<number | null>(null);
  const speedRef = useRef(10);

  useInterval(
    () => {
      const tank = document.getElementById("tank")!;
      const fish = document.getElementById("fish")!;

      if (
        (!randomPositionRef.current || randomCountdownRef?.current) ??
        0 < 0
      ) {
        randomPositionRef.current =
          Math.ceil(
            Math.random() *
              ((tank.clientHeight ?? 0) - (fish.clientHeight ?? 0))
          ) * -1;
        randomCountdownRef.current = Math.abs(
          yRef.current - randomPositionRef.current
        );
        speedRef.current = Math.abs(Math.random() * (20 - 1) + 1);
      }

      if (randomPositionRef.current < yRef.current) {
        yRef.current -= speedRef.current;
      } else {
        yRef.current += speedRef.current;
      }

      fish.style.transform = `translateY(${yRef.current}px)`;
      randomCountdownRef.current =
        (randomCountdownRef.current ?? 0) - speedRef.current;
    },
    isPlaying ? 125 : null
  );
};

export default useFish;
