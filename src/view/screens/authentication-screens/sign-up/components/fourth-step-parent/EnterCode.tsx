import React, { memo, useEffect, useState } from "react";
import { View, Text as TextRN, TouchableOpacity } from "react-native";
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
import { selectUserRole } from "~/modules/sign-up/selectors";
import { User } from "~/services/User";
import { useAppSelector } from "~/store/hooks";
import { setRegistrationInfo } from "~/modules/sign-up/actions";
import { useNavigation } from "@react-navigation/native";
import { verticalScale } from "~/constants/metrics";
import { useIOS } from "~/helpers/useIOS";

interface Props {
  goNext: () => void;
}

const CELL_COUNT = 4;

const EnterCode: React.FC<Props> = ({ goNext }) => {
  const { t } = useTranslation();
  const userRole = useSelector(selectUserRole);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [value, setValue] = useState<string>("");
  const [codeNotValid, setCodeNotValid] = useState<boolean>(false);
  const [resendCode, setResendCode] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const phoneNumber = useAppSelector((state) => state.signUp.registrationInfo.phone);
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

  useEffect(() => {
    if (value.length === 5) {
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
    const phoneDetails = {
      phoneToken: phoneToken,
      phone: phoneNumber,
      code: value,
    };
    setCodeNotValid(false);
    const response = await User.verifyPhoneCode(phoneDetails);

    goNext(); // temporary
    if (response === 409) {
      setIsVerified(true);
      setCodeNotValid(true);
    } else {
      setIsVerified(false);
      setCodeNotValid(false);
      goNext();
    }
  };

  const goToSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <>
      {isVerified ? (
        <>
          <View style={styles.invitationSentWrapper}>
            <View style={styles.invitationSentIconWrapper}>
              <View style={styles.invitationSentIcon}></View>
            </View>
            <Text
              fontSize={textStyles.H2}
              fontFamily={fonts.MEDIUM}
              color={colors.dark}
              style={styles.title}
              textAlign="center"
            >
              {t("form:verifySuccessfully")}
            </Text>
            <Text
              fontSize={textStyles.H5}
              fontFamily={fonts.MEDIUM}
              color={colors.grey}
              textAlign="center"
            >
              {t("form:successMessage")}
            </Text>
          </View>

          <PrimaryButton
            title={t("form:button")}
            onPress={() => goToSignIn()}
            disabled={disabled}
          />
        </>
      ) : (
        <>
          <View style={styles.block}>
            <Text
              fontSize={textStyles.H4}
              fontFamily={fonts.MEDIUM}
              color={colors.dark}
              style={styles.title}
              textAlign="left"
            >
              {t("form:enterVerificationCode")}
            </Text>
            <Text
              fontSize={textStyles.H6}
              fontFamily={fonts.MEDIUM}
              textAlign="left"
              color={colors.grey}
              style={styles.subtitle}
            >
              {userRole === "child"
                ? t("form:sentVerificationCodeToParent")
                : t("form:sentVerificationCodeToChild")}
            </Text>

            <Text
              fontSize={textStyles.H6}
              fontFamily={fonts.MEDIUM}
              textAlign="left"
              color={colors.dark}
              style={styles.codeSubtitle}
            >
              {t("form:verificationCode")}
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
            title={t("form:button")}
            onPress={() => verifyCode()}
            disabled={disabled}
          />
        </>
      )}
    </>
  );
};

export default memo(EnterCode);
