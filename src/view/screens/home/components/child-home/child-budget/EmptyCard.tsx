import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { verticalScale } from "~/constants/metrics";
import { useIOS } from "~/helpers/useIOS";
import SmallPersonIcon from "~/view/assets/svg-components/SmallPersonIcon";
import Text from "~/view/components/Text";
import { styles } from "./styles";

interface Props {
  name: string;
}

const EmptyCard: React.FC<Props> = ({ name }) => {
  const navigation = useNavigation();
  const isIOS = useIOS();

  return (
    <View style={styles.emptyCard}>
      <View style={[isIOS ? styles.emptyCardCircleIOS : styles.emptyCardCircle]}>
        <View style={styles.emptyCardCircleInner} />
      </View>
      <View style={styles.emptyCardRow}>
        <View style={styles.emptyCardImage}>
          <SmallPersonIcon width={30} height={30} color={colors.white} />
        </View>
        <View style={styles.emptyCardText}>
          <Text
            fontSize={textStyles.H5}
            fontFamily={fonts.MEDIUM}
            color={colors.white}
          >
            {`${name ?? ""} היי`}
          </Text>
          <Text
            fontSize={textStyles.H6}
            fontFamily={fonts.REGULAR}
            color={colors.white}
            style={{ marginTop: verticalScale(8) }}
          >
            חשבונך לא מחובר לאף הורה. הזמן הורה לאפליקציה ותוכל להתחיל לבצע
            עסקאות ולהנות מהטבות!
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.emptyCardButton}
        onPress={() => navigation.navigate("ConnectParentStack")}
      >
        <Text
          fontSize={textStyles.H5}
          fontFamily={fonts.MEDIUM}
          color={colors.purpleLinear}
        >
          חבר הורה לחשבונך
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyCard;
