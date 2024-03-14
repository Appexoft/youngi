import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { useHebrew } from "~/i18n";
import Text from "~/view/components/Text";
import { styles } from "./styles";
import ArrowBackIcon from "~/view/assets/icons/arrow-back.svg";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "~/models/navigation";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import DiscountTicket from "./components/discount";
import TextInput from "~/view/components/TextInput";
import { useDispatch } from "react-redux";
import { setHideTabNav } from "~/modules/navigation/actions";
import PrimaryButton from "~/view/components/PrimaryButton";
import { useAppSelector } from "~/store/hooks";
import { Child } from "~/services/Child";
import { CouponsInterface } from "~/models/home";
import { setPaymentInfo } from "~/modules/store/actions";

import { useQuery } from "react-query";
import { QueryKey } from "~/constants/query";
import NoCard from "./components/no-card";
import { useIOS } from "~/helpers/useIOS";

type Props = NativeStackScreenProps<RootStackParamList, "StoreScreen">;

const StoreView: React.FC<Props> = ({ route }) => {
  const activeMallId = useAppSelector((state) => state.home.activeMall.id);
  const activeStore = useAppSelector((state) => state.home.activeStore);
  const [amoutToPay, setAmountToPay] = useState<string>("");
  const [coupons, setCoupons] = useState<CouponsInterface[] | null>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const [onInput, setOnInput] = useState<boolean>(false);

  const scrollViewRef = useRef<any>();
  const isIOS = useIOS();

  const { storeId } = route.params;

  const childInfo = useQuery([QueryKey.CHILD_STORE_INFO], () => {
    return Child.getChildInfo();
  });

  const { t } = useTranslation();
  const isHebrew = useHebrew();
  const navigation = useNavigation();
  const dispath = useDispatch();

  useEffect(() => {
    if (isIOS) {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => {
          setIsKeyboardVisible(true);
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => {
          setIsKeyboardVisible(false);
        }
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }
  }, [isIOS]);

  useEffect(() => {
    dispath(setPaymentInfo({ bussiness_id: storeId }));
    return () => {
      dispath(setHideTabNav(false));
    };
  }, []);

  useEffect(() => {
    if (activeMallId && storeId) {
      getShopInfo(); // load shop details: name, description, couponses etc
    }
  }, [activeMallId, storeId]);

  const getShopInfo = async () => {
    const { coupons } = await Child.getStoreInfo(activeMallId, storeId);
    setCoupons(coupons);
  };

  const goToProductDetails = () => {
    dispath(setPaymentInfo({ payment: amoutToPay, bussiness_id: storeId }));
    navigation.navigate("ProductDetails");
  };

  const getValueWithDiscaunt = (value: string) => {
    let num = parseFloat(value);
    let val = num - num * 0.15;
    return val.toFixed(2);
  };

  const disableButton = (isAmount: boolean) => {
    if (
      childInfo.data &&
      childInfo.data.balance === childInfo.data.total_allowed_expenses
    ) {
      return true;
    } else {
      return isAmount
        ? (childInfo.data && !childInfo.data.parent_id) || amoutToPay.length < 1
        : childInfo.data && !childInfo.data.parent_id;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageBackgroundContainer}>
        <Image
          source={{ uri: activeStore?.image }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.header}>
        <View style={styles.discount}>
          <Text
            fontSize={isHebrew ? textStyles.H6 : textStyles.SMALL}
            fontFamily={fonts.MEDIUM}
            color={colors.white}
          >
            {`${t("storeScreen:discount")} 15%`}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.goBackContainer}
          onPress={() => navigation.goBack()}
        >
          <ArrowBackIcon />
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={[
          styles.containerWrapper,
          isKeyboardVisible && { height: 1000 },
        ]}
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: verticalScale(80),
          overflow: "visible",
          paddingBottom: verticalScale(0),
        }}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        <SafeAreaView />
        <View
          style={[
            styles.content,
            {
              height: onInput ? (isIOS ? "100%" : 700) : "100%",
            },
          ]}
        >
          <View style={styles.logoWrapper}>
            <Image
              source={{ uri: activeStore?.logox2 }}
              style={styles.logo}
            ></Image>
          </View>
          <Text
            fontSize={isHebrew ? textStyles.H6 : textStyles.H4}
            fontFamily={fonts.MEDIUM}
            color={colors.dark}
            style={styles.title}
          >
            {activeStore?.name}
          </Text>
          <View style={styles.topInfo}>
            <View
              style={[
                styles.topInfoBlock,
                { marginRight: horizontalScale(12) },
              ]}
            >
              <Text
                fontSize={isHebrew ? textStyles.H7 : textStyles.SMALL}
                fontFamily={fonts.MEDIUM}
                color={colors.purpleSecond}
              >
                {t("homePage:kosher")}
              </Text>
            </View>
            <View style={styles.topInfoBlock}>
              <Text
                fontSize={isHebrew ? textStyles.H7 : textStyles.SMALL}
                fontFamily={fonts.MEDIUM}
                color={colors.purpleSecond}
              >
                {t("storeScreen:open")}
              </Text>
              <View style={styles.open}></View>
            </View>
          </View>

          {childInfo.data && !childInfo.data.parent_id && (
            <NoCard name={childInfo.data.name} />
          )}

          <View style={styles.promotions}>
            <Text
              fontSize={isHebrew ? textStyles.H4 : textStyles.H6}
              fontFamily={fonts.MEDIUM}
              color={colors.dark}
            >
              {t("storeScreen:discountsAndPromotions")}
            </Text>
            {coupons?.map((item, index) => {
              return (
                <DiscountTicket
                  key={index}
                  ticket={item}
                  disabled={disableButton(false)}
                />
              );
            })}
          </View>

          <View style={styles.paymentContainer}>
            <Text
              fontSize={isHebrew ? textStyles.H4 : textStyles.H5}
              fontFamily={fonts.MEDIUM}
              color={colors.dark}
              style={{ marginBottom: verticalScale(10) }}
            >
              {t("storeScreen:chooseAmount")}
            </Text>
            <TextInput
              value={amoutToPay}
              label={t("storeScreen:amountToPay")}
              placeholder={"0"}
              onChange={(value) => setAmountToPay(value)}
              labelSize={textStyles.H6}
              isNumber
              onFocus={() => setOnInput(true)}
              onBlur={() => setOnInput(false)}
            />
            {/* {amoutToPay.length > 0 && (
              <Text
                fontSize={isHebrew ? textStyles.H7 : textStyles.SMALL}
                fontFamily={fonts.MEDIUM}
                color={colors.grey}
                style={{ marginTop: verticalScale(10), maxWidth: 320 }}
              >
                {`איזה כיף! הופעלה הנחה אוטומטית,
אתה תחוייב רק ב- ${getValueWithDiscaunt(amoutToPay)}₪ במקום ${amoutToPay}₪`}
              </Text>
            )} */}
          </View>

          <View style={styles.buttonWrapper}>
            <PrimaryButton
              title={"המשך"}
              onPress={() => goToProductDetails()}
              disabled={disableButton(true)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StoreView;
