import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, ImageBackground, TouchableOpacity, View, SafeAreaView } from "react-native";

import SmallHeader from "~/view/components/SmallHeader";
import { styles } from "./styles";

import { verticalScale } from "~/constants/metrics";
import { useIOS } from "~/helpers/useIOS";
import { BluredView } from "~/view/components/BluredView";
import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import Modal from "~/view/components/modal";

interface Props {
  showModal: boolean;
  close: () => void;
}

const height = Dimensions.get("window").height;

const AddCardResult: React.FC<Props> = ({ showModal, close }) => {
  const [isChildConnected, setIsChildConnected] = useState<boolean>(true);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isIOS = useIOS();

  const goHomePage = () => {
    navigation.navigate("HomeScreen");
  };

  const handleMainButton = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <Modal showModal={showModal} animationType="slide">
      <ImageBackground source={require("~/view/assets/images/backgrounds/3.1.png")}>
        <BluredView
          styles={[
            styles.resultContainer,
            {
              height,
            },
          ]}
        >
          <SafeAreaView />
          <View style={styles.resultHeader}>
            <SmallHeader label={t("addCreditCard:initialHeaderTitle")} />
          </View>

          <View style={styles.resultContent}>
            <View style={styles.circleWrapperBigger}>
              <View style={styles.circleInnerBigger}></View>
            </View>

            <Text fontSize={textStyles.MEDIUM} fontFamily={fonts.BOLD} color={colors.dark} textAlign="center" style={{ width: 300, marginTop: verticalScale(24) }}>
              {t("addCreditCard:successConnect")}
            </Text>

            <Text fontSize={textStyles.H5} fontFamily={fonts.REGULAR} color={colors.grey} textAlign="center" style={{ marginTop: verticalScale(12) }}>
              {isChildConnected ? t("addCreditCard:successConnectAddChild") : t("addCreditCard:successConnectSetBudget")}
            </Text>
          </View>
          <View style={styles.resultButtonContainer}>
            <TouchableOpacity style={styles.resultReturnButton} onPress={goHomePage}>
              <Text fontSize={textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.purpleLinear} textAlign="center">
                {t("addCreditCard:returnToHome")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resultMainButton} onPress={handleMainButton}>
              <Text fontSize={textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.white} textAlign="center">
                {t("addCreditCard:returnToHome")}
              </Text>
            </TouchableOpacity>
          </View>
        </BluredView>
      </ImageBackground>
    </Modal>
  );
};

export default AddCardResult;
