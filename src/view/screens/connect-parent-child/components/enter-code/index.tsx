import React, { memo, useEffect, useState } from "react";
import {
  View,
  Text as TextRN,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import PrimaryButton from "~/view/components/PrimaryButton";
import Text from "~/view/components/Text";
import Timer from "~/view/components/Timer";
import { styles } from "./styles";

import ReloadIcon from "~/view/assets/icons/reload-active.svg";
import { useTranslation } from "~/i18n";
import { useDispatch, useSelector } from "react-redux";
import { User } from "~/services/User";
import { useAppSelector } from "~/store/hooks";
import { setRegistrationInfo } from "~/modules/sign-up/actions";
import { useNavigation } from "@react-navigation/native";
import { verticalScale } from "~/constants/metrics";
import { useIOS } from "~/helpers/useIOS";
import SmallHeader from "~/view/components/SmallHeader";
import { userRoles } from "~/constants/main";
import { Parent } from "~/services/Parent";
import { Child } from "~/services/Child";

const CELL_COUNT = 4;
const height = Dimensions.get("window").height;

const EnterCode: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [value, setValue] = useState<string>("");
  const [codeNotValid, setCodeNotValid] = useState<boolean>(false);
  const [resendCode, setResendCode] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const phoneNumber = useAppSelector(
    (state) => state.signUp.registrationInfo.phone
  );
  const phoneToken = useAppSelector(
    (state) => state.signUp.registrationInfo.phoneToken
  );
  const [disabled, setDisabled] = useState<boolean>(true);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const isIOS = useIOS();
  const userRole = useAppSelector((state) => state.user.user.role);

  useEffect(() => {
    if (value.length === 4) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [value]);

  const handleResendCode = async () => {
    const response = await User.sendPhone(phoneNumber);
    dispatch(
      setRegistrationInfo({
        phoneToken: response.register_access_token,
      })
    );
    setResendCode(false);
  };

  const verifyCode = async () => {
    if (userRole === userRoles.parent) {
      const response = await Parent.acceptChildinvite(value);
      getResponse(response.message, response.name);
    } else if (userRole === userRoles.child) {
      const response = await Child.acceptParentInvite(value);
      getResponse(response.message, response.name);
    }
  };

  const getResponse = (response: string, name: string) => {
    if (response === "invitation not accepted") {
      navigation.navigate("UnsuccessfullyConnect");
    } else {
      navigation.navigate("SuccessfullyConnect", { name });
    }
  };

  return (
    <ImageBackground
      source={require("~/view/assets/images/backgrounds/3.2.png")}
    >
      <View
        style={[
          styles.container,
          {
            height,
          },
        ]}
      >
        <SafeAreaView />
        <View style={{ marginTop: verticalScale(15) }}>
          <SmallHeader
            label="חיבור חשבונות בין הורה לילד"
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.block}>
            <Text
              fontSize={textStyles.H4}
              fontFamily={fonts.MEDIUM}
              color={colors.dark}
              style={styles.title}
            >
              נא להזין את קוד האימות
            </Text>
            <Text
              fontSize={textStyles.H6}
              fontFamily={fonts.MEDIUM}
              color={colors.grey}
              style={styles.subtitle}
            >
              אנא הזן את קוד האימות שנשלח לטלפון של ילדך
            </Text>

            <Text
              fontSize={textStyles.H6}
              fontFamily={fonts.MEDIUM}
              textAlign="left"
              color={colors.dark}
              style={styles.codeSubtitle}
            >
              קוד אימות
            </Text>

            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeWrapper}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <View
                  key={index}
                  style={[styles.codeItemWrapper]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  <TextRN
                    style={[
                      symbol || isFocused
                        ? styles.codeItem
                        : isIOS
                        ? styles.codeItemE
                        : styles.codeItemAndroid,
                    ]}
                  >
                    {symbol ||
                      (isFocused ? (
                        <Cursor />
                      ) : (
                        <View
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: 2,
                            backgroundColor: colors.dark,
                            position: "absolute",
                            bottom: verticalScale(100),
                          }}
                        />
                      ))}
                  </TextRN>
                </View>
              )}
            />

            <View style={styles.timerWrapper}>
              {resendCode ? (
                <TouchableOpacity
                  style={styles.timerContent}
                  onPress={() => handleResendCode()}
                >
                  <Text
                    fontSize={15}
                    fontFamily={fonts.MEDIUM}
                    textAlign="right"
                    color={colors.purpleLinear}
                  >
                    {t("form:expires")}
                  </Text>
                  <ReloadIcon />
                </TouchableOpacity>
              ) : (
                <View style={styles.timerContent}>
                  <Text
                    fontSize={15}
                    fontFamily={fonts.REGULAR}
                    textAlign="right"
                    color={colors.grey}
                  >
                    {t("form:seconds")}
                  </Text>
                  <Timer
                    initialMinute={2}
                    initialSeconds={0}
                    onTimerEnd={() => setResendCode(true)}
                    customStyles={styles.timer}
                  />
                  <Text
                    fontSize={15}
                    fontFamily={fonts.REGULAR}
                    textAlign="right"
                    color={colors.grey}
                  >
                    {t("form:resendCode")}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <PrimaryButton
            title="אימות"
            onPress={() => verifyCode()}
            disabled={disabled}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default EnterCode;
