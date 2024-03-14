import { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface ReturnValues {
  height: Animated.Value;
}

export const useConfirmAnimation = (
  isConfirm: boolean
): ReturnValues => {
  const height = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const toHeight = isConfirm ? 1 : 0;
    Animated.parallel([
      Animated.timing(height, {
        toValue: toHeight,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isConfirm]);

  return {
    height,
  };
};
