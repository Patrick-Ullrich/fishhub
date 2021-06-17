import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useInterval,
  useTimeout,
} from "@chakra-ui/react";
import useCatcher from "./hooks/useCatcher";
import useFish from "./hooks/useFish";
import useProgressBar from "./hooks/useProgressBar";
import Image from "next/image";
import Fishy from "./Fishy-01.png";
import { Input } from "@chakra-ui/react";

import styles from "../../styles/Game.module.css";
import { useEffect, useState } from "react";
import { Subscription } from "../subscription/Subscription";
export const Game = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [time, setTime] = useState<number>(15000);

  useInterval(
    () => {
      setTime((prev) => (prev - 1000 <= 0 ? 0 : prev - 1000));
    },
    isPlaying ? 1000 : null
  );

  useEffect(() => {
    if (time === 0) {
      setGameOver(true);
      setIsPlaying(false);
    }
  }, [time]);

  const { onMouseDown, onMouseUp, isPressed } = useCatcher({ isPlaying });
  useFish({ isPlaying });
  useProgressBar({ isPlaying });

  return (
    <Box
      height="100vh"
      width="100%"
      bgGradient="linear(to-bl, rgb(57,193,205), rgb(0,100,168))"
    >
      <div className={styles.backgroundWrap}>
        <div className={`${styles.bubble} ${styles.x1}`}></div>
        <div className={`${styles.bubble} ${styles.x2}`}></div>
        <div className={`${styles.bubble} ${styles.x3}`}></div>
        <div className={`${styles.bubble} ${styles.x4}`}></div>
        <div className={`${styles.bubble} ${styles.x5}`}></div>
        <div className={`${styles.bubble} ${styles.x6}`}></div>
        <div className={`${styles.bubble} ${styles.x7}`}></div>
        <div className={`${styles.bubble} ${styles.x8}`}></div>
        <div className={`${styles.bubble} ${styles.x9}`}></div>
        <div className={`${styles.bubble} ${styles.x10}`}></div>
      </div>
      <Center height="100%" flexDirection="column">
        <Box backgroundColor="white" p={8} borderRadius="10px" mt={10}>
          <Flex alignItems="center" justifyContent="center" height="375px">
            <Box
              id="tank"
              width="40px"
              height="100%"
              bgGradient="linear(to-b, rgb(57,193,205), rgb(0,100,168))"
              borderRadius="8px"
              borderWidth="1px"
              borderColor="black"
              borderStyle="solid"
              position="relative"
            >
              <Box
                id="catcher"
                position="absolute"
                top="calc(100% - 50px)"
                opacity="0.5"
                backgroundColor="white"
                height="50px"
                width="38px"
                borderRadius="8px"
                willChange="top"
                transition="transform 1s ease"
              ></Box>
              <Box
                id="fish"
                width="25px"
                height="50px"
                position="absolute"
                top="calc(100% - 100px)"
                willChange="top"
                left="7.5px"
                transition="transform 0.2s ease-in"
              >
                <Image src={Fishy} alt="fish" />
              </Box>
            </Box>
            <Box
              id="catching-progress"
              position="relative"
              width="20px"
              height="90%"
              marginTop="10%"
              backgroundColor="blue.900"
              borderRightRadius="8px"
              overflowWrap="unset"
            >
              <Box
                right="-91px"
                top="195px"
                fontWeight="700"
                width="200px"
                position="absolute"
                color="rgb(239,175,48)"
                transform="rotate(90deg)"
              >
                Catch-O-Meter
              </Box>
              <Box
                position="absolute"
                bottom="0"
                id="catching-progress-filled-wrapper"
                overflow="hidden"
                willChange="height"
                height="0"
                width="19px"
                transition="transform 0.2s ease-in"
              >
                <Box
                  position="absolute"
                  bottom="1px"
                  id="catching-progress-filled"
                  zIndex="2"
                  height="calc(100% - 2px)"
                  width="19px"
                  borderRightRadius="8px"
                  bgGradient="linear(to-b, rgb(244,193,83), rgb(239,175,48))"
                ></Box>
              </Box>
            </Box>

            <Box
              backgroundColor="white"
              p={4}
              position="absolute"
              top="10px"
              right="10px"
              borderRadius="4px"
            >
              <Text fontSize="24px">
                <b>Score:</b> {time}
              </Text>
            </Box>
          </Flex>
          {!isPlaying ? (
            <Button
              mt={4}
              onClick={() => setIsPlaying(true)}
              color="white"
              bgGradient="linear(to-b, rgb(244,193,83), rgb(239,175,48))"
              _hover={{
                bgGradient: "linear(to-b, rgb(244,193,83), rgb(239,175,48))",
              }}
              width="100px"
            >
              START
            </Button>
          ) : (
            <Button
              onTouchStart={onMouseDown}
              onTouchEnd={onMouseUp}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              mt={4}
              width="100px"
              color="white"
              colorScheme="blue"
              backgroundColor="rgb(0,100,168)"
            >
              {isPressed ? `HOLD!` : `Catch'em!`}
            </Button>
          )}
        </Box>
      </Center>
      <Modal
        isOpen={gameOver}
        onClose={() => {
          setGameOver(false);
          setIsPlaying(false);
          setTime(15000);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Heading textAlign="center">Game Over</Heading>
            <Text textAlign="center" fontSize="18px" mt={4} fontStyle="italic">
              More fish in the Sea but the best fish are in our aqqua cast's
              tank, enter your email to join our mailing list
            </Text>
            <Box mt={8}>
              <Subscription />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
