import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import SuccessIcon from "~/view/assets/icons/success.svg";
import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import PrimaryButton from "~/view/components/PrimaryButton";
import { verticalScale } from "~/constants/metrics";
import { useAppSelector } from "~/store/hooks";
import { User } from "~/services/User";
import { useDispatch } from "react-redux";
import { setAccessToken, setUserInfo } from "~/modules/user/actions";
import { useNavigation } from "@react-navigation/native";
import { userRoles } from "~/constants/main";

interface Props {
  role: string;
}

const ParentSuccessfulScreen: React.FC<Props> = ({ role }) => {
  const dispatch = useDispatch();
  const userInfo = useAppSelector((state) => state.signUp.registrationInfo);
  const navigation = useNavigation();

  const goToHomePage = async () => {
    const response = await login();

    if (response && response.access_token) {
      dispatch(setAccessToken(response.access_token));

      dispatch(
        setUserInfo({
          email: response.user,
          role: response.role,
        })
      );
    } else {
      navigation.navigate("SignIn");
    }
  };

  const goToParentInvite = async () => {
    if (role === userRoles.parent) {
      const response = await login();
      if (response && response.access_token) {
        dispatch(setAccessToken(response.access_token));

        dispatch(
          setUserInfo({
            email: response.user,
            role: response.role,
          })
        );
        navigation.navigate("ConnectParentStack");
      } else {
        navigation.navigate("SignIn");
      }
    }
    navigation.navigate("ConnectParentStack");
  };

  const login = async () => {
    const params = {
      email: userInfo.email as string,
      password: userInfo.password as string,
    };
    const response = await User.login(params);
    return response;
  };

  return (
    <View style={styles.content}>
      <View style={styles.cardCircle}>
        <View style={styles.cardCircleInner}>
          <SuccessIcon />
        </View>
      </View>

      <Text
        fontSize={textStyles.MEDIUM}
        fontFamily={fonts.BOLD}
        color={colors.dark}
        textAlign="center"
      >
        ההרשמה בוצעה בהצלחה!
      </Text>

      <View style={styles.primaryBotton}>
        <PrimaryButton title="חבר ילד לחשבונך" onPress={goToParentInvite} />
      </View>

      <TouchableOpacity onPress={goToHomePage}>
        <Text
          fontSize={textStyles.H5}
          fontFamily={fonts.MEDIUM}
          color={colors.purpleLinear}
          textAlign="center"
          style={{ marginTop: verticalScale(24) }}
        >
          דלג לדף הבית
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ParentSuccessfulScreen;
