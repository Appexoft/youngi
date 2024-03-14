import React, { useState } from "react";
import { View } from "react-native";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import PrimaryButton from "~/view/components/PrimaryButton";
import Text from "~/view/components/Text";
import TextInput from "~/view/components/TextInput";
import { styles } from "./styles";

import InvitationSentIcon from "~/view/assets/icons/invitation-sent.svg";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formErrors } from "~/config/validation";
import { useTranslation } from "~/i18n";
import { selectUserRole } from "~/modules/sign-up/selectors";
import { useSelector } from "react-redux";
import MaskedInput from "~/view/components/MaskedInput";

interface Props {
  goToConfirm: () => void;
}

const validation = yup.object({
  phone: yup
    .string()
    .min(10, formErrors.INVALID_PHONE)
    .required(formErrors.REQUIRED),
});

const SendInvitation: React.FC<Props> = ({ goToConfirm }) => {
  const { t } = useTranslation();
  const userRole = useSelector(selectUserRole);

  const [isInvitationSent, setIsInvitationSent] = useState<boolean>(false);
  const form = useForm<{ phone: string }>({
    defaultValues: {
      phone: "05",
    },
    resolver: yupResolver(validation),
  });
  form.watch();

  const onButtonPress = () => {
    if (!isInvitationSent) {
      // call api to send invitation by child's number
      setIsInvitationSent(true);
    } else {
      goToConfirm();
    }
  };

  return (
    <>
      {isInvitationSent ? (
        <View style={styles.invitationSentWrapper}>
          <View style={styles.invitationSentIconWrapper}>
            <View style={styles.invitationSentIcon}>
              <InvitationSentIcon />
            </View>
          </View>
          <Text
            fontSize={textStyles.H2}
            fontFamily={fonts.MEDIUM}
            color={colors.dark}
            style={styles.title}
            textAlign="center"
          >
            {t("form:sentInvitation")}
          </Text>
          <Text
            fontSize={textStyles.H5}
            fontFamily={fonts.MEDIUM}
            color={colors.grey}
            textAlign="center"
          >
            {t("form:sentInvitationToJoin")}
          </Text>
        </View>
      ) : (
        <View style={styles.block}>
          <Text
            fontSize={textStyles.H4}
            fontFamily={fonts.MEDIUM}
            color={colors.dark}
            style={styles.title}
            textAlign="left"
          >
            {userRole === "child"
              ? t("form:enterPerentNumberForOrdering")
              : t("form:enterChildNumberForOrdering")}
          </Text>
          <Text
            fontSize={textStyles.H6}
            fontFamily={fonts.MEDIUM}
            textAlign="left"
            color={colors.grey}
            style={styles.subtitle}
          >
            {userRole === "child"
              ? t("form:sendInvitationToParent")
              : t("form:sendInvitationToChild")}
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
      )}

      <PrimaryButton
        title={t("form:button")}
        onPress={form.handleSubmit(onButtonPress)}
      />
    </>
  );
};

export default SendInvitation;
