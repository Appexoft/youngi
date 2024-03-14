import React from "react";
import { useTranslation } from "react-i18next";
import { Image, TouchableOpacity, View } from "react-native";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import { useHebrew } from "~/i18n";
import Text from "~/view/components/Text";
import { styles } from "./styles";

import SaleIcon from "~/view/assets/icons/sale.svg";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setHideTabNav } from "~/modules/navigation/actions";
import { ShopInterface } from "~/models/home";
import { setActiveStore } from "~/modules/home/actions";

interface Props {
  storeInfo: ShopInterface;
  date: string;
}

const StoreItem: React.FC<Props> = ({ storeInfo, date }) => {
  const { t } = useTranslation();
  const isHebrew = useHebrew();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const goToStore = (id: number) => {
    navigation.navigate("StoreStack", {
      screen: "StoreScreen",
      params: { storeId: id },
    });
    dispatch(setActiveStore(storeInfo));
    dispatch(setHideTabNav(true));
  };

  const getStoreSubtitle = (subtitle: string): string => {
    if (subtitle.length > 25) {
      return subtitle.slice(0, 25) + "...";
    } else {
      return subtitle;
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => goToStore(storeInfo.id)}
    >
      {storeInfo.allowed && (
        <View style={styles.kosher}>
          <Text
            fontSize={isHebrew ? textStyles.SMALL : textStyles.SMALL}
            fontFamily={fonts.REGULAR}
            color={colors.purpleSecond}
          >
            {t("homePage:kosher")}
          </Text>
        </View>
      )}

      <View style={styles.content}>
        <Text
          fontSize={isHebrew ? textStyles.H5 : textStyles.H5}
          fontFamily={fonts.REGULAR}
          color={colors.dark}
        >
          {storeInfo.name}
        </Text>
        <View style={styles.date}>
          <Text
            fontSize={isHebrew ? textStyles.H6 : textStyles.H6}
            fontFamily={fonts.REGULAR}
            color={colors.dark}
            style={{
              marginTop: verticalScale(4),
              marginRight: horizontalScale(3),
            }}
          >
            {getStoreSubtitle(storeInfo.description)}
          </Text>
          <SaleIcon />
        </View>
        <Text
          fontSize={isHebrew ? textStyles.H6 : textStyles.H7}
          fontFamily={fonts.REGULAR}
          color={colors.grey}
          style={{ marginTop: verticalScale(2) }}
        >
          {date}
        </Text>
      </View>
      <View style={styles.image}>
        <Image
          source={{ uri: storeInfo.logo }}
          style={{ width: "150%", height: "150%" }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default StoreItem;
