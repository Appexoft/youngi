import React from "react";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import Text from "~/view/components/Text";

import SaleIcon from "~/view/assets/icons/sale.svg";
import { horizontalScale } from "~/constants/metrics";
import Dash from "react-native-dash";
import { CouponsInterface } from "~/models/home";
import { useIOS } from "~/helpers/useIOS";
import { useAppSelector } from "~/store/hooks";
import { useDispatch } from "react-redux";
import { setPaymentInfo } from "~/modules/store/actions";
import SaleDisabledIcon from "~/view/assets/icons/sale-disabled.svg";
import { formattedStringWithDots } from "~/helpers/stringMethods";

import DiscountIcon from "~/view/assets/icons/discount-icon.svg";

interface Props {
  ticket: CouponsInterface;
  disabled: boolean;
}

interface CircleShapeProps {
  isRight?: boolean;
}

const DiscountTicket: React.FC<Props> = ({ ticket, disabled }) => {
  const { t } = useTranslation();
  const isIOS = useIOS();
  const navigation = useNavigation();
  const activeStore = useAppSelector((state) => state.home.activeStore);
  const dispatch = useDispatch();

  const getExpiringDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  const onPress = () => {
    dispatch(
      setPaymentInfo({
        payment: ticket.discount,
        bussiness_id: activeStore?.id,
      })
    );
    navigation.navigate("SecretPin");
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      disabled={disabled}
    >
      <CircleShadow />
      <CircleShadow isRight />

      <View style={styles.containerWrapper}>
        <View
          style={[
            styles.backgroundCircles,
            disabled && styles.backgroundCirclesDisabled,
          ]}
        >
          <View
            style={[
              styles.backgroundCircle,
              disabled && styles.backgroundCircleDisabled,
            ]}
          ></View>
        </View>

        <View style={styles.content}>
          <View style={styles.title}>
            <Text
              fontSize={isIOS ? textStyles.H6 : textStyles.H7}
              fontFamily={fonts.MEDIUM}
              color={disabled ? "#7878A3" : colors.dark}
              style={
                isIOS
                  ? { marginRight: horizontalScale(4) }
                  : { marginLeft: horizontalScale(4) }
              }
            >
              {formattedStringWithDots(ticket.name, 20)}
            </Text>
            {disabled ? <SaleDisabledIcon /> : <SaleIcon />}
          </View>
          <View style={styles.validDate}>
            <Text
              fontSize={isIOS ? textStyles.H7 : textStyles.SMALL}
              fontFamily={fonts.MEDIUM}
              color={disabled ? colors.lightBlue : colors.grey}
              style={{ marginRight: horizontalScale(4) }}
            >
              {t("storeScreen:valid")}
            </Text>
            <Text
              fontSize={isIOS ? textStyles.H7 : textStyles.SMALL}
              fontFamily={fonts.MEDIUM}
              color={disabled ? colors.lightBlue : colors.grey}
            >
              {getExpiringDate(ticket.valid_until)}
            </Text>
          </View>
        </View>
        <Dash
          dashGap={6}
          dashLength={5}
          dashThickness={1}
          dashColor={colors.grey}
          style={{ flexDirection: "column", width: 1, height: "100%" }}
        />

        <View style={[styles.discountIcon, { right: horizontalScale(26) }]}>
          <DiscountIcon />
        </View>

        <SideCircleCrop />
        <SideCircleCrop isRight />
      </View>
    </TouchableOpacity>
  );
};

const CircleShadow: React.FC<CircleShapeProps> = ({ isRight }) => {
  return (
    <View
      style={[
        styles.circleShadow,
        {
          left: !isRight ? -30 : undefined,
          right: isRight ? -30 : undefined,
        },
      ]}
    >
      <View
        style={[
          styles.circleShadowChildren,
          {
            top: -6,
            right: !isRight ? 10 : undefined,
            left: isRight ? 10 : undefined,
          },
        ]}
      />
      <View
        style={[
          styles.circleShadowChildren,
          {
            top: 18,
            right: !isRight ? 10 : undefined,
            left: isRight ? 10 : undefined,
          },
        ]}
      />
    </View>
  );
};

const SideCircleCrop: React.FC<CircleShapeProps> = ({ isRight }) => {
  return (
    <View
      style={[
        styles.cropCircle,
        {
          left: !isRight ? -18 : undefined,
          right: isRight ? -18 : undefined,
          backgroundColor: colors.white,
        },
      ]}
    >
      <View style={styles.cropCircleChild} />
      <View
        style={[
          styles.cropCircleChild,
          {
            right: !isRight ? -10 : undefined,
            left: isRight ? -10 : undefined,
            height: 56,
            width: 10,
          },
        ]}
      />
      <View
        style={[
          styles.cropCircleChild,
          {
            width: 36,
            top: 46,
            right: 0,
          },
        ]}
      />
    </View>
  );
};

export default DiscountTicket;
