import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
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
import { useHebrew, useTranslation } from "~/i18n";
import { useNavigation } from "@react-navigation/native";
import { userRoles } from "~/constants/main";
import { useDispatch } from "react-redux";

import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "react-native-image-picker";

import SignUpHeader from "../../../authentication-screens/sign-up/components/header";
import { useQuery } from "react-query";
import { QueryKey } from "~/constants/query";
import { Parent } from "~/services/Parent";
import { Child } from "~/services/Child";
import { EditProfileModal } from "./EditProfileModal";

interface Props {
  goNext: () => void;
}

const EditUserProfile: React.FC<Props> = ({ goNext }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [deleteAccount, setDeleteAccount] = useState<boolean>(false);

  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const phoneNumber = useAppSelector(
    (state) => state.signUp.registrationInfo.phone
  );
  const useInfo = useAppSelector((state) => state.signUp.registrationInfo);

  const phoneToken = useAppSelector(
    (state) => state.signUp.registrationInfo.phoneToken
  );
  const role = useAppSelector((state) => state.signUp.registrationInfo.role);
  const userInfo = useAppSelector((state) => state.user.info);

  const form = useForm<UserProfileModel>({
    defaultValues: {
      name: userInfo?.name,
      email: userInfo?.email,
      role,
      active: true,
      payable: true,
      phoneToken,
    },
  });
  form.watch();

  const onSubmit = () => {
    navigation.goBack();
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response: any) => {
      setImage(response.assets[0].uri);
    });
  };

  return (
    <ImageBackground
      source={require("~/view/assets/images/backgrounds/1.1.png")}
    >
      <View style={styles.container}>
        <SafeAreaView />
        <SignUpHeader
          activeStep={3}
          goBack={() => navigation.goBack()}
          title={"פרטים אישיים"}
        />
        <View style={styles.containerWrap}>
          <View style={styles.content}>
            <ScrollView
              contentContainerStyle={[styles.contentWrapper]}
              style={{ width: "100%" }}
            >
              <Text
                fontSize={textStyles.H4}
                fontFamily={fonts.MEDIUM}
                color={colors.dark}
                style={styles.title}
              >
                {t("form:registrationDetails")}
              </Text>
              <Text
                fontSize={textStyles.H5}
                fontFamily={fonts.MEDIUM}
                color={colors.dark}
                style={styles.subtitle}
              >
                {t("form:profilePicture")}
              </Text>
              {image ? (
                <View style={styles.photoUploadedWrapper}>
                  <Image source={{ uri: "data:image/jpeg;base64" + image }} />
                </View>
              ) : (
                <View style={styles.photoWrapper}>
                  <PesronIcon />
                  <TouchableOpacity
                    style={styles.photoButton}
                    onPress={pickImage}
                  >
                    <PlusIcon />
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.row}>
                <Controller
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      onChange={(value) => onChange(value)}
                      value={value as string}
                      label={t("form:fullName")}
                      placeholder={t("form:fullName")}
                      error={form.formState.errors.name}
                    />
                  )}
                  name="name"
                  rules={{ required: true }}
                />
              </View>
              <View style={styles.row}>
                <Controller
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      label={t("form:email")}
                      placeholder="example@mail.com"
                      onChange={(value) => onChange(value)}
                      error={form.formState.errors.email}
                    />
                  )}
                  name="email"
                  rules={{ required: true }}
                />
              </View>
              {/* <View style={styles.row}>
                <Controller
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      label={t("form:password")}
                      placeholder={t("form:enterPassword")}
                      onChange={(value) => onChange(value)}
                      error={form.formState.errors.password}
                      isPassword
                    />
                  )}
                  name="password"
                  rules={{ required: true }}
                />
              </View>

              <View style={styles.row}>
                <Controller
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      label={t("form:password")}
                      placeholder={t("form:enterPassword")}
                      onChange={(value) => onChange(value)}
                      error={form.formState.errors.passwordConfirm}
                      isPassword
                    />
                  )}
                  name="passwordConfirm"
                  rules={{ required: true }}
                />
              </View> */}

              <View style={styles.row}>
                <DateInput label={t("form:dateOfBirth")} />
              </View>

              <View style={styles.button}>
                <PrimaryButton title={"שמירה"} onPress={onSubmit} />

                {role === userRoles.parent && (
                  <TouchableOpacity
                    style={styles.goToTheMainPage}
                    onPress={form.handleSubmit(goHome)}
                  >
                    <Text
                      fontSize={textStyles.H6}
                      fontFamily={fonts.REGULAR}
                      color={colors.purpleLinear}
                    >
                      {t("form:goToHomePage")}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.deleteAccountButton}>
                <TouchableOpacity onPress={() => setDeleteAccount(true)}>
                  <Text
                    fontSize={textStyles.H5}
                    fontFamily={fonts.MEDIUM}
                    color={colors.purpleLinear}
                    style={styles.title}
                  >
                    {"מחק חשבון"}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>

        {deleteAccount && (
          <EditProfileModal
            showModal={deleteAccount}
            close={() => setDeleteAccount(false)}
            onSuccess={() => setDeleteAccount(false)}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default EditUserProfile;
