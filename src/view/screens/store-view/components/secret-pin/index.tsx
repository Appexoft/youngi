import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ImageBackground,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useHebrew } from "~/i18n";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "~/store/hooks";
import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import ArrowBackIcon from "~/view/assets/icons/arrow-back.svg";
import CloseIcon from "~/view/assets/icons/close.svg";
import { verticalScale } from "~/constants/metrics";
import { BluredView } from "~/view/components/BluredView";
import { useIOS } from "~/helpers/useIOS";
import { Child } from "~/services/Child";
import ArrowBack from "~/view/assets/icons/arrow-back.svg";
import ErrorModal from "~/view/components/ErrorModal";

interface Props {}

const SecretPin: React.FC<Props> = () => {
  const [pin, setPin] = useState<string[] | []>([]);
  const [isCodeEntered, setIsCodeEntered] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const pinItems = Array.from(Array(4).keys());
  const codeItems = Array.from(Array(9).keys());
  const isIOS = useIOS();

  const { t } = useTranslation();
  const isHebrew = useHebrew();
  const navigation = useNavigation();
  const activeStore = useAppSelector((state) => state.home.activeStore);

  const paymentInfo = useAppSelector((state) => state.store.paymentInfo);

  const childPinCode = useAppSelector((state) => state.user.info?.code);

  useEffect(() => {
    if (pin.length === 4) {
      sendPaymentRequest(pin);
      // setTimeout(() => {
      // setIsCodeEntered(true);
      // }, 500);
    }
  }, [pin]);

  const handleCode = (value: number) => {
    if (pin.length <= 4) {
      setPin([...pin, String(value)]);
    }
  };

  const handleDelete = () => {
    const newValue = pin.slice(0, pin.length - 1);
    setPin(newValue);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const sendPaymentRequest = async (code: string[]) => {
    if (childPinCode === code.join("")) {
      const response = await Child.createPaymentRequest(paymentInfo);
      if (response) {
        navigation.navigate("ConfirmPayment");
      }
    } else {
      setError(true);
    }
  };

  return (
    <ImageBackground
      source={require("~/view/assets/images/backgrounds/4.1.png")}
    >
      <BluredView styles={styles.container}>
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
            style={[styles.goBackContainer]}
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
              {`אישור תשלום על סך ${paymentInfo.payment} ₪`}
            </Text>
          </View>
          <TouchableOpacity style={styles.goBackContainer} onPress={goBack}>
            <ArrowBackIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text
            fontSize={isHebrew ? textStyles.H3 : textStyles.H5}
            fontFamily={fonts.MEDIUM}
            color={colors.dark}
          >
            {t("storeScreen:personalSecurityCode")}
          </Text>

          <View style={styles.pinContainer}>
            {pinItems.map((item) => {
              const isActive = pin.length > item;
              return (
                <View
                  style={[
                    styles.pinItem,
                    isActive && styles.pinItemActive,
                    item === 3 && {
                      marginRight: 0,
                    },
                  ]}
                  key={item}
                />
              );
            })}
          </View>

          <View style={styles.codeButtons}>
            {codeItems.map((item) => {
              const isLastInRow = (item + 1) % 3 === 0;
              return (
                <TouchableOpacity
                  style={[styles.codeButton, isLastInRow && styles.lastInRow]}
                  key={item}
                  onPress={() => handleCode(item + 1)}
                >
                  <Text
                    fontSize={isHebrew ? textStyles.H3 : textStyles.H5}
                    fontFamily={fonts.MEDIUM}
                    color={colors.purpleSecond}
                  >
                    {item + 1}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <View style={styles.codeButtonsLastRow}>
              <TouchableOpacity
                style={[styles.codeButton]}
                onPress={() => handleDelete()}
              >
                <ArrowBack />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.codeButton]}
                onPress={() => handleCode(0)}
              >
                <Text
                  fontSize={isHebrew ? textStyles.H3 : textStyles.H5}
                  fontFamily={fonts.MEDIUM}
                  color={colors.purpleSecond}
                >
                  0
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.forgotCodeButton}>
          <TouchableOpacity>
            <Text
              fontSize={isHebrew ? textStyles.H4 : textStyles.H7}
              fontFamily={fonts.MEDIUM}
              color={colors.purpleSecond}
            >
              {t("storeScreen:forgotCode")}
            </Text>
          </TouchableOpacity>
        </View>
      </BluredView>

      {error && (
        <ErrorModal
          showModal={error}
          close={() => setError(false)}
          label={"קוד שגוי"}
        />
      )}
    </ImageBackground>
  );
};

export default SecretPin;
