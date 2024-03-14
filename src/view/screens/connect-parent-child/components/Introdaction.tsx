import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { horizontalScale, verticalScale } from "~/constants/metrics";

import { styles } from "../styles";

import ArrowBackIcon from "~/view/assets/icons/arrow-back.svg";
import { useIOS } from "~/helpers/useIOS";
import Text from "~/view/components/Text";
import {
  colors,
  fonts,
  getColorWithOpacity,
  textStyles,
} from "~/constants/designConstants";
import { useHebrew } from "~/i18n";
import { useTranslation } from "react-i18next";
import { BluredView } from "~/view/components/BluredView";

import ConnectParentIcon from "~/view/assets/icons/connect-parent.svg";
import BenefIcon from "~/view/assets/icons/benef-icon.svg";
import SecureIcon from "~/view/assets/icons/secure.svg";
import PrimaryButton from "~/view/components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import SmallHeader from "~/view/components/SmallHeader";
import { useAppSelector } from "~/store/hooks";
import { userRoles } from "~/constants/main";

const Introdaction: React.FC = () => {
  const { t } = useTranslation();
  const isHebrew = useHebrew();
  const navigation = useNavigation();
  const benefArray = [
    t("connectParentOrChild:firstBenef"),
    t("connectParentOrChild:secondBenef"),
    t("connectParentOrChild:thirdBenef"),
  ];
  const userRole = useAppSelector((state) => state.user.user.role);

  return (
    <ImageBackground
      source={require("~/view/assets/images/backgrounds/2.1.png")}
    >
      <BluredView
        styles={[
          styles.container,
          {
            backgroundColor: getColorWithOpacity(colors.white, 0.4),
          },
        ]}
      >
        <SafeAreaView />
        <View
          style={{
            width: "100%",
            marginTop: verticalScale(15),
          }}
        >
          <SmallHeader
            label={t("connectParentOrChild:introdactionTitle")}
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.circleWrapper}>
            <View style={styles.circleInner}>
              <ConnectParentIcon />
            </View>
          </View>

          <Text
            fontSize={isHebrew ? textStyles.MEDIUM : textStyles.H5}
            fontFamily={fonts.MEDIUM}
            color={colors.dark}
            textAlign="center"
            style={{ width: 300 }}
          >
            {userRole === userRoles.parent
              ? "חיבור חשבונך לחשבון ילד"
              : "חיבור חשבונך לחשבון הורה"}
          </Text>

          <View style={styles.benefitsWrapper}>
            {benefArray.map((item, index) => (
              <View style={styles.benefRow} key={index}>
                <BenefIcon />
                <Text
                  fontSize={isHebrew ? textStyles.H4 : textStyles.H6}
                  fontFamily={fonts.REGULAR}
                  color={colors.dark}
                  style={styles.benefText}
                >
                  {item}
                </Text>
              </View>
            ))}

            <Text
              fontSize={isHebrew ? textStyles.MEDIUM : textStyles.H5}
              fontFamily={fonts.MEDIUM}
              color={colors.dark}
              style={{ marginTop: horizontalScale(20) }}
            >
              {t("connectParentOrChild:introSubtitle")}
            </Text>
            <Text
              fontSize={isHebrew ? textStyles.H4 : textStyles.H6}
              fontFamily={fonts.REGULAR}
              color={colors.dark}
              style={{ marginTop: horizontalScale(20) }}
            >
              {t("connectParentOrChild:text")}
            </Text>
            <View style={styles.secondText}>
              <SecureIcon />
              <Text
                fontSize={isHebrew ? textStyles.H4 : textStyles.H6}
                fontFamily={fonts.REGULAR}
                color={colors.dark}
                style={[styles.benefText, { marginTop: horizontalScale(20) }]}
              >
                {t("connectParentOrChild:secondText")}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.introButton}>
          <PrimaryButton
            title={
              userRole === userRoles.parent
                ? "חבר ילד לחשבונך"
                : "חבר הורה לחשבונך"
            }
            onPress={() => navigation.navigate("EnterInvitePhone")}
          />
        </View>
      </BluredView>
    </ImageBackground>
  );
};

export default Introdaction;
