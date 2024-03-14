import React from "react";
import { Animated } from "react-native";
import { useStepsAnimation } from "../../hoooks/useStepsAnimation";
import { styles } from "./styles";

interface Props {
  isActive: boolean;
  isPassed: boolean;
}

const HeaderStepItem: React.FC<Props> = ({ isActive, isPassed }) => {
  const { width } = useStepsAnimation(isActive);

  return (
    <Animated.View
      style={[
        styles.stepItem,
        {
          width: width.interpolate({
            inputRange: [0, 1],
            outputRange: [4, 80],
          }),
        },
        (isActive || isPassed) && styles.stepItemActive,
      ]}
    ></Animated.View>
  );
};

export default HeaderStepItem;
