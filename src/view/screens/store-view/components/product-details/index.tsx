import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { useHebrew } from "~/i18n";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import ArrowBackIcon from "~/view/assets/icons/arrow-back.svg";
import CloseIcon from "~/view/assets/icons/close.svg";
import { useAppSelector } from "~/store/hooks";
import Text from "~/view/components/Text";
import {
  colors,
  fonts,
  getColorWithOpacity,
  textStyles,
} from "~/constants/designConstants";
import ProductDetailsIcon from "~/view/assets/icons/product-details.svg";
import TextInput from "~/view/components/TextInput";
import PrimaryButton from "~/view/components/PrimaryButton";
import { verticalScale } from "~/constants/metrics";
import { useDispatch } from "react-redux";
import { setActiveStore } from "~/modules/home/actions";
import { BluredView } from "~/view/components/BluredView";
import { useIOS } from "~/helpers/useIOS";
import { setPaymentInfo } from "~/modules/store/actions";

interface Props {}

const ProductDetails: React.FC<Props> = () => {
  const { t } = useTranslation();
  const isHebrew = useHebrew();
  const navigation = useNavigation();
  const activeStore = useAppSelector((state) => state.home.activeStore);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const isIOS = useIOS();

  const onButtonPress = () => {
    dispatch(setActiveStore({ details: value }));
    dispatch(setPaymentInfo({ order_details: value }));

    navigation.navigate("SecretPin");
  };

  return (
    <ImageBackground
      source={require("~/view/assets/images/backgrounds/4.1.png")}
    >
      <SafeAreaView />
      <View
        style={[
          styles.header,
          {
            marginTop: isIOS ? verticalScale(15) : verticalScale(25),
          },
        ]}
      >
        <TouchableOpacity
          style={styles.goBackContainer}
          onPress={() =>
            navigation.navigate("StoreScreen", {
              id: activeStore?.id,
            })
          }
        >
          <CloseIcon />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text
            fontSize={isHebrew ? textStyles.H6 : textStyles.H7}
            fontFamily={fonts.MEDIUM}
            color={colors.dark}
          >
            {activeStore?.name}
          </Text>
          <Image
            source={{ uri: activeStore?.logo }}
            style={styles.productImage}
          />
        </View>
        <TouchableOpacity
          style={styles.goBackContainer}
          onPress={() => navigation.goBack()}
        >
          <ArrowBackIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <BluredView
          styles={[
            styles.content,
            {
              backgroundColor: getColorWithOpacity(colors.white, 0.9),
            },
            isIOS && styles.shadow,
          ]}
        >
          <View style={styles.image}>
            <ProductDetailsIcon />
          </View>

          <Text
            fontSize={isHebrew ? textStyles.H3 : textStyles.H5}
            fontFamily={fonts.MEDIUM}
            color={colors.dark}
            style={styles.title}
            textAlign="left"
          >
            {t("storeScreen:enterProductDetails")}
          </Text>
          <TextInput
            value={value}
            onChange={setValue}
            placeholder={"פרטי המוצר"}
          />
        </BluredView>
        <View
          style={[
            styles.button,
            {
              bottom: isIOS ? 400 : 400,
            },
          ]}
        >
          <PrimaryButton title="הבא" onPress={() => onButtonPress()} />
          <TouchableOpacity onPress={() => navigation.navigate("SecretPin")}>
            <Text
              fontSize={isHebrew ? textStyles.H4 : textStyles.H5}
              fontFamily={fonts.MEDIUM}
              color={colors.purpleLinear}
              style={{ marginTop: verticalScale(16) }}
            >
              דלג
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ProductDetails;
