import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ImageBackground,
  // SafeAreaView,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { useHebrew } from "~/i18n";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "~/store/hooks";
import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import Timer from "~/view/components/Timer";
import { Pusher, PusherEvent } from "@pusher/pusher-websocket-react-native";
import PrimaryButton from "~/view/components/PrimaryButton";
import Lottie from "lottie-react-native";
import CloseIcon from "~/view/assets/icons/close.svg";
import { BluredView } from "~/view/components/BluredView";
import { useIOS } from "~/helpers/useIOS";
import ArrowBackIcon from "~/view/assets/icons/arrow-back.svg";
import { useDispatch } from "react-redux";
import { setReloadChildBudget } from "~/modules/other/actions";

interface Props {}

const pusher = Pusher.getInstance();

const ConfirmPayment: React.FC<Props> = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<boolean>(true);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const activeStore = useAppSelector((state) => state.home.activeStore);
  const paymentInfo = useAppSelector((state) => state.store.paymentInfo);
  const childId = useAppSelector((state) => state.user.info?.id);

  const isIOS = useIOS();
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeStore?.id) {
      (async () => {
        await pusher.init({
          apiKey: "f3570747bee4f7b3a1b0",
          cluster: "eu",
        });
        await pusher.connect();
        await pusher.subscribe({
          channelName: `child_payments_channel_${childId}`,
          onEvent: (event: PusherEvent) => {
            const data = JSON.parse(event.data);
            console.log(data, "data from pusher");
            setStatus(data.status);
          },
        });
      })();
    }
  }, [childId]);

  useEffect(() => {
    if (status === "approved") {
      setTimeout(() => {
        navigation.navigate("StoreScreen", {
          storeId: activeStore?.id,
        });
      }, 1200);
    }
  }, [status]);

  const getTitle = (status: string) => {
    switch (status) {
      case "cancel": {
        return "העסקה נדחתה";
      }
      case "approved": {
        return "התשלום בוצע!";
      }
      case "timesEnd": {
        return "העסקה לא אושרה";
      }
      default: {
        return "";
      }
    }
  };

  const goHome = () => {
    navigation.navigate("StoreScreen", {
      storeId: activeStore?.id,
    });
    dispatch(setReloadChildBudget(true));
  };

  const timesEnd = () => {
    setStatus("timesEnd");
  };

  const goBack = () => {
    navigation.goBack();
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
              marginTop: isIOS ? verticalScale(120) : verticalScale(25),
            },
          ]}
        >
          <View style={styles.headerInfo}>
            <Text
              fontSize={textStyles.H7}
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
        <View style={[styles.container]}>
          {status ? (
            <View style={styles.content}>
              <View
                style={[
                  styles.circleWrapper,
                  {
                    borderColor:
                      status === "cancel" ? "#FF6E6E" : colors.purpleLinear,
                  },
                ]}
              >
                <View
                  style={[
                    styles.circleInner,
                    {
                      backgroundColor:
                        status === "cancel" ? "#FF6E6E" : colors.purpleLinear,
                    },
                  ]}
                >
                  <Lottie
                    source={
                      status === "cancel"
                        ? require("../../../../assets/animations/xmark.json")
                        : status === "timesEnd"
                        ? require("../../../../assets/animations/error.json")
                        : require("../../../../assets/animations/vmark.json")
                    }
                    autoPlay
                    loop
                  />
                </View>
              </View>

              <Text
                fontSize={textStyles.H3}
                fontFamily={fonts.BOLD}
                color={colors.dark}
                style={{ maxWidth: 300, marginTop: verticalScale(24) }}
                textAlign="center"
              >
                {getTitle(status)}
              </Text>
              <Text
                fontSize={textStyles.H6}
                fontFamily={fonts.REGULAR}
                color={colors.dark}
                style={{ maxWidth: 300, marginTop: verticalScale(10) }}
                textAlign="center"
              >
                {`תשלום על סך ${paymentInfo.payment} ₪
עבור ״${paymentInfo.order_details}״ במסעדת ${activeStore?.name}`}
              </Text>

              {status !== "approved" && (
                <Text
                  fontSize={textStyles.H6}
                  fontFamily={fonts.MEDIUM}
                  color={colors.dark}
                  style={{ maxWidth: 300, marginTop: verticalScale(24) }}
                  textAlign="center"
                >
                  {status === "cancel"
                    ? "נא לפנות לבית העסק לבירור הסיבה"
                    : "הזמן שהוקצב לתשלום הסתיים"}
                </Text>
              )}

              {status !== "approved" && (
                <View style={styles.primaryBotton}>
                  {status === "cancel" && (
                    <TouchableOpacity>
                      <Text
                        fontSize={textStyles.H5}
                        fontFamily={fonts.MEDIUM}
                        color={colors.purpleLinear}
                        style={{ marginBottom: verticalScale(30) }}
                        textAlign="center"
                      >
                        Youngi כאן בשבילכם לעזרה טכנית
                      </Text>
                    </TouchableOpacity>
                  )}

                  <PrimaryButton
                    title={status === "reject" ? "נסה שוב" : "שלם שוב"}
                    onPress={goHome}
                  />
                </View>
              )}
            </View>
          ) : (
            <View style={styles.content}>
              <View style={styles.circleWrapper}>
                <View style={styles.circleInner}>
                  <Lottie
                    source={require("../../../../assets/animations/successfully.json")}
                    autoPlay
                    loop
                  />
                </View>
              </View>

              <Text
                fontSize={textStyles.H4}
                fontFamily={fonts.BOLD}
                color={colors.dark}
                style={{ maxWidth: 300, marginTop: verticalScale(24) }}
                textAlign="center"
              >
                {"ממתין לאישור בית העסק"}
              </Text>
              <View style={styles.subtitle}>
                <Text
                  fontSize={textStyles.H6}
                  fontFamily={fonts.REGULAR}
                  color={colors.dark}
                  textAlign="center"
                >
                  {`תשלום על סך ${paymentInfo.payment} ₪
עבור ״${paymentInfo.order_details}״ במסעדת ${activeStore?.name}`}
                </Text>
              </View>

              <View style={styles.timerWrapper}>
                <Text
                  fontSize={15}
                  fontFamily={fonts.MEDIUM}
                  color={colors.grey}
                  style={{ maxWidth: 300, marginTop: verticalScale(24) }}
                  textAlign="center"
                >
                  {t("storeScreen:expiresIn")}
                </Text>
                <Timer
                  initialMinute={2}
                  initialSeconds={0}
                  onTimerEnd={() => timesEnd()}
                  customStyles={styles.timer}
                />
              </View>
            </View>
          )}
        </View>
      </BluredView>
    </ImageBackground>
  );
};

export default ConfirmPayment;
