import React from "react";
import { View } from "react-native";
import { styles } from "../../styles";
import { useHebrew, useTranslation } from "~/i18n";
import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "~/view/components/TextInput";
import PrimaryButton from "~/view/components/PrimaryButton";
import { formErrors } from "~/config/validation";
import { User } from "~/services/User";
import { useDispatch } from "react-redux";

interface EnterEmailFormInterface {
  email: string;
  role: string;
}

interface Props {
  setEmailEntered: (value: boolean) => void;
}

const validation = yup.object({
  email: yup
    .string()
    .email(formErrors.INVALID_EMAIL)
    .required(formErrors.REQUIRED),
});

export const EnterEmail: React.FC<Props> = ({ setEmailEntered }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const form = useForm<EnterEmailFormInterface>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(validation),
  });
  form.watch();

  const sendEmail = async () => {
    const response = await User.forgetPasword(form.getValues());
    if (response.message) {
      console.log(response, "forgetPasword");
      // dispatch()
      setEmailEntered(true);
    }
  };

  return (
    <>
      <View style={[styles.content]}>
        <Text
          fontSize={textStyles.H4}
          fontFamily={fonts.MEDIUM}
          color={colors.dark}
          style={styles.title}
        >
          {t("forgotPassword:title")}
        </Text>
        <Text
          fontSize={textStyles.H6}
          fontFamily={fonts.MEDIUM}
          color={colors.grey}
          style={styles.subtitle}
        >
          {t("forgotPassword:subtitle")}
        </Text>

        <View style={styles.row}>
          <Controller
            control={form.control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChange={(value) => onChange(value)}
                value={value as string}
                label={"אימייל"}
                placeholder={"אימייל"}
                error={form.formState.errors.email}
              />
            )}
            name="email"
            rules={{ required: true }}
          />
        </View>
      </View>
      <View style={styles.button}>
        <PrimaryButton
          title={"אפס סיסמה"}
          onPress={form.handleSubmit(sendEmail)}
        />
      </View>
    </>
  );
};
