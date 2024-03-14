import React from "react";
import { ImageBackground, SafeAreaView, TouchableOpacity, View } from "react-native";
import { verticalScale } from "~/constants/metrics";

import { styles } from "../styles";

import ArrowBackIcon from "~/view/assets/icons/arrow-back.svg";
import { useIOS } from "~/helpers/useIOS";
import Text from "~/view/components/Text";
import { colors, fonts, getColorWithOpacity, textStyles } from "~/constants/designConstants";
import { useHebrew } from "~/i18n";
import { useTranslation } from "react-i18next";
import { BluredView } from "~/view/components/BluredView";

import Modal from "~/view/components/modal";
import { status } from "~/constants/main";
import PrimaryButton from "~/view/components/PrimaryButton";

interface Props {
  showModal: boolean;
  inviteStatus: string | null;
  parentName: string | undefined;
  onClose: () => void;
}

const InviteStatusModal: React.FC<Props> = ({ showModal, inviteStatus, parentName, onClose }) => {
  const isIOS = useIOS();
  const { t } = useTranslation();
  const isHebrew = useHebrew();
  const isSuccess = inviteStatus === status.success;
  return (
    <Modal showModal={showModal}>
      <ImageBackground source={require("~/view/assets/images/backgrounds/2.1.png")}>
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
            style={[
              styles.header,
              {
                marginTop: isIOS ? verticalScale(15) : verticalScale(25),
              },
            ]}
          >
            <View style={styles.headerContent}>
              <Text fontSize={isHebrew ? textStyles.H6 : textStyles.H7} fontFamily={fonts.MEDIUM} color={colors.dark} textAlign="center">
                {t("connectParentOrChild:introdactionTitle")}
              </Text>
            </View>
            <TouchableOpacity style={styles.goBackContainer} onPress={onClose}>
              <ArrowBackIcon />
            </TouchableOpacity>
          </View>

          <View style={styles.modalView}>
            <View style={styles.circleWrapperBigger}>
              <View style={styles.circleInnerBigger}></View>
            </View>

            <Text fontSize={isHebrew ? textStyles.MEDIUM : textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.dark} textAlign="center" style={{ width: 300 }}>
              {isSuccess ? t("connectParentOrChild:successTitle") : t("connectParentOrChild:unsuccessTitle")}
            </Text>
            <Text fontSize={isHebrew ? textStyles.H4 : textStyles.H6} fontFamily={fonts.REGULAR} color={colors.dark} textAlign={"center"} style={{ marginTop: verticalScale(15), width: 270 }}>
              {isSuccess ? t("connectParentOrChild:successSubtitle") : t("connectParentOrChild:unsuccessSubtitle")}
            </Text>
          </View>

          <View style={styles.introButton}>
            <PrimaryButton title={isSuccess ? t("connectParentOrChild:successButton") : t("connectParentOrChild:unsuccessButton")} onPress={onClose} />
          </View>
        </BluredView>
      </ImageBackground>
    </Modal>
  );
};

export default InviteStatusModal;
