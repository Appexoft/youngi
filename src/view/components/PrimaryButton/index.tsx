import React, { memo } from "react";

import { TouchableOpacity, TextProps, TextStyle } from "react-native";
import {
  colors,
  fonts,
  getColorWithOpacity,
  textStyles,
} from "~/constants/designConstants";
import Text from "../Text";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "./styles";

interface IProps extends TextProps, TextStyle {
  title: string;
  onPress?: () => void;
  style?: any;
  buttonSize?: string;
  disabled?: boolean;
}

const PrimaryButton = ({
  style,
  title,
  onPress,
  buttonSize = "default",
  disabled,
}: IProps) => {
  const getLinearGradient = () => {
    const arrayColor = ["#CA30FF", "#D354FF", "#CA30FF"];
    if (disabled) {
      return arrayColor.map((item) => getColorWithOpacity(item, 0.6));
    } else {
      return arrayColor
    }
  };

  return (
    <LinearGradient
      colors={getLinearGradient()}
      start={{ x: 0.9, y: 0.1 }}
      end={{ x: 0.1, y: 0 }}
      style={[
        styles.container,
        buttonSize === "small" && styles.containerSmall,
        style,
      ]}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        disabled={disabled}
      >
        <Text
          fontSize={textStyles.H5}
          fontFamily={fonts.SEMI_BOLD}
          color={colors.white}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default memo(PrimaryButton);
