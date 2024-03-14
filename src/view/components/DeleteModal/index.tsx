import React, { useState } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { fonts, textStyles, colors } from "~/constants/designConstants";
import Modal from "~/view/components/modal";
import Text from "~/view/components/Text";
import { styles } from "./styles";
import ResentPaymentsIcon from "~/view/assets/icons/resent-payments.svg";
import FreezeIcon from "~/view/assets/icons/snowflakes.svg";
import TrashIcon from "~/view/assets/icons/trash.svg";
import { useConfirmAnimation } from "./useConfirmAnimation";
import Lottie from "lottie-react-native";
import ArrowBackIcon from "~/view/assets/icons/arrow-back.svg";
import { verticalScale } from "~/constants/metrics";

interface Props {
  showModal: boolean;
  title: string;
  text: string;
  onSuccess: () => void;
  close: () => void;
}

const PaymentMethodsModal: React.FC<Props> = ({ showModal, title, text, close, onSuccess }) => {
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const { height } = useConfirmAnimation(isConfirm);

  return (
    <Modal showModal={showModal} animationType="fade">
      <TouchableOpacity style={styles.menuModalContainer} onPress={close}>
        <Animated.View
          style={[
            styles.menuModalContent,
            {
              height: height.interpolate({
                inputRange: [0, 1],
                outputRange: [200, 400],
              }),
            },
          ]}
          onStartShouldSetResponder={(event) => true}
          onTouchEnd={(e) => {
            e.stopPropagation();
          }}
        >
          {isConfirm ? (
            <View style={styles.modalConfirm}>
              <TouchableOpacity style={styles.modalConfirmReturn} onPress={() => setIsConfirm(false)}>
                <ArrowBackIcon />
              </TouchableOpacity>
              <View style={styles.circleWrapper}>
                <View style={styles.circleInner}>
                  <Lottie source={require("~/view/assets/animations/error.json")} autoPlay loop />
                </View>
              </View>
              <Text fontSize={textStyles.H4} fontFamily={fonts.MEDIUM} color={colors.dark} style={{ marginTop: verticalScale(20) }}>
                האם למחוק את כרטיס האשראי?
              </Text>
              <Text fontSize={textStyles.H6} fontFamily={fonts.REGULAR} color={colors.grey} textAlign="center" style={{ marginTop: verticalScale(8) }}>
                לאחר מחיקת הכרטיס הילדים לא יוכלו לבצע עסקאות באפליקציה וחשבונם יוקפא
              </Text>

              <View style={styles.modalConfirmButtons}>
                <TouchableOpacity style={styles.modalConfirmDelete}>
                  <Text fontSize={textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.purpleLinear} textAlign="center">
                    מחק
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalConfirmRest}>
                  <Text fontSize={textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.white} textAlign="center">
                    השאר
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <TouchableOpacity style={styles.modalRow}>
                <ResentPaymentsIcon />
                <Text fontSize={textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.purpleLinear} textAlign="right" style={styles.modalRowText}>
                  צפה בהיסטוריית תשלומים
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalRow}>
                <FreezeIcon />
                <Text fontSize={textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.purpleLinear} textAlign="right" style={styles.modalRowText}>
                  הקפא כרטיס
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalRow}
                onPress={() => {
                  setIsConfirm(true);
                }}
              >
                <TrashIcon />
                <Text fontSize={textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.purpleLinear} textAlign="right" style={styles.modalRowText}>
                  מחק אמצעי תשלום זה מהאפליקציה
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PaymentMethodsModal;
