import React from "react";
import { useTranslation } from "react-i18next";
import { View, ActivityIndicator } from "react-native";
import { useQuery } from "react-query";
import { colors } from "~/constants/designConstants";
import { QueryKey } from "~/constants/query";
import { Child } from "~/services/Child";
import { useAppSelector } from "~/store/hooks";
import StoreItem from "../store-item";
import { styles } from "./styles";

interface Props {}

const StoresList: React.FC<Props> = () => {
  const activeMallId = useAppSelector((state) => state.home.activeMall.id);
  const { t } = useTranslation();
  const shops = useQuery([QueryKey.CHILD_STORES_LIST, activeMallId], () => {
    if (activeMallId) {
      return Child.getShopList(activeMallId);
    } else {
      return undefined;
    }
  });

  return (
    <View style={styles.container}>
      {shops.isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.purpleLinear} />
        </View>
      ) : (
        shops.data?.map((item) => {
          return (
            <StoreItem
              storeInfo={item}
              date={t("homePage:valid")}
              key={item.id}
            />
          );
        })
      )}
    </View>
  );
};

export default StoresList;
