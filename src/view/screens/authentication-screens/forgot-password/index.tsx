import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { styles } from "./styles";
import ArrowBackIcon from "~/view/assets/icons/arrow-back.svg";
import { EnterEmail } from "./components/enter-email";
import { ResetPassword } from "./components/reset-password";
import { useIOS } from "~/helpers/useIOS";
import { verticalScale } from "~/constants/metrics";

export const ForgotPassword = () => {
  const [isEmailEntered, setIsEmailEntered] = useState<boolean>(false);

  const navigation = useNavigation();
  const isIOS = useIOS();

  const goBack = () => {
    if (isEmailEntered) {
      setIsEmailEntered(false);
    } else {
      navigation.goBack(-1);
    }
  };

  const setEmailEntered = (value: boolean) => {
    setIsEmailEntered(value);
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/backgrounds/1.1.png")}
    >
      <View style={styles.container}>
        <SafeAreaView />
        <View
          style={[
            styles.header,
            {
              marginTop: isIOS ? verticalScale(15) : verticalScale(25),
            },
          ]}
        >
          <TouchableOpacity
            style={styles.goBackContainer}
            onPress={() => goBack()}
          >
            <ArrowBackIcon />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.containerWrapper,
            {
              height: isEmailEntered ? 600 : 480,
            },
          ]}
        >
          {isEmailEntered ? (
            <ResetPassword setIsEmailEntered={setEmailEntered} />
          ) : (
            <EnterEmail setEmailEntered={setEmailEntered} />
          )}
        </View>
      </View>
    </ImageBackground>
  );
};
