import React from "react";
import { Touchable, TouchableOpacity, View } from "react-native";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import Text from "~/view/components/Text";
import { styles } from "./styles";
import { getColorWithOpacity } from "~/constants/designConstants";
import { verticalScale } from "~/constants/metrics";
import { useNavigation } from "@react-navigation/native";
import { useIOS } from "~/helpers/useIOS";

interface Props {
  name: string;
}

const NoCard: React.FC<Props> = ({ name }) => {
  const navigation = useNavigation();
  const isIOS = useIOS();

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container]}>
        <View style={[isIOS ? styles.circleIOS :styles.circle]}>
          <View style={styles.circleInner}></View>
        </View>

        <Text
          fontSize={textStyles.H5}
          fontFamily={fonts.MEDIUM}
          color={colors.white}
        >
          אין יתרה בחשבונך
        </Text>
        <Text
          fontSize={textStyles.H6}
          fontFamily={fonts.REGULAR}
          color={getColorWithOpacity(colors.white, 0.8)}
          style={{
            marginTop: verticalScale(8),
            marginBottom: verticalScale(74),
          }}
        >
          שמנו לב שההורה לא הטעין עבורך כסף לחשבון באפשרותך לשלוח אליו בקשה
          לטעינת כסף
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ConnectParentStack")}
        >
          <Text
            fontSize={textStyles.H5}
            fontFamily={fonts.MEDIUM}
            color={colors.purpleLinear}
            textAlign="left"
          >
            שליחת בקשה לטעינת כסף
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoCard;
