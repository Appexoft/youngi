import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity, Image, Dimensions } from "react-native";
import { useHebrew } from "~/i18n";

import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";

import { styles } from "./styles";
import LinearGradient from "react-native-linear-gradient";
import SmallPersonIcon from "~/view/assets/svg-components/SmallPersonIcon";
import { useNavigation } from "@react-navigation/native";

import ThreeDotsIcon from "~/view/assets/icons/three-dots.svg";
import MyChildrenModal from "./MyChildrenModal";
import { useDispatch } from "react-redux";
import { setActiveChild } from "~/modules/home/actions";
import { Parent } from "~/services/Parent";
import { useQuery } from "react-query";
import { QueryKey } from "~/constants/query";
import { useIOS } from "~/helpers/useIOS";
import { verticalScale } from "~/constants/metrics";

interface Props {
  name: string;
  image: string | null;
  payable: boolean;
  id: number;
  allowedExpences: number;
  expenced?: string;
  second?: boolean; // ------- TEMPORARYYYYY --------
  threeDotsDisabled?: boolean;
  balance: number;
}

const width = Dimensions.get("window").width;

const MyChildrenItem: React.FC<Props> = ({ name, image, payable, id, threeDotsDisabled, balance, allowedExpences }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [progressWidth, setProgressWidth] = useState<string>("0");
  const { t } = useTranslation();
  const isHebrew = useHebrew();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isIOS = useIOS();

  const parentInfo = useQuery([QueryKey], () => {
    return Parent.getParentInfo();
  });

  useEffect(() => {
    if (allowedExpences && balance) {
      setProgressWidth(String((allowedExpences - balance) / (allowedExpences / 100)));
    }
  }, [allowedExpences, balance]);

  const getLinearGradient = () => {
    return ["#FFFFFF", "#F1F1FA"];
  };

  const addCreditCard = async () => {
    const response = await Parent.createCard(parentInfo.data?.id);

    if (response.sale_url) {
      await Parent.sendPaymeSaleId(response.payme_sale_id); // send payme_sale_id to the backend
      navigation.navigate("AddCreditCard", { url: response.sale_url });
    }
  };

  const goToChildPage = () => {
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
  };

  return (
    <View
      style={[
        styles.itemContainer,
        {
          shadowColor: isIOS ? "#000" : "rgba(0, 0, 0, 0.5)",
        },
      ]}
    >
      <LinearGradient colors={getLinearGradient()} style={styles.itemWrapper} end={{ x: 1.2, y: 0.1 }} start={{ x: 0.1, y: 0 }}>
        <TouchableOpacity
          style={[
            styles.itemButtonWrapper,
            {
              width: width - 40,
            },
          ]}
          onPress={goToChildPage}
        >
          <View style={styles.backgroundCircles}>
            <View style={styles.backgroundCirle} />
          </View>
          <View style={styles.itemChildImage}>{image ? <Image source={{ uri: image }} /> : <SmallPersonIcon color={"#FFF"} width={30} height={30} />}</View>

          <View
            style={[
              styles.itemContent,
              // {
              //   width: width - 150,
              // },
            ]}
          >
            <Text fontSize={isHebrew ? textStyles.H5 : textStyles.H6} fontFamily={fonts.MEDIUM} color={colors.dark}>
              {name}
            </Text>

            {payable ? (
              <View style={styles.myCardScaleContainer}>
                <View style={styles.myCardScaleTopBar}>
                  <View style={{ justifyContent: "flex-start" }}>
                    <Text fontSize={textStyles.H6} fontFamily={fonts.REGULAR} color={colors.grey} textAlign={isIOS ? "right" : "left"}>
                      {t("homePageView:myCardCameOut")}
                    </Text>
                    <Text fontSize={textStyles.H6} fontFamily={fonts.REGULAR} color={colors.grey} textAlign={isIOS ? "right" : "left"} style={{ marginTop: verticalScale(-2) }}>
                      {`₪${balance}`}
                    </Text>
                  </View>

                  <View style={{ justifyContent: "flex-end" }}>
                    <Text fontSize={textStyles.H6} fontFamily={fonts.REGULAR} color={colors.grey} textAlign={isIOS ? "left" : "right"}>
                      {t("homePageView:myCardLeft")}
                    </Text>
                    <Text fontSize={textStyles.H6} fontFamily={fonts.REGULAR} color={colors.grey} textAlign={isIOS ? "left" : "right"} style={{ marginTop: verticalScale(-2) }}>
                      {`₪${allowedExpences - balance}/${allowedExpences ?? 0}`}
                    </Text>
                  </View>
                </View>
                <View style={styles.myCardScale}>
                  <View
                    style={[
                      styles.myCardProgressBar,
                      {
                        width: `${progressWidth}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.cardNoConnected}>
                <Text fontSize={isHebrew ? textStyles.H7 : textStyles.SMALL} fontFamily={fonts.MEDIUM} color={colors.grey} textAlign="left">
                  {t("homePageView:noCardConnectedChildItem1")}
                </Text>
                <View style={styles.cardNoConnectedRow}>
                  <Text fontSize={isHebrew ? textStyles.H7 : textStyles.SMALL} fontFamily={fonts.MEDIUM} color={colors.grey} textAlign="left">
                    {t("homePageView:noCardConnectedChildItem2")}
                  </Text>
                  <TouchableOpacity style={styles.cardNoConnectedButton} onPress={() => addCreditCard()}>
                    <Text fontSize={isHebrew ? textStyles.H7 : textStyles.SMALL} fontFamily={fonts.MEDIUM} color={colors.purpleLinear} textAlign="left">
                      {t("homePageView:addCardChidlItem")}
                    </Text>
                  </TouchableOpacity>

                  <Text fontSize={isHebrew ? textStyles.H7 : textStyles.SMALL} fontFamily={fonts.MEDIUM} color={colors.grey} textAlign="left">
                    {t("homePageView:noCardConnectedChildItem3")}
                  </Text>
                </View>
              </View>
            )}
          </View>
          {!threeDotsDisabled && (
            <View
              style={styles.treeDotsWrapper}
              onStartShouldSetResponder={(event) => true}
              onTouchEnd={(e) => {
                e.stopPropagation();
              }}
            >
              <TouchableOpacity style={styles.treeDotsContainer} onPress={() => setShowModal(true)}>
                <ThreeDotsIcon />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </LinearGradient>
      {showModal && <MyChildrenModal name={name} image={image} payable={payable} id={id} showModal={showModal} close={() => setShowModal(false)} balance={balance} allowedExpences={allowedExpences} />}
    </View>
  );
};

export default MyChildrenItem;
