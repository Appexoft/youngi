import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { fonts, textStyles, colors } from "~/constants/designConstants";
import Text from "~/view/components/Text";
import { styles } from "./styles";
import Lottie from "lottie-react-native";
import ArrowBackIcon from "~/view/assets/icons/arrow-back.svg";
import { verticalScale } from "~/constants/metrics";
import Modal from "~/view/components/modal";
import { useAppSelector } from "~/store/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PrimaryButton from "~/view/components/PrimaryButton";
import RNRestart from "react-native-restart";
import { User } from "~/services/User";

interface Props {
  showModal: boolean;
  close: () => void;
  onSuccess: () => void;
}

export const EditProfileModal: React.FC<Props> = ({ showModal, close }) => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const role = useAppSelector((state) => state.user.user.role);

  const deleteAccount = async () => {
    if (role) {
      const response = await User.deleteAccount(role);
      if (response) {
        setIsDeleted(true);
      }
    }
  };

  const closeModal = async () => {
    if (isDeleted) {
      await AsyncStorage.clear();
      RNRestart.restart();
    } else {
      close();
    }
  };

  return (
    <Modal showModal={showModal} animationType="fade">
      <TouchableOpacity
        style={[
          styles.menuModalContainer,
          {
            justifyContent: isDeleted ? "center" : "flex-end",
          },
        ]}
        onPress={closeModal}
      >
        {isDeleted ? (
          <View style={styles.menuModalDeleted}>
            <View style={{ alignItems: "center" }}>
              <View style={styles.circleWrapper}>
                <View style={styles.circleInner}>
                  <Lottie source={require("~/view/assets/animations/vmark.json")} autoPlay loop />
                </View>
              </View>

              <Text fontSize={textStyles.H4} fontFamily={fonts.MEDIUM} color={colors.dark} style={{ marginTop: verticalScale(20) }}>
                המשתמש נמחק בהצלחה
              </Text>
              <Text fontSize={textStyles.H5} fontFamily={fonts.REGULAR} color={colors.dark} style={{ marginTop: verticalScale(10) }}>
                המשתמש נמחק בהצלחה
              </Text>
            </View>

            <PrimaryButton title="תודה ולהתראות" onPress={closeModal} />
          </View>
        ) : (
          <View
            style={styles.menuModalContent}
            onStartShouldSetResponder={(event) => true}
            onTouchEnd={(e) => {
              e.stopPropagation();
            }}
          >
            <View style={styles.modalConfirm}>
              <TouchableOpacity style={styles.modalConfirmReturn} onPress={close}>
                <ArrowBackIcon />
              </TouchableOpacity>
              <View style={styles.circleWrapper}>
                <View style={styles.circleInner}>
                  <Lottie source={require("~/view/assets/animations/error.json")} autoPlay loop />
                </View>
              </View>
              <Text fontSize={textStyles.H4} fontFamily={fonts.MEDIUM} color={colors.dark} style={{ marginTop: verticalScale(20) }}>
                האם למחוק את חשבון יאנגי?
              </Text>
              <Text fontSize={textStyles.H6} fontFamily={fonts.REGULAR} color={colors.grey} textAlign="center" style={{ marginTop: verticalScale(8) }}>
                לאחר מחיקת החשבון פרטיך לא יהיו קיימים יותר באפליקציה
              </Text>

              <View style={styles.modalConfirmButtons}>
                <TouchableOpacity style={styles.modalConfirmRest} onPress={close}>
                  <Text fontSize={textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.white} textAlign="center">
                    השאר
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalConfirmDelete} onPress={deleteAccount}>
                  <Text fontSize={textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.purpleLinear} textAlign="center">
                    מחק
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </Modal>
  );
};
