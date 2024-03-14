import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

import {
  colors,
  fonts,
  getColorWithOpacity,
  textStyles,
} from "~/constants/designConstants";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import Text from "~/view/components/Text";

import { styles } from "./styles";
import ThreeDotsIcon from "~/view/assets/svg-components/ThreeDotsIcon";
import LinearGradient from "react-native-linear-gradient";
import { useQuery } from "react-query";
import { Parent } from "~/services/Parent";
import { QueryKey } from "~/constants/query";
import { useIOS } from "~/helpers/useIOS";

interface Props {
  childName?: string;
  childImage?: string | null;
}

const MyCard: React.FC<Props> = ({ childName, childImage }) => {
  const [totalMonthBudget, setTotalMonthBudget] = useState<number>(0);
  const [progressWidth, setProgressWidth] = useState<string>("0");
  const { t } = useTranslation();
  const navigation = useNavigation();
  const myChildrenList = useQuery([QueryKey.PARENT_MY_CHILDREN], () => {
    return Parent.getChildrenList();
  });
  const myBalance = useQuery([QueryKey.PARENT_BALANCE], () => {
    return Parent.getCreditCardBalance();
  });
  const isIOS = useIOS();

  useEffect(() => {
    if (myChildrenList.data && myChildrenList.data.length > 0) {
      const totalBuget = myChildrenList.data.reduce(
        (a, b) => a + b.total_allowed_expenses,
        0
      );
      setTotalMonthBudget(totalBuget);
    }
  }, [myChildrenList.data]);

  useEffect(() => {
    if (totalMonthBudget && myBalance.data) {
      setProgressWidth(
        String(myBalance.data?.expenses / (totalMonthBudget / 100))
      );
    }
  }, [totalMonthBudget, myBalance.data]);

  const goToMyCards = () => {
    navigation.navigate("PaymentMethods");
  };

  return (
    <TouchableOpacity onPress={goToMyCards}>
      {myChildrenList.isLoading || myBalance.isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.purpleLinear} />
        </View>
      ) : (
        <LinearGradient
          colors={[colors.purpleLinear, colors.purpleSecond]}
          style={[styles.myCardContainer, isIOS && styles.myCardContainerIOS]}
          start={{ x: 0.4, y: 0 }}
          end={{ x: 1.1, y: 0.1 }}
        >
          <View
            style={[
              isIOS
                ? styles.myCardBackgroundFirstCircleIOS
                : styles.myCardBackgroundFirstCircle,
            ]}
          >
            <View style={styles.myCardBackgroundFirstCircleInnner}></View>
          </View>
          <View style={[isIOS ? styles.myCardBackgroundSecondCircleIOS : styles.myCardBackgroundSecondCircle]}>
            <View style={styles.myCardBackgroundSecondCircleInnner}></View>
          </View>

          <View
            style={[
              styles.myCardContent,
              isIOS && {
                alignItems: "flex-end",
              },
            ]}
          >
            <View style={styles.meCardBudgetCount}>
              <Text
                fontSize={textStyles.H4}
                fontFamily={fonts.MEDIUM}
                color={colors.white}
                style={{
                  marginBottom: verticalScale(3),
                  marginRight: horizontalScale(6),
                }}
              >
                ₪
              </Text>
              <Text
                fontSize={textStyles.H1}
                fontFamily={fonts.MEDIUM}
                color={colors.white}
              >
                {totalMonthBudget}
              </Text>
            </View>

            <Text
              fontSize={textStyles.H6}
              fontFamily={fonts.MEDIUM}
              color={getColorWithOpacity(colors.white, 0.9)}
            >
              {t("homePageView:myCard")}
            </Text>
          </View>

          <View style={styles.myCardScaleContainer}>
            <View
              style={[
                styles.myCardScaleTopBar,
                isIOS && styles.myCardScaleTopBarIOS,
              ]}
            >
              <View style={{ justifyContent: "flex-start" }}>
                <Text
                  fontSize={textStyles.H6}
                  fontFamily={fonts.REGULAR}
                  color={getColorWithOpacity(colors.white, 0.8)}
                  textAlign={isIOS ? "right" : "left"}
                >
                  {t("homePageView:myCardCameOut")}
                </Text>
                <Text
                  fontSize={textStyles.H6}
                  fontFamily={fonts.REGULAR}
                  color={getColorWithOpacity(colors.white, 0.8)}
                  textAlign={isIOS ? "right" : "left"}
                  style={{ marginTop: verticalScale(-2) }}
                >
                  {`₪${myBalance.data?.expenses ?? 0}`}
                </Text>
              </View>

              <View style={{ justifyContent: "flex-end" }}>
                <Text
                  fontSize={textStyles.H6}
                  fontFamily={fonts.REGULAR}
                  color={getColorWithOpacity(colors.white, 0.8)}
                  textAlign={isIOS ? "left" : "right"}
                >
                  {t("homePageView:myCardLeft")}
                </Text>
                <Text
                  fontSize={textStyles.H6}
                  fontFamily={fonts.REGULAR}
                  color={getColorWithOpacity(colors.white, 0.8)}
                  textAlign={isIOS ? "left" : "right"}
                  style={{ marginTop: verticalScale(-2) }}
                >
                  {`₪${totalMonthBudget - myBalance.data.expenses}`}
                </Text>
              </View>
            </View>
            <View style={[styles.myCardScale, isIOS && styles.myCardScaleIOS]}>
              <View
                style={[
                  styles.myCardProgressBar,
                  {
                    width: `${progressWidth}%`,
                  },
                ]}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.myCardThreeDots, isIOS && styles.myCardThreeDotsIOS]}
          >
            <ThreeDotsIcon color={colors.white} />
          </TouchableOpacity>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

export default MyCard;
