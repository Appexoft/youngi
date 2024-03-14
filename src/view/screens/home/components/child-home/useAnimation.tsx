import { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface ReturnValues {
  width: Animated.Value;
}

export const useAnimation = (): ReturnValues => {
  const width = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(width, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, []);

  return {
    width,
  };
};
