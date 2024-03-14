import React, { useEffect } from "react";
import { SafeAreaView, View, ScrollView, StyleSheet, RefreshControl } from "react-native";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { QueryKey } from "~/constants/query";
import { setUserDetails } from "~/modules/user/actions";
import { Child } from "~/services/Child";
import HomeHeader from "../header";
import HomeView from "./home-view";
import ChildBudget from "./child-budget";
import { colors } from "~/constants/designConstants";

const ChildHomePage: React.FC = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const childInfo = useQuery([QueryKey.CHILD_INFO], () => {
    return Child.getChildInfo();
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    childInfo.refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (childInfo.data) {
      dispatch(setUserDetails(childInfo.data));
    }
  }, [childInfo.data]);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <ScrollView
        style={styles.containerWrapper}
        showsVerticalScrollIndicator={false}
        // bounces={false}
        refreshControl={<RefreshControl refreshing={refreshing} colors={[colors.purpleLinear]} tintColor={colors.purpleLinear} onRefresh={onRefresh} />}
      >
        <HomeHeader />
        <ChildBudget />
        <HomeView />
      </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F2F2FA",
  },
  containerWrapper: {
    width: "100%",
    height: "100%",
  },
});

export default ChildHomePage;
