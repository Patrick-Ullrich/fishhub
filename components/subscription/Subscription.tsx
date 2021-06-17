import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import confetti from "canvas-confetti";

function fire(particleRatio: any, opts: any) {
  confetti(
    Object.assign(
      {},
      { origin: { y: 0.7 } },
      { ...opts, colors: ["#ee5d68", "#073345", "#87bdc4"] },
      {
        particleCount: Math.floor(200 * particleRatio),
      }
    )
  );
}

export const Subscription = () => {
  // 1. Create a reference to the input so we can fetch/clear it's value.
  const inputEl = useRef(null);
  // 2. Hold a message in state to handle the response from our API.
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const onSuccess = () => {
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const subscribe = async (e: any) => {
    setError("");
    setMessage("");
    e.preventDefault();
    setLoading(true);
    // 3. Send a request to our API with the user's email address.
    const res = await fetch("/api/subscribe", {
      body: JSON.stringify({
        email: (inputEl?.current as any).value || "",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();
    setLoading(false);

    if (error) {
      // 4. If there was an error, update the message in state.
      setError(error);
      return;
    }

    // 5. Clear the input value and show a success message.
    (inputEl?.current as any).value = "";
    setMessage("Subscribed! 🎉");
    onSuccess();
  };

  return (
    <>
      <FormControl id="email" isInvalid={!!error}>
        <FormLabel htmlFor="email">Subscribe to our Newsletter</FormLabel>
        <Input
          id="email"
          ref={inputEl}
          type="email"
          placeholder="Email"
          width="100%"
        />
        {error ? (
          <FormErrorMessage>{error}</FormErrorMessage>
        ) : message ? (
          <FormHelperText color="green.400">{message}</FormHelperText>
        ) : (
          <FormHelperText>No spam, just fish!</FormHelperText>
        )}
      </FormControl>
      <Button
        mt={4}
        color="white"
        width="100%"
        bgGradient="linear(to-b, rgb(244,193,83), rgb(239,175,48))"
        _hover={{
          bgGradient: "linear(to-b, rgb(244,193,83), rgb(239,175,48))",
        }}
        type="submit"
        rightIcon={<span>💌</span>}
        onClick={subscribe}
        isLoading={isLoading}
      >
        Subscribe
      </Button>
    </>
  );
};
