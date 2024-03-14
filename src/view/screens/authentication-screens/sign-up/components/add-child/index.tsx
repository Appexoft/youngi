import React from "react";
import { Dimensions, ImageBackground, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";
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

const height = Dimensions.get("window").height;

const validation = yup.object({
  phone: yup
    .string()
    .min(8, formErrors.INVALID_PHONE)
    .required(formErrors.REQUIRED),
});

const AddChild = () => {
  const form = useForm<{ phone: string }>({
    defaultValues: {
      phone: "05",
    },
    resolver: yupResolver(validation),
  });
  form.watch();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const sendNumber = async () => {
    const phone = "+9725" + form.getValues("phone").replace(/\s/g, "").slice(2);
  };

  return (
    <ImageBackground
      source={require("../../../../../assets/images/backgrounds/3.2.png")}
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
            textAlign="left"
          >
            הכנס מספר טלפון של הילד לצורך הזמנה
          </Text>
          <Text
            fontSize={textStyles.H6}
            fontFamily={fonts.REGULAR}
            color={colors.grey}
            textAlign="left"
            style={{ marginTop: verticalScale(8) }}
          >
            אנו נשלח הזמנה לילד על מנת להצטרף לאפליקציה
          </Text>

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
              />
            )}
            name="phone"
            rules={{ required: true }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default AddChild;
