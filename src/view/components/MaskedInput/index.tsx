import React, { memo, useEffect, useState } from "react";
import { FieldError } from "react-hook-form";

import {
  Keyboard,
  TextProps,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

import { colors, fonts, textStyles } from "~/constants/designConstants";
import Text from "../Text";
import { styles } from "./styles";

import EyeIcon from "~/view/assets/icons/eye.svg";
import EyeCloseIcon from "~/view/assets/icons/eye-close.svg";
import { useIOS } from "~/helpers/useIOS";
import MaskInput from "react-native-mask-input";

import PhoneBook from "~/view/assets/icons/phone-book.svg";
import { useNavigation } from "@react-navigation/native";
import { verticalScale } from "~/constants/metrics";

interface IProps extends TextProps, TextStyle {
  value: string;
  label?: string;
  onChange: (value: any) => void;
  placeholder?: string;
  style?: any;
  error?: FieldError;
  isPassword?: boolean;
  isHebrew?: boolean;
  labelSize?: number;
  placeholderColor?: string;
  defaultValue?: string;
  type: string;
  isPhone?: boolean;
  onPhonePress?: () => void;
}

const MaskedInput = ({
  value,
  onChange,
  label,
  placeholder,
  style,
  isPassword,
  error,
  isHebrew,
  labelSize,
  placeholderColor,
  type,
  isPhone,
  onPhonePress,
}: IProps) => {
  const [hidePassword, setHidePassword] = useState<boolean | undefined>(
    isPassword
  );
  const [showPhonePlaceholder, setShowPhonePlaceholder] =
    useState<boolean>(false);
  const isIOS = useIOS();
  const navigation = useNavigation();

  useEffect(() => {
    if (type === "phone") {
      if (value.length !== 2) {
        setShowPhonePlaceholder(false);
      } else {
        setShowPhonePlaceholder(true);
      }
    }
  }, [type, value]);

  useEffect(() => {
    if (isPhone && value.length === 11) {
      Keyboard.dismiss();
    }
  }, [value, isPhone]);

  const showPassword = () => {
    setHidePassword(!hidePassword);
  };

  const getMask = (type: string): (string | RegExp)[] => {
    switch (type) {
      case "phone":
        return [
          "",
          /\d/,
          /\d/,
          /\d/,
          " ",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ];
      case "id":
        return [/\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
      default:
        return [/\d/, /\d/, /\d/];
    }
  };

  return (
    <View style={[styles.container, isIOS && styles.containerHebrew]}>
      {label && (
        <Text
          fontSize={labelSize ?? textStyles.H5}
          fontFamily={fonts.MEDIUM}
          color={colors.dark}
        >
          {label}
        </Text>
      )}

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          marginTop: verticalScale(8),
        }}
      >
        <MaskInput
          value={value}
          onChangeText={(masked, unmasked) => {
            if (type === "phone" && masked.startsWith("05")) {
              onChange(masked);
            } else if (type === "id") {
              onChange(masked);
            }
          }}
          style={[
            style,
            type === "phone"
              ? // ? isPhone
                //   ? styles.inputContainerPhone
                styles.inputContainer
              : styles.inputContainerRight,
          ]}
          placeholder={type === "phone" ? undefined : placeholder}
          mask={getMask(type)}
          keyboardType="numeric"
        />
        {/* {isPhone && onPhonePress && (
          <TouchableOpacity
            style={styles.phoneButton}
            onPress={() => onPhonePress()}
          >
            <PhoneBook />
          </TouchableOpacity>
        )} */}
        {showPhonePlaceholder && (
          <View
            style={[
              isIOS
                ? styles.phoneNumberPlaceholder
                : styles.phoneNumberPlaceholderAndroid,
            ]}
          >
            <Text
              fontSize={14}
              fontFamily={fonts.REGULAR}
              color={placeholderColor}
              // style={[isPhone && styles.phoneContainer]}
            >
              0 0000000
            </Text>
          </View>
        )}
      </View>

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
      {isPassword && (
        <TouchableOpacity
          style={[
            styles.showPasswordWrapper,
            isHebrew && styles.showPasswordWrapperHebrew,
          ]}
          onPress={showPassword}
        >
          {hidePassword ? (
            <EyeIcon color={colors.dark} />
          ) : (
            <EyeCloseIcon fill={colors.dark} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(MaskedInput);
