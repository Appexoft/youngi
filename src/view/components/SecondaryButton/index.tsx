import React, { memo } from "react";

import { TouchableOpacity, TextProps, TextStyle } from "react-native";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import Text from "../Text";
import { styles } from "./styles";

interface IProps extends TextProps, TextStyle {
  title: string;
  onPress?: () => void;
  style?: any;
  buttonSize?: string;
}

const SecondaryButton = ({
  style,
  title,
  onPress,
}: IProps) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text
        fontSize={textStyles.H4}
        fontFamily={fonts.SEMI_BOLD}
        color={colors.purpleLinear}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(SecondaryButton);
