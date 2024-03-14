import React from "react";
import { ImageBackground, View, SafeAreaView } from "react-native";

import { styles } from "../styles";

import SmallHeader from "~/view/components/SmallHeader";
import { useNavigation } from "@react-navigation/native";
import Lottie from "lottie-react-native";
import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { verticalScale } from "~/constants/metrics";
import PrimaryButton from "~/view/components/PrimaryButton";

const InvitationSend: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("~/view/assets/images/backgrounds/3.2.png")}
    >
      <View style={styles.container}>
        <SafeAreaView />
        <View style={{ marginTop: verticalScale(15) }}>
          <SmallHeader
            label="חיבור חשבונות בין הורה לילד"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.invitationSendContent}>
          <View style={styles.inviteCircleWrapper}>
            <View style={styles.inviteCircleInner}>
              <Lottie
                source={require("~/view/assets/animations/successfully.json")}
                autoPlay
                loop
              />
            </View>
          </View>

          <Text
            fontSize={textStyles.MEDIUM}
            fontFamily={fonts.MEDIUM}
            color={colors.dark}
            textAlign="center"
            style={{ marginTop: verticalScale(24) }}
          >
            ההזמנה נשלחה !
          </Text>

          <Text
            fontSize={textStyles.H5}
            fontFamily={fonts.MEDIUM}
            color={colors.grey}
            textAlign="center"
            style={{ marginTop: verticalScale(8) }}
          >
            נשלחה הזמנה להצטרפות לאפליקציה
          </Text>

          <View style={styles.inviteSendButton}>
            <PrimaryButton
              title="מעבר לדף הבית"
              onPress={() => navigation.navigate("HomeScreen")}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default InvitationSend;
