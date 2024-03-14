import React, { memo, useEffect, useState, version } from "react";
import { FieldError } from "react-hook-form";

import { TextInput as DefaultTextInput, TextProps, TextStyle, TouchableOpacity, View } from "react-native";

import { colors, fonts, textStyles } from "~/constants/designConstants";
import Text from "../Text";
import { styles } from "./styles";

import EyeIcon from "~/view/assets/icons/eye.svg";
import EyeCloseIcon from "~/view/assets/icons/eye-close.svg";
import { useIOS } from "~/helpers/useIOS";
import { verticalScale } from "~/constants/metrics";

interface IProps extends TextProps, TextStyle {
  value: string;
  label?: string;
  placeholder?: string;
  style?: any;
  isRight?: boolean;
  isNumber?: boolean;
  error?: FieldError;
  isPassword?: boolean;
  isHebrew?: boolean;
  labelSize?: number;
  placeholderColor?: string;
  defaultValue?: string;
  isPhone?: boolean;
  color?: string;
  isBudget?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange: (value: any) => void;
  maxLength?: number;
}

// Custom TextInput component with custom styles

const TextInput = ({ value, label, placeholder, style, isRight, isNumber, isPassword, error, isHebrew, labelSize, placeholderColor, isPhone, color, isBudget, onChange, onFocus, onBlur, maxLength }: IProps) => {
  const [hidePassword, setHidePassword] = useState<boolean | undefined>(isPassword);
  const [showPhonePlaceholder, setShowPhonePlaceholder] = useState<boolean>(false);
  const isIOS = useIOS();

  useEffect(() => {
    if (isPhone) {
      if (value.length !== 2) {
        setShowPhonePlaceholder(false);
      } else {
        setShowPhonePlaceholder(true);
      }
    }
  }, [isPhone, value]);

  const showPassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={[styles.container, isIOS && styles.containerHebrew]}>
      {label && (
        <Text fontSize={labelSize ?? textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.dark}>
          {label}
        </Text>
      )}

      <DefaultTextInput
        value={value}
        onChangeText={(value) => onChange(value)}
        style={[
          style,
          isIOS ? (isPhone ? styles.inputContainer : styles.inputContainerRight) : styles.inputContainer,
          color && {
            backgroundColor: color,
          },
        ]}
        inputMode={isNumber ? "tel" : "text"}
        placeholder={isPhone ? undefined : placeholder}
        placeholderTextColor={placeholderColor ?? "#A09BA5"}
        secureTextEntry={hidePassword}
        onFocus={onFocus}
        onBlur={onBlur}
        maxLength={maxLength}
      />
      {showPhonePlaceholder && (
        <View style={[isIOS ? styles.phoneNumberPlaceholder : styles.phoneNumberPlaceholderAndroid]}>
          <Text fontSize={isIOS ? textStyles.H7 : 14} fontFamily={fonts.REGULAR} color={placeholderColor}>
            0 0000000
          </Text>
        </View>
      )}
      {isBudget && (
        <View style={isIOS ? styles.budgetPlaceholderIOS : styles.budgetPlaceholder}>
          <Text fontSize={isIOS ? textStyles.H5 : 14} fontFamily={fonts.REGULAR} color={colors.dark}>
            ₪
          </Text>
        </View>
      )}
      {error && (
        <View
          style={[
            styles.errorWrapper,
            {
              bottom: error.message && error.message.length > 30 ? verticalScale(-30) : verticalScale(-15),
            },
          ]}
        >
          <Text fontSize={textStyles.SMALL} fontFamily={fonts.REGULAR} color={colors.red} textAlign="right">
            {error.message}
          </Text>
        </View>
      )}
      {isPassword && (
        <TouchableOpacity style={[styles.showPasswordWrapper, isIOS && styles.showPasswordWrapperHebrew]} onPress={showPassword}>
          {hidePassword ? <EyeIcon color={colors.dark} /> : <EyeCloseIcon fill={colors.dark} />}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(TextInput);
