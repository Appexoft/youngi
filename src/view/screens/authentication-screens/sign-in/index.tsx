import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ImageBackground, KeyboardAvoidingView, TouchableOpacity, View, SafeAreaView } from "react-native";
import { styles } from "./styles";
import { useTranslation } from "~/i18n";
import ArrowBackIcon from "~/view/assets/icons/arrow-back.svg";
import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "~/view/components/TextInput";
import PrimaryButton from "~/view/components/PrimaryButton";
import { useIOS } from "~/helpers/useIOS";
import { verticalScale } from "~/constants/metrics";
import { User } from "~/services/User";
import { useDispatch } from "react-redux";
import { setAccessToken, setUserInfo } from "~/modules/user/actions";
import { formErrors } from "~/config/validation";
import ErrorModal from "./ErrorModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SignInInterface {
  email: string;
  password: string;
}

const validation = yup.object({
  email: yup.string().email(formErrors.INVALID_EMAIL).required(formErrors.REQUIRED),
  password: yup.string().required(formErrors.REQUIRED),
});

export const SignIn = () => {
  const [error, serError] = useState<boolean>(false);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const isIOS = useIOS();
  const dispatch = useDispatch();

  const form = useForm<SignInInterface>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validation),
  });
  form.watch();

  const login = async () => {
    try {
      const response = await User.login(form.getValues());
      if (response && response.access_token) {
        dispatch(setAccessToken(response.access_token));
        dispatch(
          setUserInfo({
            email: response.user,
            role: response.role,
          })
        );
        const wasLogged = await AsyncStorage.getItem("wasLogged");
        if (!wasLogged) {
          await AsyncStorage.setItem("wasLogged", JSON.stringify(true));
        }
      } else {
        serError(true);
      }
    } catch (e) {}
  };

  const goToForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const closeErrorModal = () => {
    serError(false);
  };

  return (
    <>
      <ImageBackground source={require("~/view/assets/images/backgrounds/1.1.png")}>
        <KeyboardAvoidingView behavior="height" style={styles.container}>
          <SafeAreaView />
          <View
            style={[
              styles.header,
              {
                marginTop: isIOS ? verticalScale(15) : verticalScale(25),
              },
            ]}
          >
            <TouchableOpacity style={styles.goBackContainer} onPress={() => navigation.goBack(-1)}>
              <ArrowBackIcon />
            </TouchableOpacity>
          </View>

          <View style={styles.containerWrapper}>
            <View style={styles.content}>
              <Text fontSize={textStyles.H4} fontFamily={fonts.BOLD} color={colors.dark} style={styles.title}>
                {t("login:welcomeBack")}
              </Text>
              <Text fontSize={textStyles.H6} fontFamily={fonts.MEDIUM} color={colors.grey} style={styles.subtitle} textAlign="center">
                {t("login:cuteSlogan")}
              </Text>

              <View style={styles.row}>
                <Controller
                  control={form.control}
                  render={({ field: { onChange, value } }) => <TextInput onChange={(value) => onChange(value)} value={value as string} label={t("form:email")} placeholder={t("form:email")} error={form.formState.errors.email} />}
                  name="email"
                  rules={{ required: true }}
                />
              </View>
              <View style={styles.row}>
                <Controller
                  control={form.control}
                  render={({ field: { onChange, value } }) => <TextInput onChange={(value) => onChange(value)} value={value as string} label={t("form:password")} placeholder={t("form:password")} error={form.formState.errors.email} isPassword />}
                  name="password"
                  rules={{ required: true }}
                />
              </View>

              <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => goToForgotPassword()}>
                <Text fontSize={textStyles.H6} fontFamily={fonts.MEDIUM} color={colors.purpleLinear} style={styles.subtitle} textAlign="right">
                  {t("login:forgotPassword")}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <PrimaryButton title={"התחברות"} onPress={form.handleSubmit(login)} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
      {error && <ErrorModal showModal={error} close={closeErrorModal} />}
    </>
  );
};
