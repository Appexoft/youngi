import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";

import SmallHeader from "~/view/components/SmallHeader";
import { styles } from "./styles";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import { useIOS } from "~/helpers/useIOS";
import { useQuery } from "react-query";
import { QueryKey } from "~/constants/query";
import { Parent } from "~/services/Parent";
import Text from "~/view/components/Text";
import {
  colors,
  fonts,
  getColorWithOpacity,
  textStyles,
} from "~/constants/designConstants";

import ThreeDotsIcon from "~/view/assets/icons/three-dots.svg";
import LinearGradient from "react-native-linear-gradient";

import StarsIcon from "~/view/assets/icons/stars.svg";
import CardVisaIcon from "~/view/assets/icons/card_visa.svg";
import PaymentMethodsModal from "./PaymentMethodsModal";

import EmptyCardIcon from "~/view/assets/icons/empty-card.svg";
import PrimaryButton from "~/view/components/PrimaryButton";
import { useAppSelector } from "~/store/hooks";

const height = Dimensions.get("window").height;

const PaymentMethods: React.FC = ({}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isIOS = useIOS();

  const cardInfo = useQuery([QueryKey.PARENT_CARD_INFO], () => {
    return Parent.getCreditCardInfo();
  });

  const parentId = useAppSelector((state) => state.user.info?.id);

  const goBack = () => {
    navigation.goBack(-1);
  };

  const addCard = async () => {
    const response = await Parent.createCard(parentId);

    if (response.sale_url) {
      await Parent.sendPaymeSaleId(response.payme_sale_id); // send payme_sale_id to the backend
      navigation.navigate("AddCreditCard", { url: response.sale_url });
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          height,
        },
      ]}
    >
      <SafeAreaView />
      <View
        style={{ marginTop: isIOS ? verticalScale(15) : verticalScale(30) }}
      >
        <SmallHeader
          label={t("paymentMethods:header")}
          onPress={() => goBack()}
        />
      </View>

      <View
        style={[
          styles.content,
          {
            height: height,
          },
        ]}
      >
        {cardInfo.isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.purpleLinear} />
          </View>
        ) : cardInfo.data ? (
          <>
            <View style={styles.header}>
              <Text
                fontSize={textStyles.H4}
                fontFamily={fonts.MEDIUM}
                color={colors.dark}
                textAlign="left"
              >
                {t("paymentMethods:title")}
              </Text>

              <TouchableOpacity
                style={styles.threeDotsButton}
                onPress={() => setOpenModal(true)}
              >
                <ThreeDotsIcon />
              </TouchableOpacity>
            </View>
            <LinearGradient
              colors={[colors.purpleLinear, colors.purpleSecond]}
              style={styles.cardContainer}
              start={{ x: 0.4, y: 0 }}
              end={{ x: 1.1, y: 0.1 }}
            >
              <View style={[isIOS ? styles.cardCircleIOS : styles.cardCircle]}>
                <View style={styles.cardCircleInner} />
              </View>

              <Text
                fontSize={15}
                fontFamily={fonts.MEDIUM}
                color={getColorWithOpacity(colors.white, 0.8)}
              >
                {t("paymentMethods:active")}
              </Text>

              <View style={styles.cardNumber}>
                <Text
                  fontSize={textStyles.H3}
                  fontFamily={fonts.MEDIUM}
                  color={colors.white}
                >
                  {cardInfo.data?.payment.display.substr(
                    cardInfo.data?.payment.display.length - 4
                  )}
                </Text>
                <StarsIcon
                  style={[
                    isIOS
                      ? { marginRight: horizontalScale(16) }
                      : { marginLeft: horizontalScale(16) },
                  ]}
                />
                <StarsIcon
                  style={[
                    isIOS
                      ? { marginRight: horizontalScale(16) }
                      : { marginLeft: horizontalScale(16) },
                  ]}
                />
                <StarsIcon
                  style={[
                    isIOS
                      ? { marginRight: horizontalScale(16) }
                      : { marginLeft: horizontalScale(16) },
                  ]}
                />
              </View>

              <View style={styles.cardInfoContainer}>
                <View>
                  <Text
                    fontSize={15}
                    fontFamily={fonts.REGULAR}
                    color={getColorWithOpacity(colors.white, 0.8)}
                    textAlign="left"
                  >
                    Expires
                  </Text>
                  <Text
                    fontSize={textStyles.H6}
                    fontFamily={fonts.MEDIUM}
                    color={colors.white}
                    textAlign="left"
                    style={{ marginTop: verticalScale(6) }}
                  >
                    {cardInfo.data?.payment.expiry
                      .split("")
                      .map((item: string, index: number) => {
                        if (index === 1) {
                          return item + "/";
                        }
                        return item;
                      })
                      .join("")}
                  </Text>
                </View>
                <View
                  style={[
                    { width: "55%" },
                    isIOS && { alignItems: "flex-start" },
                  ]}
                >
                  <Text
                    fontSize={15}
                    fontFamily={fonts.REGULAR}
                    color={getColorWithOpacity(colors.white, 0.8)}
                    textAlign="right"
                  >
                    Card Holder
                  </Text>
                  <Text
                    fontSize={textStyles.H6}
                    fontFamily={fonts.MEDIUM}
                    color={colors.white}
                    textAlign="right"
                    style={{ marginTop: verticalScale(6) }}
                  >
                    {cardInfo.data?.customer.name}
                  </Text>
                </View>
                <View style={styles.cardType}>
                  <CardVisaIcon />
                </View>
              </View>
            </LinearGradient>
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <EmptyCardIcon />
            <Text
              fontSize={textStyles.H5}
              fontFamily={fonts.MEDIUM}
              color={colors.dark}
              style={{ marginTop: verticalScale(17) }}
            >
              עדיין לא הגדרת אמצעי תשלום
            </Text>
            <Text
              fontSize={textStyles.H6}
              fontFamily={fonts.REGULAR}
              color={colors.grey}
              style={{ marginTop: verticalScale(4) }}
            >
              אנא הוסף כרטיס אשראי
            </Text>

            <View style={styles.button}>
              <PrimaryButton title="הוסף כרטיס אשראי" onPress={addCard} />
            </View>
          </View>
        )}
      </View>
      {openModal && (
        <PaymentMethodsModal
          showModal={openModal}
          close={() => setOpenModal(false)}
        />
      )}
    </View>
  );
};

export default PaymentMethods;
