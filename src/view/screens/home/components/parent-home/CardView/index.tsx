import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { colors } from "~/constants/designConstants";
import { QueryKey } from "~/constants/query";
import { useIOS } from "~/helpers/useIOS";
import { setIsCardConnected } from "~/modules/home/actions";
import { Parent } from "~/services/Parent";
import EmptyCard from "./EmptyCard";
import MyCard from "./MyCard";

import { styles } from "./styles";

interface Props {}

const CardView: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cardInfo = useQuery([QueryKey.PARENT_CARD_INFO], () => {
    return Parent.getCreditCardInfo();
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      cardInfo.refetch();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (cardInfo.data && cardInfo.data.customer?.name) {
      dispatch(setIsCardConnected(true));
    }
  }, [cardInfo.data]);

  return (
    <View style={styles.container}>
      {cardInfo.isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.purpleLinear} />
        </View>
      ) : cardInfo.data?.customer.name ? (
        <MyCard />
      ) : (
        <EmptyCard />
      )}
    </View>
  );
};

export default CardView;
