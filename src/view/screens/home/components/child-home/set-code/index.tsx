import React, { useEffect, useState } from "react";
import { View, Text as TextRN, Keyboard, TouchableOpacity, ImageBackground, SafeAreaView } from "react-native";
import Text from "~/view/components/Text";
import { styles } from "./styles";
import PrimaryButton from "~/view/components/PrimaryButton";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import { useIOS } from "~/helpers/useIOS";
import { verticalScale } from "~/constants/metrics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "~/view/components/modal";
import { BluredView } from "~/view/components/BluredView";
import { useNavigation } from "@react-navigation/native";
import { Child } from "~/services/Child";

import SignUpHeader from "../../../../authentication-screens/sign-up/components/header";
import SuccessfulScreen from "./SuccessfullyScreen";
import { useTranslation } from "~/i18n";

const CELL_COUNT = 4;

const SetCodeChild = () => {
  const [firstCode, setFirstCode] = useState<string>("");
  const [secondCode, setSecondCode] = useState<string>("");
  const { t } = useTranslation();
  const [showSuccessfullyScreen, setShowSuccessfullyScreen] = useState<boolean>(false);

  const [codeIsEntered, setCodeIsEntered] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [value, setValue] = useState<string>("");

  const isIOS = useIOS();
  const navigation = useNavigation();
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (firstCode.length === 4) {
      Keyboard.dismiss();
    }
  }, [firstCode]);

  useEffect(() => {
    if (secondCode.length === 4) {
      Keyboard.dismiss();
    }
  }, [secondCode]);

  const setPesronalPinCode = async () => {
    if (firstCode === secondCode) {
      const setCodeResponse = await Child.setCode(secondCode);
      console.log(setCodeResponse, "successfully code set");

      if (setCodeResponse.code) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          setShowSuccessfullyScreen(true);
        }, 1500);
      }
    }
  };

  return (
    <>
      {!showSuccessfullyScreen ? (
        <ImageBackground source={require("~/view/assets/images/backgrounds/1.1.png")}>
          <View style={styles.containerWrapper}>
            <SafeAreaView />
            <SignUpHeader activeStep={4} goBack={() => console.log("some")} title={t("header:fourthStepForParent")} />
            <View style={styles.container}>
              <View style={styles.content}>
                {codeIsEntered ? (
                  <>
                    <View style={styles.topBar}>
                      <Text fontSize={textStyles.H4} fontFamily={fonts.MEDIUM} color={colors.dark} textAlign="left">
                        אנא הזן שוב את קוד האבטחה האישי
                      </Text>
                      <Text fontSize={textStyles.H6} fontFamily={fonts.MEDIUM} color={colors.grey} textAlign="left">
                        הכנס את קוד האבטחה בשנית כדי לאמת אותו
                      </Text>

                      <Text fontSize={textStyles.H6} fontFamily={fonts.MEDIUM} textAlign="left" color={colors.dark} style={styles.codeSubtitle}>
                        קוד אבטחה אישי
                      </Text>

                      <CodeField
                        ref={ref}
                        {...props}
                        value={secondCode}
                        onChangeText={setSecondCode}
                        cellCount={CELL_COUNT}
                        rootStyle={[styles.codeWrapperHebrew]}
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
                    </View>

                    <View style={styles.button}>
                      <PrimaryButton title={"הגדר קוד אבטחה"} onPress={setPesronalPinCode} disabled={secondCode.length !== 4} />
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.topBar}>
                      <Text fontSize={textStyles.H4} fontFamily={fonts.MEDIUM} color={colors.dark} textAlign="left">
                        אנא בחר קוד אבטחה אישי
                      </Text>
                      <Text fontSize={textStyles.H6} fontFamily={fonts.MEDIUM} color={colors.grey} textAlign="left" style={{ marginTop: verticalScale(8) }}>
                        הקוד ישמש אותך לצורך רכישותך באפליקציה
                      </Text>

                      <Text fontSize={textStyles.H6} fontFamily={fonts.MEDIUM} textAlign="left" color={colors.dark} style={styles.codeSubtitle}>
                        קוד אבטחה אישי
                      </Text>

                      <CodeField
                        ref={ref}
                        {...props}
                        value={firstCode}
                        onChangeText={setFirstCode}
                        cellCount={CELL_COUNT}
                        rootStyle={[styles.codeWrapperHebrew]}
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
                    </View>
                    <View style={styles.button}>
                      <PrimaryButton title={"הגדר קוד אבטחה"} onPress={() => setCodeIsEntered(true)} disabled={firstCode.length !== 4} />
                    </View>
                  </>
                )}
              </View>
              {showModal && <SuccessModal showModal={showModal} closeModal={() => setShowModal(false)} />}
            </View>
          </View>
        </ImageBackground>
      ) : (
        <SuccessfulScreen />
      )}
    </>
  );
};

interface SuccessModalProps {
  closeModal: () => void;
  showModal: boolean;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ showModal, closeModal }) => {
  return (
    <Modal showModal={showModal}>
      <BluredView styles={styles.modalContainer}>
        <View style={styles.cardCircle}>
          <View style={styles.cardCircleInner} />
        </View>
        <Text fontSize={textStyles.H2} fontFamily={fonts.BOLD} color={colors.dark} textAlign="left" style={{ marginTop: verticalScale(24) }}>
          קוד האבטחה הוגדר בהצלחה!
        </Text>
      </BluredView>
    </Modal>
  );
};

export default SetCodeChild;
