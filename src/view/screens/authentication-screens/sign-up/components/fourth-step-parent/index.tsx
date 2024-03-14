import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "~/view/components/Text";
import SendInvitation from "./SendInvitation";
import { styles } from "./styles";
import VerifyNumber from "./VerifyNumber";
import { selectUserRole } from "~/modules/sign-up/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "~/i18n";
import PrimaryButton from "~/view/components/PrimaryButton";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { setRegistrationInfo } from "~/modules/sign-up/actions";

interface Props {
  goNext: () => void;
}

const FourthStep: React.FC<Props> = ({ goNext }) => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const userRole = useSelector(selectUserRole);

  return (
    <View style={styles.container}>
      {userRole === "child" ? (
        <View style={styles.alreadyHaveAcc}>
          <Text
            fontSize={textStyles.H4}
            fontFamily={fonts.MEDIUM}
            color={colors.dark}
            style={styles.alreadyHaveAccTitle}
          >
            {t("form:parentAlreadyHaveAcc")}
          </Text>
          <View style={styles.button}>
            <PrimaryButton
              title={t("form:button")}
              onPress={() => dispatch(setRegistrationInfo({ role: "" }))}
              style={{ marginBottom: 20 }}
              buttonSize="small"
            />
            <PrimaryButton
              title={t("form:button")}
              onPress={() => dispatch(setRegistrationInfo({ role: "" }))}
              buttonSize="small"
            />

            <TouchableOpacity style={styles.goToTheMainPage}>
              <Text
                fontSize={textStyles.H6}
                fontFamily={fonts.REGULAR}
                color={colors.purpleLinear}
              >
                {t("form:goToHomePage")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          {activeStage ? (
            <VerifyNumber goNext={goNext} />
          ) : (
            <SendInvitation goToConfirm={() => setActiveStage(1)} />
          )}
        </View>
      )}
    </View>
  );
};

export default FourthStep;
