import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, TouchableOpacity, View } from "react-native";

import { colors, fonts, textStyles } from "~/constants/designConstants";
import { horizontalScale } from "~/constants/metrics";
import { useHebrew } from "~/i18n";
import SmallPersonIcon from "~/view/assets/svg-components/SmallPersonIcon";
import Text from "~/view/components/Text";

import { styles } from "./styles";
import ThreeDotsIcon from "~/view/assets/svg-components/ThreeDotsIcon";
import { useQuery } from "react-query";
import { QueryKey } from "~/constants/query";
import { Parent } from "~/services/Parent";

interface Props {
  childName?: string;
  childImage?: string | null;
}

const EmptyCard: React.FC<Props> = ({ childName, childImage }) => {
  const { t } = useTranslation();
  const isHebrew = useHebrew();
  const navigation = useNavigation();
  const parentInfo = useQuery([QueryKey.PARENT_INFO], () => {
    return Parent.getParentInfo();
  });

  const addCreditCard = async () => {
    const response = await Parent.createCard(parentInfo.data?.id);
    if (response.sale_url) {
      await Parent.sendPaymeSaleId(response.payme_sale_id);
      navigation.navigate("AddCreditCard", { url: response.sale_url });
    }
  };

  return (
    <View>
      <View style={styles.emptyCardWrapper}>
        <View style={styles.emptyCardBackgroundCircleWrapper}>
          <View style={styles.emptyCardBackgroundCircle} />
        </View>

        {childName && (
          <View style={styles.emptyCardChildRow}>
            <View style={styles.emptyCardChildIcon}>
              {childImage ? (
                <Image source={{ uri: childImage }} />
              ) : (
                <SmallPersonIcon color={"#FFF"} width={30} height={30} />
              )}
            </View>
            <Text
              fontSize={isHebrew ? textStyles.H5 : textStyles.H7}
              fontFamily={fonts.MEDIUM}
              color={colors.white}
              style={styles.emptyCardText}
            >
              {childName}
            </Text>

            <TouchableOpacity style={styles.emptyCardThreeDots}>
              <ThreeDotsIcon color={colors.white} />
            </TouchableOpacity>
          </View>
        )}

        <Text
          fontSize={isHebrew ? textStyles.H5 : textStyles.H6}
          fontFamily={fonts.MEDIUM}
          color={colors.white}
        >
          {t("homePageCardView:noCreditCard")}
        </Text>
        <Text
          fontSize={isHebrew ? textStyles.H6 : textStyles.H7}
          fontFamily={fonts.REGULAR}
          color={colors.white}
          style={styles.emptyCardText}
        >
          {t("homePageCardView:noCreditCardSubTitle")}
        </Text>

        <View style={{ paddingHorizontal: horizontalScale(4), width: "100%" }}>
          <TouchableOpacity
            style={styles.emptyCardButton}
            onPress={() => addCreditCard()}
          >
            <Text
              fontSize={isHebrew ? textStyles.H5 : textStyles.H6}
              fontFamily={fonts.MEDIUM}
              color={colors.purpleLinear}
            >
              {t("homePageCardView:noCreditCardSubButton")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EmptyCard;
