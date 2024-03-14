import React from "react";
import {
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
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
import Lottie from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import SuccessIcon from "~/view/assets/icons/success_icon.svg";

const height = Dimensions.get("window").height;

const SuccessfulScreen: React.FC = ({ role }) => {
  const dispatch = useDispatch();
  const userInfo = useAppSelector((state) => state.signUp.registrationInfo);
  const navigation = useNavigation();
  const tempToken = useAppSelector((state) => state.signUp.tempToken);

  const goToHomePage = async () => {
    if (userInfo.role === userRoles.child) {
      dispatch(setAccessToken(tempToken));
    } else if (userInfo.role === userRoles.parent) {
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
        navigation.navigate("AddChild");
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
    <ImageBackground
      source={require("~/view/assets/images/backgrounds/1.2.png")}
    >
      <View style={[styles.container, { height }]}>
        <View style={styles.content}>
          {userInfo.role === userRoles.parent ? (
            <SuccessIcon />
          ) : (
            <View style={styles.cardCircle}>
              <View style={styles.cardCircleInner}>
                <Lottie
                  source={require("~/view/assets/animations/successfully.json")}
                  autoPlay
                  loop
                />
              </View>
            </View>
          )}

          <Text
            fontSize={textStyles.MEDIUM}
            fontFamily={fonts.BOLD}
            color={colors.dark}
            textAlign="center"
          >
            ההרשמה בוצעה בהצלחה!
          </Text>

          <View style={styles.primaryBotton}>
            <PrimaryButton
              title={
                userInfo.role === userRoles.child
                  ? "חבר הורה לחשבונך"
                  : "חבר ילד לחשבונך"
              }
              onPress={goToHomePage}
            />
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
      </View>
    </ImageBackground>
  );
};

export default SuccessfulScreen;
