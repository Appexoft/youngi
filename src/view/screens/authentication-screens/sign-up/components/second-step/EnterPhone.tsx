import React, { memo, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, View } from "react-native";
import { useDispatch } from "react-redux";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { setRegistrationInfo } from "~/modules/sign-up/actions";
import { User } from "~/services/User";
import PrimaryButton from "~/view/components/PrimaryButton";
import Text from "~/view/components/Text";
import { styles } from "./styles";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formErrors } from "~/config/validation";
import { useTranslation } from "~/i18n";
import MaskedInput from "~/view/components/MaskedInput";

interface Props {
  goEnterCode: () => void;
}

const validation = yup.object({
  phone: yup
    .string()
    .min(8, formErrors.INVALID_PHONE)
    .required(formErrors.REQUIRED),
});

const EnterPhone: React.FC<Props> = ({ goEnterCode }) => {
  const form = useForm<{ phone: string }>({
    defaultValues: {
      phone: "05",
    },
    resolver: yupResolver(validation),
  });
  form.watch();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const sendNumber = async () => {
    goEnterCode();
    const phone = "+9725" + form.getValues("phone").replace(/\s/g, "").slice(2);
    const response = await User.sendPhone(phone);
    dispatch(
      setRegistrationInfo({
        phone,
        phoneToken: response.register_access_token,
      })
    );
  };

  useEffect(() => {
    if (form.getValues("phone").length === 11) {
      Keyboard.dismiss();
    }
  }, [form.getValues("phone")]);

  return (
    <>
      <View style={styles.block}>
        <Text
          fontSize={textStyles.H4}
          fontFamily={fonts.MEDIUM}
          color={colors.dark}
          style={styles.title}
        >
          {t("form:enterPhone")}
        </Text>
        <Text
          fontSize={textStyles.H6}
          fontFamily={fonts.MEDIUM}
          textAlign="left"
          color={colors.grey}
          style={styles.subtitle}
        >
          {t("form:sendVerificationCode")}
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
            />
          )}
          name="phone"
          rules={{ required: true }}
        />
      </View>
      <PrimaryButton
        title={t("form:button")}
        onPress={form.handleSubmit(sendNumber)}
      />
    </>
  );
};

export default memo(EnterPhone);
