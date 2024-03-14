import React, { memo } from "react";
import { FieldError } from "react-hook-form";

import {
  TextInput as DefaultTextInput,
  TextProps,
  TextStyle,
  View,
} from "react-native";

import { colors, fonts, textStyles } from "~/constants/designConstants";
import { useHebrew } from "~/i18n";
import Text from "../Text";
import { styles } from "./styles";

interface IProps extends TextProps, TextStyle {
  value: string;
  label: string;
  onChange: (value: any) => void;
  placeholder?: string;
  style?: any;
  isRight?: boolean;
  error?: FieldError;
}

// Custom TextInput component with custom styles

const PasswordInput = ({
  value,
  onChange,
  label,
  placeholder,
  style,
  isRight,
  error,
}: IProps) => {
  const isHebrew = useHebrew();

  return (
    <View style={[styles.container, isHebrew && styles.containerHebrew]}>
      <Text
        fontSize={textStyles.H5}
        fontFamily={fonts.MEDIUM}
        color={colors.dark}
      >
        {label}
      </Text>
      <DefaultTextInput
        value={value}
        onChangeText={(value) => onChange(value)}
        style={[
          styles.inputContainer,
          style,
          isRight && isHebrew && styles.inputContainerRight,
        ]}
        inputMode={"password"}
        placeholder={placeholder}
      />
      {error && (
        <View style={styles.errorWrapper}>
          <Text
            fontSize={textStyles.SMALL}
            fontFamily={fonts.REGULAR}
            color={colors.red}
          >
            {error.message}
          </Text>
        </View>
      )}
    </View>
  );
};

export default memo(PasswordInput);
