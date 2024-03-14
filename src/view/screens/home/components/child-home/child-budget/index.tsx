import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Image, View } from "react-native";
import { useQuery } from "react-query";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { QueryKey } from "~/constants/query";
import { useIOS } from "~/helpers/useIOS";
import { useTranslation } from "~/i18n";
import { Child } from "~/services/Child";
import { useAppSelector } from "~/store/hooks";
import SmallPersonIcon from "~/view/assets/svg-components/SmallPersonIcon";
import Text from "~/view/components/Text";
import EmptyCard from "./EmptyCard";
import { styles } from "./styles";

interface Props {}

const ChildBudget: React.FC<Props> = () => {
  const [progressWidth, setProgressWidth] = useState<string>("0");
  const [restMoney, setRestMoney] = useState<number | undefined>(undefined);
  const childBudget = useQuery([QueryKey.CHILD_BADGET_INFO], () => {
    return Child.getBalanceInfo();
  });
  const childInfo = useQuery([QueryKey.CHILD_INFO], () => {
    return Child.getChildInfo();
  });
  const { t } = useTranslation();
  const isIOS = useIOS();
  const navigation = useNavigation();

  const refetchChildInfo = useAppSelector(
    (state) => state.other.refetchChildData
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      childBudget.refetch();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (refetchChildInfo) {
      setTimeout(() => {
        childInfo.refetch();
      }, 100);
    }
  }, [refetchChildInfo]);

  useEffect(() => {
    if (childBudget.data) {
      setRestMoney(
        childBudget.data.total_allowed_expenses - childBudget.data.expenses
      );
      setProgressWidth(
        String(
          childBudget.data.expenses /
            (childBudget.data.total_allowed_expenses / 100)
        )
      );
    }
  }, [childBudget.data]);

  return (
    <View style={styles.containerWrapper}>
      {childInfo.isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.purpleLinear} />
        </View>
      ) : childInfo.data && childInfo.data.parent_id ? (
        <View style={styles.container}>
          <View style={styles.backgroundCircles}>
            <View style={styles.backgroundSecondCircle}></View>
          </View>

          <View style={styles.content}>
            <View style={styles.titleRow}>
              <Text
                fontSize={textStyles.H6}
                fontFamily={fonts.REGULAR}
                color={colors.white}
                textAlign="left"
                style={styles.title}
              >
                {t("homePage:yourBudgetTitle")}
              </Text>
              <Text
                fontSize={textStyles.H6}
                fontFamily={fonts.REGULAR}
                color={colors.white}
                textAlign="left"
                style={styles.title}
              >
                {` ${childInfo.data?.name} `}
              </Text>
              <Text
                fontSize={textStyles.H6}
                fontFamily={fonts.REGULAR}
                color={colors.white}
                textAlign="left"
                style={styles.title}
              >
                {t("homePage:yourBudgetTitleSec")}
              </Text>
            </View>

            <View style={styles.budgetInfoContainer}>
              <View style={styles.budgetInfo}>
                <Text
                  fontSize={15}
                  fontFamily={fonts.REGULAR}
                  color={colors.white}
                >
                  {isIOS
                    ? `נוצלו ${childBudget.data?.expenses}/${
                        childBudget.data?.total_allowed_expenses ?? 0
                      } ש״ח`
                    : `ש״ח ${childBudget.data?.total_allowed_expenses ?? 0}/${
                        childBudget.data?.expenses
                      } נוצלו`}
                </Text>
                <View style={styles.NISContainer}>
                  <Text
                    fontSize={textStyles.H4}
                    fontFamily={fonts.MEDIUM}
                    color={colors.white}
                  >
                    ₪
                  </Text>
                  <Text
                    fontSize={textStyles.H1}
                    fontFamily={fonts.MEDIUM}
                    color={colors.white}
                    style={styles.NIS}
                  >
                    {restMoney}
                  </Text>
                </View>
              </View>
              <Animated.View style={styles.scaleContainer}>
                <View
                  style={[
                    styles.scaleProgress,
                    {
                      width: `${progressWidth}%`,
                    },
                  ]}
                ></View>
              </Animated.View>
            </View>
          </View>
          <View style={styles.image}>
            {childInfo.data.image.length > 0 ? (
              <Image source={{ uri: childInfo.data.image }} />
            ) : (
              <SmallPersonIcon width="27" height="27" color="#fff" />
            )}
          </View>
        </View>
      ) : (
        <EmptyCard name={childInfo.data?.name} />
      )}
    </View>
  );
};

export default ChildBudget;
