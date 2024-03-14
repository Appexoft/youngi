import React from "react";
import { View, TouchableOpacity } from "react-native";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { useHebrew } from "~/i18n";
import Text from "../Text";
import { styles } from "./styles";

import ArrowBackIcon from "~/view/assets/icons/arrow-back.svg";

interface Props {
  label: string | undefined;
  onPress?: () => void;
}

const SmallHeader: React.FC<Props> = ({ label, onPress }) => {
  const isHebrew = useHebrew();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text
          fontSize={isHebrew ? textStyles.H6 : textStyles.H7}
          fontFamily={fonts.MEDIUM}
          color={colors.dark}
        >
          {label}
        </Text>
      </View>
      {onPress && (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <ArrowBackIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SmallHeader;
