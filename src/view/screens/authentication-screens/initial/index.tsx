import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ImageBackground,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import PrimaryButton from "~/view/components/PrimaryButton";
import Text from "~/view/components/Text";
import { styles } from "./styles";
import { useTranslation } from "~/i18n";

export const InitialScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const goNext = () => {
    navigation.navigate("SignUp");

    // navigation.navigate("Connect");
  };

  const goToLogin = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/backgrounds/1.2.png")}
    >
      <View style={styles.container}>
        <SafeAreaView />
        <Text
          fontSize={textStyles.H2}
          fontFamily={fonts.BOLD}
          color={colors.dark}
          style={styles.title}
        >
          {t("home:welcome")}
        </Text>
        <Text
          fontSize={textStyles.H6}
          fontFamily={fonts.MEDIUM}
          color={colors.grey}
          style={styles.subtitle}
          textAlign="center"
        >
          {t("home:slogan")}
        </Text>
        <PrimaryButton title={"בואו נתחיל"} onPress={goNext} />

        <View style={styles.bottomRow}>
          {i18n.language !== "en" ? (
            <>
              <TouchableOpacity onPress={() => goToLogin()}>
                <Text
                  fontSize={textStyles.H6}
                  fontFamily={fonts.REGULAR}
                  color={colors.purpleSecond}
                  style={styles.subtitle}
                >
                  {t("home:toConnect")}
                </Text>
              </TouchableOpacity>
              <Text
                fontSize={textStyles.H6}
                fontFamily={fonts.REGULAR}
                color={colors.dark}
                style={styles.subtitle}
              >
                {t("home:alreadyHaveAcc")}
              </Text>
            </>
          ) : (
            <>
              <Text
                fontSize={textStyles.H6}
                fontFamily={fonts.REGULAR}
                color={colors.dark}
                style={styles.subtitle}
              >
                {t("home:alreadyHaveAcc")}
              </Text>
              <TouchableOpacity onPress={() => goToLogin()}>
                <Text
                  fontSize={textStyles.H6}
                  fontFamily={fonts.REGULAR}
                  color={colors.purpleSecond}
                  style={styles.subtitle}
                >
                  {t("home:toConnect")}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};
