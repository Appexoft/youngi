import React, { useState } from "react";
import { View } from "react-native";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import PrimaryButton from "~/view/components/PrimaryButton";
import Text from "~/view/components/Text";
import TextInput from "~/view/components/TextInput";
import { styles } from "./styles";

import EnterCode from "./EnterCode";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formErrors } from "~/config/validation";
import { useTranslation } from "~/i18n";
import { selectUserRole } from "~/modules/sign-up/selectors";
import { useSelector } from "react-redux";
import MaskedInput from "~/view/components/MaskedInput";

interface Props {
  goNext: () => void;
}

const validation = yup.object({
  phone: yup
    .string()
    .min(10, formErrors.INVALID_PHONE)
    .required(formErrors.REQUIRED),
});

const VerifyNumber: React.FC<Props> = ({ goNext }) => {
  const { t } = useTranslation();
  const userRole = useSelector(selectUserRole);

  const [isPhoneCodeSent, setIsPhoneCodeSentt] = useState<boolean>(false);
  const form = useForm<{ phone: string }>({
    defaultValues: {
      phone: "05",
    },
    resolver: yupResolver(validation),
  });
  form.watch();

  const onButtonPress = () => {
    if (!isPhoneCodeSent) {
      // call api to send invitation by child's number API NOT IMPLEMENT YET
      setIsPhoneCodeSentt(true);
    } else {
      goNext();
    }
  };

  return (
    <>
      {isPhoneCodeSent ? (
        <EnterCode goNext={goNext} />
      ) : (
        <>
          <View style={styles.block}>
            <Text
              fontSize={textStyles.H4}
              fontFamily={fonts.MEDIUM}
              color={colors.dark}
              style={styles.title}
              textAlign="left"
            >
              {userRole === "child"
                ? t("form:enterPerentNumberForVerification")
                : t("form:enterChildNumberForVerification")}
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
            onPress={form.handleSubmit(onButtonPress)}
          />
        </>
      )}
    </>
  );
};

export default VerifyNumber;
