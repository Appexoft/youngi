import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useHebrew } from "~/i18n";

import { styles } from "./styles";
import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { useQuery } from "react-query";
import { QueryKey } from "~/constants/query";
import { Parent } from "~/services/Parent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "~/models/navigation";
import SmallHeader from "~/view/components/SmallHeader";
import { useNavigation } from "@react-navigation/native";
import EmptyCard from "../CardView/EmptyCard";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import RecentTransactions from "../HomePageView/RecentTransactions";
import MyChildrenItem from "../MyChildren/MyChildrenItem";
import ChildBudget from "../../child-home/child-budget";

type Props = NativeStackScreenProps<RootStackParamList, "ChildScreen">;

const ChildPage: React.FC<Props> = ({ route }) => {
  const { childId } = route.params;
  const navigation = useNavigation();
  const { t } = useTranslation();
  const isHebrew = useHebrew();
  const childInfo = useQuery([QueryKey.PARENT_MY_CHILDREN, childId], () => {
    return Parent.getChildInfo(childId);
  });
  const cardInfo = useQuery([QueryKey.PARENT_CARD_INFO], () => {
    return Parent.getCreditCardInfo();
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setTimeout(() => {
        childInfo.refetch();
      }, 100);
    });
    return unsubscribe;
  }, [navigation]);

  const goBack = () => {
    navigation.goBack(-1);
  };

  const goToStoreManagment = () => {
    navigation.navigate("ChildPermissions", {
      childId: childInfo.data?.id,
      childName: childInfo.data?.name,
    });
  };

  const goToSetMonthlyBudget = () => {
    navigation.navigate("MonthlyBudget");
  };

  return (
    <View style={styles.container}>
      <ScrollView bounces={false}>
        <SafeAreaView />
        <View style={{ marginTop: verticalScale(15) }}>
          <SmallHeader
            label={t("childPage:headerTitle")}
            onPress={() => goBack()}
          />
        </View>

        <View style={styles.topContainer}>
          {cardInfo.isLoading || childInfo.isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={colors.purpleLinear} />
            </View>
          ) : cardInfo.data && cardInfo.data.customer.name && childInfo.data ? (
            <MyChildrenItem
              name={childInfo.data.name}
              image={childInfo.data.image}
              payable={childInfo.data.payable}
              id={childInfo.data.id}
              balance={childInfo.data.balance}
              allowedExpences={childInfo.data.total_allowed_expenses}
            />
          ) : (
            <EmptyCard
              childName={childInfo.data?.name}
              childImage={childInfo.data?.image}
            />
          )}

          <View style={styles.topButtons}>
            <TouchableOpacity
              style={styles.topButton}
              onPress={goToSetMonthlyBudget}
            >
              <Text
                fontSize={isHebrew ? textStyles.H6 : textStyles.H7}
                fontFamily={fonts.MEDIUM}
                color={colors.purpleLinear}
              >
                {t("childPage:monthlyBudget")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topButton}
              onPress={goToStoreManagment}
            >
              <Text
                fontSize={isHebrew ? textStyles.H6 : textStyles.H7}
                fontFamily={fonts.MEDIUM}
                color={colors.purpleLinear}
              >
                {t("childPage:storeManagementButton")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View
            style={[styles.contentTopBar, { marginTop: verticalScale(28) }]}
          >
            <Text
              fontSize={isHebrew ? textStyles.H4 : textStyles.H6}
              fontFamily={fonts.MEDIUM}
              color={colors.dark}
            >
              {t("homePageView:recentTransactions")}
            </Text>
          </View>

          <View style={{ paddingHorizontal: horizontalScale(20) }}>
            <RecentTransactions childId={childId} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChildPage;
