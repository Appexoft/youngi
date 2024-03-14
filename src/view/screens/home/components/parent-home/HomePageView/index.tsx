import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useHebrew } from "~/i18n";

import { styles } from "./styles";
import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import MyChildren from "../MyChildren";
import { verticalScale } from "~/constants/metrics";
import RecentTransactions from "./RecentTransactions";
import { Transaction } from "~/models/home";
import { useQuery } from "react-query";
import { QueryKey } from "~/constants/query";
import { Parent } from "~/services/Parent";

interface Props {}

const HomePageView: React.FC<Props> = ({}) => {
  const { t } = useTranslation();
  const isHebrew = useHebrew();

  return (
    <View style={styles.container}>
      <MyChildren />

      <View style={[styles.topBar, { marginTop: verticalScale(28) }]}>
        <Text
          fontSize={isHebrew ? textStyles.H4 : textStyles.H6}
          fontFamily={fonts.MEDIUM}
          color={colors.dark}
        >
          {t("homePageView:recentTransactions")}
        </Text>
      </View>

      <RecentTransactions />
    </View>
  );
};

export default HomePageView;
