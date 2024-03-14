import React from "react";
import { Dimensions, ImageBackground, SafeAreaView, View } from "react-native";
import { styles } from "./styles";
import { useTranslation } from "~/i18n";
import SmallHeader from "~/view/components/SmallHeader";
import { useNavigation } from "@react-navigation/native";
import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { verticalScale } from "~/constants/metrics";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formErrors } from "~/config/validation";
import { Controller, useForm } from "react-hook-form";
import MaskedInput from "~/view/components/MaskedInput";
import PrimaryButton from "~/view/components/PrimaryButton";
import { useAppSelector } from "~/store/hooks";
import { userRoles } from "~/constants/main";
import { Parent } from "~/services/Parent";
import { Child } from "~/services/Child";

const height = Dimensions.get("window").height;

const validation = yup.object({
  phone: yup
    .string()
    .min(8, formErrors.INVALID_PHONE)
    .required(formErrors.REQUIRED),
});

const EnterPhone = () => {
  const form = useForm<{ phone: string }>({
    defaultValues: {
      phone: "05",
    },
    resolver: yupResolver(validation),
  });
  form.watch();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const userRole = useAppSelector((state) => state.user.user.role);

  const sendNumber = async () => {
    const phone = "+9725" + form.getValues("phone").replace(/\s/g, "").slice(2);

    if (userRole === userRoles.parent) {
      const response = await Parent.inviteChild(phone);
      if (response.message === "code sent") {
        navigation.navigate("EnterInviteCode");
      } else {
        navigation.navigate("InvitationSend");
      }
    } else if (userRole === userRoles.child) {
      const response = await Child.inviteParent(phone);

      if (response.message === "code sent") {
        navigation.navigate("EnterInviteCode");
      } else {
        navigation.navigate("InvitationSend");
      }
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
        <View style={styles.header}>
          <SmallHeader
            label="חיבור חשבונות בין הורה לילד"
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={styles.content}>
          <Text
            fontSize={textStyles.H4}
            fontFamily={fonts.MEDIUM}
            color={colors.dark}
          >
            הכנס מספר טלפון של ההורה לצורך הזמנה
          </Text>
          <Text
            fontSize={textStyles.H6}
            fontFamily={fonts.REGULAR}
            color={colors.grey}
            style={{ marginTop: verticalScale(8) }}
          >
            אנו נשלח הזמנה להורה על מנת להצטרף לאפליקציה
          </Text>

          <View style={{ width: "100%", marginTop: verticalScale(24) }}>
            <Controller
              control={form.control}
              render={({ field: { onChange, value } }) => (
                <MaskedInput
                  value={value}
                  onChange={onChange}
                  label={t("form:placeholder")}
                  error={form.formState.errors.phone}
                  type="phone"
                  placeholderColor={colors.placeholderColor}
                  isPhone
                  onPhonePress={() => navigation.navigate("InviteScreen")}
                />
              )}
              name="phone"
              rules={{ required: true }}
            />
          </View>

          <View style={styles.button}>
            <PrimaryButton title="המשך" onPress={() => sendNumber()} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default EnterPhone;
