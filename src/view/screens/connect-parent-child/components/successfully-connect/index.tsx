import React from "react";
import { View, ImageBackground, Dimensions, SafeAreaView } from "react-native";
import PrimaryButton from "~/view/components/PrimaryButton";
import { styles } from "./styles";

import { useNavigation } from "@react-navigation/native";
import SmallHeader from "~/view/components/SmallHeader";
import Lottie from "lottie-react-native";
import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { verticalScale } from "~/constants/metrics";
import { useDispatch } from "react-redux";
import {
  setRefetchChildData,
  setRefetchMyChildren,
} from "~/modules/other/actions";
import { useAppSelector } from "~/store/hooks";
import { userRoles } from "~/constants/main";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ConnectParentStackParamList,
} from "~/models/navigation";

const height = Dimensions.get("window").height;

type Props = NativeStackScreenProps<
  ConnectParentStackParamList,
  "SuccessfullyConnect"
>;

const SuccessfullyConnect: React.FC<Props> = ({ route }) => {
  const { name } = route.params;
  const userRole = useAppSelector((state) => state.user.user.role);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const goHome = () => {
    userRole === userRoles.parent
      ? dispatch(setRefetchMyChildren(true))
      : dispatch(setRefetchChildData(true));
    navigation.navigate("HomeScreen");
  };

  return (
    <ImageBackground
      source={require("~/view/assets/images/backgrounds/3.2.png")}
    >
      <View
        style={[
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
                  source={require("~/view/assets/animations/vmark.json")}
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
              {` חיבור החשבון של ${name} בוצע בהצלחה!`}
            </Text>
            <Text
              fontSize={textStyles.H5}
              fontFamily={fonts.MEDIUM}
              color={colors.grey}
              textAlign="center"
              style={{ marginTop: verticalScale(8) }}
            >
              {`כעת קיים חיבור בין חשבונך לשל ${name}`}
            </Text>
          </View>
          <PrimaryButton title="המשך" onPress={goHome} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SuccessfullyConnect;
