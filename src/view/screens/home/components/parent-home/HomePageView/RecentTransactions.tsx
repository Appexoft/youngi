import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import { useHebrew } from "~/i18n";

import { styles } from "./styles";
import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";

import RecentTransactionsIcon from "~/view/assets/icons/recent-transactions.svg";
import ClampIcon from "~/view/assets/icons/clamp.svg";
import { verticalScale } from "~/constants/metrics";
import { useQuery } from "react-query";
import { QueryKey } from "~/constants/query";
import { Parent } from "~/services/Parent";
import TransactionItem from "../Transactions/TransactionItem";
import { Transaction } from "~/models/home";

interface Props {
  childId?: number;
}

const RecentTransactions: React.FC<Props> = ({ childId }) => {
  const [reversedTransactions, setReversedTransactions] = useState<
    Transaction[] | null
  >(null);
  const allTransactions = useQuery([QueryKey.PARENT_ALL_TRANSACTIONS], () => {
    return Parent.getAllTransactions();
  });
  const transactionsById = useQuery(
    [QueryKey.PARENT_TRANSACTIONS_BY_ID, childId],
    () => {
      if (childId) {
        return Parent.getTransactionsById(childId);
      } else {
        return undefined;
      }
    }
  );
  console.log(transactionsById.data, "dsdsdsß");

  const { t } = useTranslation();
  const isHebrew = useHebrew();

  useEffect(() => {
    if (childId) {
      if (transactionsById.data) {
        setReversedTransactions(transactionsById.data.reverse());
      }
    } else {
      if (allTransactions.data) {
        setReversedTransactions(allTransactions.data.reverse());
      }
    }
  }, [allTransactions.data, childId, transactionsById.data]);

  return (
    <View
      style={[
        styles.myChildrenEmptyContainer,
        {
          marginBottom: allTransactions.data
            ? verticalScale(70)
            : verticalScale(130),
        },
      ]}
    >
      {(childId ? transactionsById.isLoading : allTransactions.isLoading) ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.purpleLinear} />
        </View>
      ) : (
          childId
            ? transactionsById.data && transactionsById.data.length > 0
            : allTransactions.data && allTransactions.data.length
        ) ? (
        reversedTransactions?.map((item) => {
          return <TransactionItem transactionInfo={item} key={item.id} />;
        })
      ) : (
        <>
          <View style={styles.myChildrenEmptyIcon}>
            <RecentTransactionsIcon />
            <View style={styles.myChildrenEmptyIconSecond}>
              <ClampIcon />
            </View>
          </View>
          <Text
            fontSize={isHebrew ? textStyles.H5 : textStyles.H6}
            fontFamily={fonts.MEDIUM}
            color={colors.dark}
            textAlign="center"
            style={{ width: 250 }}
          >
            {t("homePageView:recentTransactionsEmpty")}
          </Text>
          <Text
            fontSize={isHebrew ? textStyles.H6 : textStyles.H7}
            fontFamily={fonts.MEDIUM}
            color={colors.grey}
            textAlign="center"
            style={{ width: 330, marginTop: verticalScale(8) }}
          >
            {t("homePageView:recentTransactionsEmptySubtitle")}
          </Text>
        </>
      )}
    </View>
  );
};

export default RecentTransactions;
