import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "../../styles";
import { useTranslation } from "~/i18n";
import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "~/view/components/TextInput";
import PrimaryButton from "~/view/components/PrimaryButton";
import { formErrors } from "~/config/validation";
import { User } from "~/services/User";
import { useNavigation } from "@react-navigation/native";

interface EnterEmailFormInterface {
  code: string;
  password: string;
  passwordConfirm: string;
  role: string;
}

interface Props {
  setIsEmailEntered: (value: boolean) => void;
}

const validation = yup.object({
  code: yup.string().required(formErrors.REQUIRED),
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

export const ResetPassword: React.FC<Props> = ({ setIsEmailEntered }) => {
  const [resendCode, setResendCode] = useState<boolean>(false);
  const { t } = useTranslation();
  const form = useForm<EnterEmailFormInterface>({
    defaultValues: {
      code: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(validation),
  });
  form.watch();
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setResendCode(true);
    }, 120000);
  }, []);

  const resetPassword = async () => {
    const response = await User.resetPasssword(form.getValues());

    if (response) {
      navigation.navigate("SignIn");
    }
  };

  return (
    <>
      <View style={[styles.content]}>
        <Text fontSize={textStyles.H4} fontFamily={fonts.MEDIUM} color={colors.dark} style={styles.title}>
          {t("forgotPassword:passwordReset")}
        </Text>
        <Text fontSize={textStyles.H6} fontFamily={fonts.MEDIUM} color={colors.grey} style={styles.subtitle}>
          {t("forgotPassword:resetSubtitle")}
        </Text>

        <View style={styles.wrapper}></View>

        <View style={styles.row}>
          <Controller
            control={form.control}
            render={({ field: { onChange, value } }) => <TextInput onChange={(value) => onChange(value)} value={value as string} label={t("form:tempCode")} placeholder={t("form:tempCode")} error={form.formState.errors.code} />}
            name="code"
            rules={{ required: true }}
          />
          {resendCode && (
            <View style={[styles.resendCode]}>
              <TouchableOpacity onPress={() => setIsEmailEntered(false)}>
                <Text fontSize={textStyles.H7} fontFamily={fonts.MEDIUM} color={colors.purpleLinear}>
                  {` שלח קוד חדש`}
                </Text>
              </TouchableOpacity>
              <Text fontSize={textStyles.H7} fontFamily={fonts.MEDIUM} color={colors.red} style={{}}>
                קוד זמני פג תוקף,
              </Text>
            </View>
          )}
        </View>

        <View style={styles.row}>
          <Controller
            control={form.control}
            render={({ field: { onChange, value } }) => <TextInput onChange={(value) => onChange(value)} value={value as string} maxLength={16} label={t("forgotPassword:newPassword")} placeholder={t("form:password")} error={form.formState.errors.password} isPassword />}
            name="password"
            rules={{ required: true }}
          />
        </View>

        <View style={styles.row}>
          <Controller
            control={form.control}
            render={({ field: { onChange, value } }) => <TextInput onChange={(value) => onChange(value)} value={value as string} maxLength={16} label={t("forgotPassword:verifyNewPassword")} placeholder={t("form:password")} error={form.formState.errors.passwordConfirm} isPassword />}
            name="passwordConfirm"
            rules={{ required: true }}
          />
        </View>
      </View>
      <View style={styles.button}>
        <PrimaryButton title={"אפס סיסמה"} onPress={form.handleSubmit(resetPassword)} />
      </View>
    </>
  );
};
