import React, { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View, Text as RNText } from "react-native";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import Text from "~/view/components/Text";
import { styles } from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";

import PesronIcon from "~/view/assets/icons/person.svg";
import PlusIcon from "~/view/assets/icons/plus.svg";
import TextInput from "~/view/components/TextInput";
import { Controller, useForm } from "react-hook-form";
import PrimaryButton from "~/view/components/PrimaryButton";
import { UserProfileModel } from "~/models/user";
import { useAppSelector } from "~/store/hooks";
import DateInput from "~/view/components/DateInput";
import CheckBox from "~/view/components/CheckBox";
import * as yup from "yup";
import { formErrors } from "~/config/validation";
import { User } from "~/services/User";
import { useTranslation } from "~/i18n";
import { useNavigation } from "@react-navigation/native";
import { userRoles } from "~/constants/main";
import { useDispatch } from "react-redux";
import { setRegistrationInfo, setTempToken } from "~/modules/sign-up/actions";
import { setUserInfo } from "~/modules/user/actions";

import { launchImageLibrary } from "react-native-image-picker";
import PrivacyPolicy from "../private-policy";
import { setAccessToken } from "~/modules/user/actions";

interface Props {
  goNext: () => void;
}

const validation = yup.object({
  name: yup.string().required(formErrors.REQUIRED),
  email: yup.string().email(formErrors.INVALID_EMAIL).required(formErrors.REQUIRED),
  password: yup
    .string()
    .min(8, formErrors.PASSWORD_LENGHT)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, "סיסמתך חייבת להכיל 8 תווים לפחות, אותיות גדולות  וקטנות ולפחות ספרה אחת")
    .required(formErrors.REQUIRED),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), undefined], formErrors.PASSWORD_MISMATCH)
    .required(formErrors.REQUIRED),
});

const ThirdStep: React.FC<Props> = ({ goNext }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState<boolean>(false);

  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const phoneNumber = useAppSelector((state) => state.signUp.registrationInfo.phone);

  const phoneToken = useAppSelector((state) => state.signUp.registrationInfo.phoneToken);
  const role = useAppSelector((state) => state.signUp.registrationInfo.role);

  const form = useForm<UserProfileModel>({
    defaultValues: {
      name: "",
      email: "",
      phone: phoneNumber,
      password: "",
      passwordConfirm: "",
      role,
      active: true,
      payable: true,
      phoneToken,
    },
    resolver: yupResolver(validation),
  });
  form.watch();

  const onSubmit = async () => {
    const registration = await User.registration(form.getValues());
    if (registration) {
      if (role === userRoles.child) {
        dispatch(setUserInfo(form.getValues()));
        const loginResponse = await login();
        if (loginResponse && loginResponse.access_token) {
          dispatch(
            setUserInfo({
              email: loginResponse.user,
              role: loginResponse.role,
            })
          );
          dispatch(setTempToken(loginResponse.access_token));
          goNext();
        }
      } else {
        dispatch(setRegistrationInfo(form.getValues()));
        goNext();
      }
    }
  };

  const login = async () => {
    const params = {
      email: form.getValues("email") as string,
      password: form.getValues("passwordConfirm") as string,
    };
    const response = await User.login(params);
    return response;
  };

  function getBase64(file: any): any {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      return reader.result;
    };
    reader.onerror = function (error) {
      return error;
    };
  }

  const goHome = async () => {
    const response = await User.registration(form.getValues());
    const res = await login();

    if (res && res.access_token) {
      dispatch(setAccessToken(res.access_token));

      dispatch(
        setUserInfo({
          email: res.user,
          role: res.role,
        })
      );
    } else {
      navigation.navigate("SignIn");
    }
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response: any) => {
      setImage(response.assets[0].uri);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={[styles.contentWrapper]} style={{ width: "100%" }}>
          <Text fontSize={textStyles.H4} fontFamily={fonts.MEDIUM} color={colors.dark} style={styles.title}>
            {t("form:registrationDetails")}
          </Text>
          <Text fontSize={textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.dark} style={styles.subtitle}>
            {t("form:profilePicture")}
          </Text>
          {image ? (
            <View style={styles.photoUploadedWrapper}>
              <Image source={{ uri: "data:image/jpeg;base64" + image }} />
            </View>
          ) : (
            <View style={styles.photoWrapper}>
              <PesronIcon />
              <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                <PlusIcon />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.row}>
            <Controller
              control={form.control}
              render={({ field: { onChange, value } }) => <TextInput onChange={(value) => onChange(value)} value={value as string} label={t("form:fullName")} placeholder={t("form:fullName")} error={form.formState.errors.name} />}
              name="name"
              rules={{ required: true }}
            />
          </View>
          <View style={styles.row}>
            <Controller control={form.control} render={({ field: { onChange, value } }) => <TextInput value={value} label={t("form:email")} placeholder="example@mail.com" onChange={(value) => onChange(value)} error={form.formState.errors.email} />} name="email" rules={{ required: true }} />
          </View>
          <View style={styles.row}>
            <Controller control={form.control} render={({ field: { onChange, value } }) => <TextInput value={value} maxLength={16} label={t("form:password")} placeholder={t("form:enterPassword")} onChange={(value) => onChange(value)} isPassword />} name="password" rules={{ required: true }} />

            <RNText style={{ color: "#ADADB2", textAlign: "right", fontFamily: fonts.REGULAR, fontSize: textStyles.H7, marginTop: 8 }}>סיסמתך חייבת להכיל 8 תווים לפחות, אותיות גדולות וקטנות ולפחות ספרה אחת</RNText>
          </View>

          <View style={styles.row}>
            <Controller
              control={form.control}
              render={({ field: { onChange, value } }) => <TextInput value={value} maxLength={16} label={t("form:password")} placeholder={t("form:enterPassword")} onChange={(value) => onChange(value)} error={form.formState.errors.passwordConfirm} isPassword />}
              name="passwordConfirm"
              rules={{ required: true }}
            />
          </View>

          <View style={styles.row}>
            <DateInput label={t("form:dateOfBirth")} />
          </View>

          <View style={[styles.row, styles.checkbox]}>
            {i18n.language === "en" ? (
              <View style={styles.checkboxContainer}>
                <Text fontSize={textStyles.H6} fontFamily={fonts.REGULAR} color={colors.dark}>
                  {t("form:iAgreeTo")}
                </Text>
                <TouchableOpacity style={styles.checkboxText}>
                  <Text fontSize={textStyles.H6} fontFamily={fonts.REGULAR} color={colors.purpleLinear}>
                    {t("form:termsOfUse")}
                  </Text>
                </TouchableOpacity>
                <Text fontSize={textStyles.H6} fontFamily={fonts.REGULAR} color={colors.dark}>
                  {t("form:inTheApp")}
                </Text>
              </View>
            ) : (
              <View style={styles.checkboxContainer}>
                <Text fontSize={textStyles.H6} fontFamily={fonts.REGULAR} color={colors.dark}>
                  {t("form:inTheApp")}
                </Text>
                <TouchableOpacity style={styles.checkboxText} onPress={() => setOpenPrivacyPolicy(true)}>
                  <Text fontSize={textStyles.H6} fontFamily={fonts.REGULAR} color={colors.purpleLinear}>
                    {t("form:termsOfUse")}
                  </Text>
                </TouchableOpacity>
                <Text fontSize={textStyles.H6} fontFamily={fonts.REGULAR} color={colors.dark}>
                  {t("form:iAgreeTo")}
                </Text>
              </View>
            )}

            <CheckBox style={[styles.checkboxButton]} onChange={() => setChecked(!checked)} checked={checked} />
          </View>

          <View style={styles.button}>
            <PrimaryButton title="שמירה" onPress={form.handleSubmit(onSubmit)} disabled={!checked} />

            {role === userRoles.parent && (
              <TouchableOpacity style={styles.goToTheMainPage} onPress={form.handleSubmit(goHome)}>
                <Text fontSize={textStyles.H6} fontFamily={fonts.REGULAR} color={colors.purpleLinear}>
                  {t("form:goToHomePage")}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>

      {openPrivacyPolicy && (
        <PrivacyPolicy
          showModal={openPrivacyPolicy}
          close={() => setOpenPrivacyPolicy(false)}
          agree={() => {
            setOpenPrivacyPolicy(false);
            setChecked(true);
          }}
        />
      )}
    </View>
  );
};

export default ThirdStep;
