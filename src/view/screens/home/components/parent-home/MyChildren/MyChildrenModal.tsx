import React from "react";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity, Image } from "react-native";

import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";

import { styles } from "./styles";

import Modal from "~/view/components/modal";
import MyChildrenItem from "./MyChildrenItem";
import { useHebrew } from "~/i18n";

import PersonIcon from "~/view/assets/icons/small-person.svg";
import SnowflakeIcon from "~/view/assets/icons/snowflakes.svg";
import PensilIcon from "~/view/assets/icons/pensil.svg";
import DisconnectIcon from "~/view/assets/icons/disconnect.svg";
import { useDispatch } from "react-redux";
import { setActiveChild } from "~/modules/home/actions";
import { useNavigation } from "@react-navigation/native";
import { Parent } from "~/services/Parent";

interface Props {
  showModal: boolean;
  close: () => void;
  name: string;
  image: string | null;
  payable: boolean;
  id: number;
  balance: number;
  allowedExpences: number;
}

const MyChildrenModal: React.FC<Props> = ({ name, image, payable, id, showModal, close, balance, allowedExpences }) => {
  const { t } = useTranslation();
  const isHebrew = useHebrew();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const selectMonthlyBudget = () => {
    const childInfo = {
      id,
      image,
      name,
    };
    dispatch(setActiveChild(childInfo));
    navigation.navigate("MonthlyBudget");
    close();
  };

  const goToChildAccount = () => {
    dispatch(
      setActiveChild({
        id,
        name,
        image,
      })
    );
    navigation.navigate("ChildScreen", {
      childId: id,
    });
    close();
  };

  const freezeChildAccount = async () => {
    const response = await Parent.freezeChildAccount(id);
    console.log(response, "freeze child account");
    close();
  };

  return (
    <Modal showModal={showModal} animationType="fade">
      <TouchableOpacity style={styles.modalWrapper} onPress={close}>
        <View
          style={styles.modalContainer}
          onStartShouldSetResponder={(event) => true}
          onTouchEnd={(e) => {
            e.stopPropagation();
          }}
        >
          <View style={styles.modalChildWrapper}>
            <MyChildrenItem name={name} image={image} payable={payable} id={id} threeDotsDisabled balance={balance} allowedExpences={allowedExpences} />
          </View>

          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalRow} onPress={goToChildAccount}>
              <PersonIcon />
              <Text fontSize={isHebrew ? textStyles.H6 : textStyles.H6} fontFamily={fonts.MEDIUM} color={colors.purpleLinear} textAlign="left" style={styles.modalRowText}>
                {t("homePageView:childViewProfile")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalRow, styles.modalRowMargin]} onPress={selectMonthlyBudget}>
              <PensilIcon />
              <Text fontSize={isHebrew ? textStyles.H6 : textStyles.H6} fontFamily={fonts.MEDIUM} color={colors.purpleLinear} textAlign="left" style={styles.modalRowText}>
                {t("homePageView:childMonthlyBudget")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalRow, styles.modalRowMargin]} onPress={freezeChildAccount}>
              <SnowflakeIcon />
              <Text fontSize={isHebrew ? textStyles.H6 : textStyles.H6} fontFamily={fonts.MEDIUM} color={colors.purpleLinear} textAlign="left" style={styles.modalRowText}>
                {t("homePageView:childFreeze")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalRow, styles.modalRowMargin]}>
              <DisconnectIcon />
              <Text fontSize={isHebrew ? textStyles.H6 : textStyles.H6} fontFamily={fonts.MEDIUM} color={colors.purpleLinear} textAlign="left" style={styles.modalRowText}>
                {t("homePageView:childDisconnect")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default MyChildrenModal;
