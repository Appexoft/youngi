import React from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { useTranslation } from "react-i18next";
import PrimaryButton from "~/view/components/PrimaryButton";
import { verticalScale } from "~/constants/metrics";
import { styles } from "./styles";

interface Props {
  showModal: boolean;
  close: () => void;
  label: string;
}

const ErrorModal: React.FC<Props> = ({ showModal, close, label }) => {
  const { t } = useTranslation();

  return (
    <Modal isVisible={showModal}>
      <View style={styles.modalContainer}>
        <Text
          fontSize={textStyles.H4}
          fontFamily={fonts.MEDIUM}
          color={colors.dark}
          style={{ marginBottom: verticalScale(20) }}
        >
          {label}
        </Text>
        <PrimaryButton title={t("form:ok")} onPress={close} />
      </View>
    </Modal>
  );
};

export default ErrorModal;
