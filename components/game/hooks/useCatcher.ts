import { useInterval } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

interface IProps {
  isPlaying: boolean;
}

const useCatcher = ({ isPlaying }: IProps) => {
  const keyPressedRef = useRef<boolean>(false);

  const onMouseDown = () => {
    keyPressedRef.current = true;
  };

  const onMouseUp = () => {
    keyPressedRef.current = false;
  };

  useInterval(
    () => {
      const catcher = document.getElementById("catcher")!;
      if (keyPressedRef.current) {
        catcher.style.transform = `translateY(-325px)`;
      } else {
        catcher.style.transform = `translateY(0px)`;
      }
    },
    isPlaying ? 125 : null
  );

  useEffect(() => {
    if (!isPlaying) {
      document.getElementById("catcher")!.style.transform = `translateY(0px)`;
    }
  }, [isPlaying]);

  return { onMouseDown, onMouseUp, isPressed: keyPressedRef.current };
};

export default useCatcher;
