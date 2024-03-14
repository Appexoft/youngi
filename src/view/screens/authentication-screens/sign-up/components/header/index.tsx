import React, { memo } from "react";

import { View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import HeaderStepItem from "./HeaderStepItem";

import SignUpArrowIcon from "~/view/assets/icons/sign-up-arrows.svg";
import ArrowBackIcon from "~/view/assets/icons/arrow-back.svg";
import { verticalScale } from "~/constants/metrics";
import { useIOS } from "~/helpers/useIOS";

interface Props {
  activeStep: number;
  goBack: (step: number) => void;
  title: string;
}

const SignUpHeader: React.FC<Props> = ({ activeStep, goBack, title }) => {
  const isIOS = useIOS();
  const stepsItems = Array.from(Array(4).keys());

  return (
    <View
      style={[
        styles.container,
        {
          marginTop: isIOS ? verticalScale(15) : verticalScale(20),
        },
      ]}
    >
      <View style={styles.stepContainer}>
        <View style={styles.wrapper}>
          <Text
            fontSize={textStyles.H6}
            fontFamily={fonts.MEDIUM}
            color={colors.dark}
            style={styles.stepsTitle}
          >
            {`${activeStep}/4 ${title}`}
          </Text>
          <View style={styles.steps}>
            {stepsItems.map((item) => {
              const isPassed = item + 1 < activeStep;
              const isActive = item + 1 === activeStep;
              return (
                <HeaderStepItem
                  key={item}
                  isPassed={isPassed}
                  isActive={isActive}
                />
              );
            })}
          </View>
        </View>
        <SignUpArrowIcon />
      </View>
      <TouchableOpacity
        style={styles.goBackContainer}
        onPress={() => goBack(activeStep - 1)}
      >
        <ArrowBackIcon />
      </TouchableOpacity>
    </View>
  );
};

export default memo(SignUpHeader);
