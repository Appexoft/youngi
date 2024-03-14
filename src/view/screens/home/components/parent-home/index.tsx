import React, { useEffect } from "react";
import { View, ScrollView, RefreshControl, SafeAreaView } from "react-native";

import { styles } from "./styles";
import HomePageHeader from "./Header";
import CardView from "./CardView";
import HomePageView from "./HomePageView";
import { useQuery } from "react-query";
import { QueryKey } from "~/constants/query";
import { Parent } from "~/services/Parent";
import { useDispatch } from "react-redux";
import { setUserDetails } from "~/modules/user/actions";
import { colors } from "~/constants/designConstants";
import { setRefetchMyChildren } from "~/modules/other/actions";

interface Props {}

const ParentHomePage: React.FC<Props> = ({}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const parentInfo = useQuery([QueryKey.PARENT_INFO], () => {
    return Parent.getParentInfo();
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (parentInfo.data) {
      dispatch(setUserDetails(parentInfo.data));
    }
  }, [parentInfo.data]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    parentInfo.refetch();
    dispatch(setRefetchMyChildren(true));

    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <ScrollView style={styles.containerWrapper} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} colors={[colors.purpleLinear]} tintColor={colors.purpleLinear} onRefresh={onRefresh} />}>
        <HomePageHeader />
        <CardView />
        <HomePageView />
      </ScrollView>
    </View>
  );
};

export default ParentHomePage;
