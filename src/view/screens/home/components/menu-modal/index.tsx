import React from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./styles";

import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { useTranslation } from "~/i18n";
import Modal from "~/view/components/modal";
import { useDispatch } from "react-redux";
import { signOut } from "~/modules/user/actions";
import { horizontalScale, verticalScale } from "~/constants/metrics";

import MyChildrenIcon from "~/view/assets/icons/menu_children.svg";
import StoreManagmentIcon from "~/view/assets/icons/menu_store_managment.svg";
import CardsIcon from "~/view/assets/icons/menu_cards.svg";
import ProfileIcon from "~/view/assets/icons/menu_profile.svg";
import LogutIcon from "~/view/assets/icons/menu_logout.svg";
import { userRoles } from "~/constants/main";
import { useNavigation } from "@react-navigation/native";
import { User } from "~/services/User";
import { useIOS } from "~/helpers/useIOS";
import { useAppSelector } from "~/store/hooks";
import { useQuery } from "react-query";
import { QueryKey } from "~/constants/query";
import { Parent } from "~/services/Parent";

interface Props {
  name?: string;
  role: string;
  showModal: boolean;
  close: () => void;
}

const MenuModal: React.FC<Props> = ({ showModal, close, name, role }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isIOS = useIOS();
  const userRole = useAppSelector((state) => state.user.user.role);

  const parentChildren = useQuery([QueryKey.PARENT_MY_CHILDREN], () => {
    if (userRole === userRoles.parent) {
      return Parent.getChildrenList();
    } else {
      return undefined;
    }
  });

  const logout = async () => {
    const response = await User.logout();
    if (response) {
      dispatch(signOut());
    }
  };

  const funcWrapper = (func: () => any) => {
    func && func();
    close();
  };

  const getIOSStyles = () => {
    if (isIOS) {
      return { marginRight: horizontalScale(12) };
    } else {
      return {
        marginLeft: horizontalScale(12),
      };
    }
  };

  const goToChildPermissions = () => {
    if (parentChildren.data && parentChildren.data.length) {
      navigation.navigate("ChildPermissions", {
        childId: parentChildren.data[0].id,
        childName: parentChildren.data[0].name,
      });
    } else {
      navigation.navigate("ConnectParentStack");
    }
  };

  const goToChildrenScreen = () => {
    if (parentChildren.data && parentChildren.data.length) {
      navigation.navigate("ChildScreen", {
        childId: parentChildren.data[0].id,
      });
    } else {
      navigation.navigate("ConnectParentStack");
    }
  };

  return (
    <Modal showModal={showModal} animationType="fade">
      <TouchableOpacity style={styles.menuModalContainer} onPress={close}>
        <View
          style={[styles.menuModalContent, role !== userRoles.parent && styles.menuModalContentChild]}
          onStartShouldSetResponder={(event) => true}
          onTouchEnd={(e) => {
            e.stopPropagation();
          }}
        >
          <Text fontSize={textStyles.H4} fontFamily={fonts.MEDIUM} color={colors.dark} style={{ marginBottom: verticalScale(12) }}>
            {name}
          </Text>

          {role === userRoles.parent && (
            <>
              <View style={styles.br} />

              {/* <TouchableOpacity style={styles.menuRow}>
                <MonthlyBudgetIcon />
                <Text
                  fontSize={textStyles.H5}
                  fontFamily={fonts.MEDIUM}
                  color={colors.purpleLinear}
                  style={getIOSStyles()}
                >
                  {t("menuModal:monthlyBudget")}
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity style={styles.menuRow} onPress={() => funcWrapper(goToChildrenScreen)}>
                <MyChildrenIcon />
                <Text fontSize={textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.purpleLinear} style={getIOSStyles()}>
                  {t("menuModal:myChildren")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuRow} onPress={() => funcWrapper(goToChildPermissions)}>
                <StoreManagmentIcon />
                <Text fontSize={textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.purpleLinear} style={getIOSStyles()}>
                  {t("menuModal:storeManagment")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuRow} onPress={() => funcWrapper(navigation.navigate("PaymentMethods"))}>
                <CardsIcon />
                <Text fontSize={textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.purpleLinear} style={getIOSStyles()}>
                  {t("menuModal:paymentMethod")}
                </Text>
              </TouchableOpacity>
            </>
          )}
          <View style={styles.br} />
          <TouchableOpacity style={styles.menuRow} onPress={() => funcWrapper(navigation.navigate("EditUserProfile"))}>
            <ProfileIcon />
            <Text fontSize={textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.purpleLinear} style={getIOSStyles()}>
              {t("menuModal:privateProfile")}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.menuRow}>
            <QAIcon />
            <Text
              fontSize={textStyles.H5}
              fontFamily={fonts.MEDIUM}
              color={colors.purpleLinear}
              textAlign="left"
              style={{ marginLeft: horizontalScale(12) }}
            >
              {t("menuModal:qa")}
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.menuRow} onPress={logout}>
            <LogutIcon />
            <Text fontSize={textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.purpleLinear} style={getIOSStyles()}>
              {t("menuModal:logout")}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default MenuModal;
