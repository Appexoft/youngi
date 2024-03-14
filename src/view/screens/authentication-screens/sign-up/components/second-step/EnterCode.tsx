import React, { memo, useEffect, useState } from "react";
import { View, Text as TextRN, TouchableOpacity, Keyboard } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import PrimaryButton from "~/view/components/PrimaryButton";
import Text from "~/view/components/Text";
import Timer from "~/view/components/Timer";
import { styles } from "./styles";

import ReloadIcon from "~/view/assets/icons/reload-active.svg";
import { User } from "~/services/User";
import { useDispatch } from "react-redux";
import { setRegistrationInfo } from "~/modules/sign-up/actions";
import { useAppSelector } from "~/store/hooks";
import { useHebrew, useTranslation } from "~/i18n";
import { verticalScale } from "~/constants/metrics";
import { useIOS } from "~/helpers/useIOS";
import ErrorModal from "~/view/components/ErrorModal";

interface Props {
  goNext: () => void;
}

const CELL_COUNT = 4;

const EnterCode: React.FC<Props> = ({ goNext }) => {
  const [value, setValue] = useState<string>("");
  const [codeNotValid, setCodeNotValid] = useState<boolean>(false);
  const [resendCode, setResendCode] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const isIOS = useIOS();

  const isHebrew = useHebrew();

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const phoneNumber = useAppSelector((state) => state.signUp.registrationInfo.phone);
  const phoneToken = useAppSelector((state) => state.signUp.registrationInfo.phoneToken);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (value.length === 4) {
      setDisabled(false);
      Keyboard.dismiss();
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
    console.log("verifyCode", response);

    if (response.status === "code valid" || response.status === "success") {
      setCodeNotValid(false);
      goNext();
    } else {
      setCodeNotValid(true);
    }
  };

  const closeModal = () => {
    setCodeNotValid(false);
  };

  return (
    <>
      <View style={styles.block}>
        <Text fontSize={textStyles.H4} fontFamily={fonts.MEDIUM} color={colors.dark} style={styles.title}>
          {t("form:enterVerificationCode")}
        </Text>
        <Text fontSize={textStyles.H6} fontFamily={fonts.MEDIUM} color={colors.grey} style={styles.subtitle}>
          {t("form:sentVerificationCode")}
        </Text>

        <Text fontSize={textStyles.H6} fontFamily={fonts.MEDIUM} color={colors.dark} style={styles.codeSubtitle}>
          {t("form:verificationCode")}
        </Text>

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={[styles.codeWrapper]}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View key={index} style={[styles.codeItemWrapper]} onLayout={getCellOnLayoutHandler(index)}>
              <TextRN style={[symbol || isFocused ? styles.codeItem : isIOS ? styles.codeItemE : styles.codeItemAndroid]}>
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
            <TouchableOpacity style={styles.timerContent} onPress={() => handleResendCode()}>
              <Text fontSize={15} fontFamily={fonts.MEDIUM} textAlign="right" color={colors.purpleLinear}>
                {t("form:expires")}
              </Text>
              <ReloadIcon />
            </TouchableOpacity>
          ) : (
            <View style={styles.timerContent}>
              <Text fontSize={15} fontFamily={fonts.REGULAR} textAlign="right" color={colors.grey}>
                {t("form:seconds")}
              </Text>
              <Timer initialMinute={2} initialSeconds={0} onTimerEnd={() => setResendCode(true)} customStyles={styles.timer} />
              <Text fontSize={15} fontFamily={fonts.REGULAR} textAlign="right" color={colors.grey}>
                {t("form:resendCode")}
              </Text>
            </View>
          )}
        </View>
      </View>

      <PrimaryButton title={t("form:button")} onPress={() => verifyCode()} disabled={disabled} />

      {codeNotValid && <ErrorModal showModal={codeNotValid} close={closeModal} label={t("form:codeError")} />}
    </>
  );
};

export default memo(EnterCode);
