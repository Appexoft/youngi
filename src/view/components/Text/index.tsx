import React, { memo } from "react";

import {
  Text as DefaultText,
  TextProps,
  StyleProp,
  TextStyle,
} from "react-native";

import { colors, fonts } from "~/constants/designConstants";
import { moderateScale } from "~/constants/metrics";
import { useIOS } from "~/helpers/useIOS";

interface IProps extends TextProps, TextStyle {
  children?: string | number;
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  weight?: "bold" | "normal";
  center?: boolean;
  textDecorationLine?:
    | "none"
    | "underline"
    | "line-through"
    | "underline line-through"
    | undefined;
  fontFamily?: string;
  onPress?: () => void;
  style?: any;
}

// Custom text component with custom styles
const Text = ({
  children,
  fontSize,
  color,
  center,
  textDecorationLine,
  fontFamily,
  lineHeight,
  textTransform,
  textAlign,
  onPress,
  style,
  ...otherProps
}: IProps) => {
  const isIOS = useIOS();
  return (
    <DefaultText
      {...otherProps}
      onPress={onPress}
      style={[
        style,
        {
          fontSize: moderateScale(fontSize || 14),
          color: color || colors.white,
          fontFamily: fontFamily || fonts.REGULAR,
          // textAlign: textAlign || (center ? "center" : "left"),
          textAlign: textAlign || (isIOS ? "right" : "left"),
          textDecorationLine: textDecorationLine || "none",
          textTransform: textTransform || "none",
        } as StyleProp<TextStyle>,
      ]}
    >
      {children}
    </DefaultText>
  );
};

export default memo(Text);
