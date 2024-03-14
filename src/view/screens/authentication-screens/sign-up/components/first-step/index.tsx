import React from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { userRoles } from "~/constants/main";
import { setRegistrationInfo } from "~/modules/sign-up/actions";
import SecondaryButton from "~/view/components/SecondaryButton";
import Text from "~/view/components/Text";
import { styles } from "./styles";
import { useTranslation } from "~/i18n";

interface Props {
  goNext: () => void;
}

const FirstStep: React.FC<Props> = ({ goNext }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const setUserRole = (value: string) => {
    dispatch(setRegistrationInfo({ role: value }));
    goNext();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text
          fontSize={textStyles.H4}
          fontFamily={fonts.MEDIUM}
          color={colors.dark}
          style={styles.title}
          textAlign="left"
        >
          {t("home:accountType")}
        </Text>
        <View style={styles.buttons}>
          <SecondaryButton
            title={t("home:child")}
            onPress={() => setUserRole(userRoles.child)}
          />
          <SecondaryButton
            title={t("home:parent")}
            onPress={() => setUserRole(userRoles.parent)}
          />
        </View>
      </View>
    </View>
  );
};

export default FirstStep;
