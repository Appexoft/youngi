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
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { userRoles } from "~/constants/main";
import Lottie from "lottie-react-native";
import SuccessIcon from "~/view/assets/icons/success_icon.svg";

const height = Dimensions.get("window").height;

const SuccessfulScreen: React.FC = () => {
  const dispatch = useDispatch();
  const userInfo = useAppSelector((state) => state.signUp.registrationInfo);
  const navigation = useNavigation();

  const goToHomePage = async () => {
    navigation.navigate("HomeScreen");
  };

  const goToParentInvite = async () => {
    navigation.navigate("ConnectParentStack");
  };

  return (
    <ImageBackground
      source={require("~/view/assets/images/backgrounds/1.2.png")}
    >
      <View style={[styles.containerSuccess, { height }]}>
        <View style={styles.contentSuccess}>
          {userInfo.role === userRoles.parent ? (
            <SuccessIcon />
          ) : (
            <View style={styles.cardCircleSuccess}>
              <View style={styles.cardCircleInnerSuccess}>
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

          <View style={styles.primaryBottonSuccess}>
            <PrimaryButton title="חבר הורה לחשבונך" onPress={goToHomePage} />
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
