import React from "react";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { verticalScale } from "~/constants/metrics";
import { useIOS } from "~/helpers/useIOS";
import { useHebrew } from "~/i18n";
import Text from "~/view/components/Text";
import StoresList from "../stores-list";
import { styles } from "./styles";

interface Props {}

const HomeView: React.FC<Props> = () => {
  const { t } = useTranslation();
  const isHebrew = useHebrew();
  const isIOS = useIOS();

  return (
    <View style={styles.container}>
      <View style={styles.topBarContainer}>
        <View style={styles.topBarTextContainer}>
          <Text fontSize={textStyles.H3} fontFamily={fonts.MEDIUM} color={colors.dark}>
            {t("homePage:topBarPromotion")}
          </Text>
          <Text fontSize={textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.dark} style={{ maxWidth: 180, marginTop: verticalScale(3) }}>
            {t("homePage:topBarText")}
          </Text>
        </View>
        <Image source={require("~/view/assets/images/home/topBar.png")} style={styles.topBarImage}></Image>
      </View>
      <View style={[styles.subtitle]}>
        <Text fontSize={isHebrew ? textStyles.H4 : textStyles.H5} fontFamily={fonts.REGULAR} color={colors.dark} textAlign="center">
          {t("homePage:listOfStores")}
        </Text>
      </View>

      <StoresList />
    </View>
  );
};

export default HomeView;
