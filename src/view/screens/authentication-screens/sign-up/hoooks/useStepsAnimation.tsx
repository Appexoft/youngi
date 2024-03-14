import { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface ReturnValues {
  width: Animated.Value;
}

export const useStepsAnimation = (isActive: boolean): ReturnValues => {
  const width = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const toWidth = isActive ? 1 : 0;
    Animated.timing(width, {
      toValue: toWidth,
      duration: 100,
      useNativeDriver: false,
    }).start(); // create transition animation after active step is changed
  }, [isActive]);

  return {
    width,
  };
};
