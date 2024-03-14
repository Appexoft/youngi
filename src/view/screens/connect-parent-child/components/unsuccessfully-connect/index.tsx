import React from "react";
import {
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import PrimaryButton from "~/view/components/PrimaryButton";
import { styles } from "./styles";

import { useNavigation } from "@react-navigation/native";
import SmallHeader from "~/view/components/SmallHeader";

import Lottie from "lottie-react-native";
import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { verticalScale } from "~/constants/metrics";
import { BluredView } from "~/view/components/BluredView";

const height = Dimensions.get("window").height;

const UnsuccessfullyConnect: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("~/view/assets/images/backgrounds/2.1.png")}
    >
      <BluredView
        styles={[
          styles.container,
          {
            height,
          },
        ]}
      >
        <SafeAreaView />
        <View style={{ marginTop: verticalScale(15) }}>
          <SmallHeader
            label="חיבור חשבונות בין הורה לילד"
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={styles.content}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <View style={styles.circleWrapper}>
              <View style={styles.circleInner}>
                <Lottie
                  source={require("~/view/assets/animations/xmark.json")}
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
              שיוך ״שם״ לחשבונך נכשל
            </Text>
            <Text
              fontSize={textStyles.H5}
              fontFamily={fonts.MEDIUM}
              color={colors.grey}
              textAlign="center"
              style={{ marginTop: verticalScale(8) }}
            >
              כדאי לבדוק מול שירות הלקוחות שלנו: Youngi@mail.com
            </Text>
          </View>
          <View style={{ width: "100%" }}>
            <PrimaryButton
              title="נסה שנית"
              onPress={() => navigation.navigate("EnterInvitePhone")}
            />
            <TouchableOpacity
              style={styles.secondButton}
              onPress={() => navigation.navigate("HomeScreen")}
            >
              <Text
                fontSize={textStyles.H5}
                fontFamily={fonts.MEDIUM}
                color={colors.purpleSecond}
                textAlign="center"
              >
                דלג בינתיים
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BluredView>
    </ImageBackground>
  );
};

export default UnsuccessfullyConnect;
