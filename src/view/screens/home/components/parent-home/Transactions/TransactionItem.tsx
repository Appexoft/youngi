import React, { version } from "react";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { verticalScale } from "~/constants/metrics";
import { useHebrew } from "~/i18n";
import { Transaction } from "~/models/home";
import Text from "~/view/components/Text";

import { styles } from "./styles";

interface Props {
  transactionInfo: Transaction;
}

const dateOptions = {
  hour: "2-digit",
  minute: "2-digit",
};

const TransactionItem: React.FC<Props> = ({ transactionInfo }) => {
  const { t } = useTranslation();
  const isHebrew = useHebrew();

  return (
    <View style={styles.container}>
      <View style={styles.paymentInfo}>
        <View style={styles.storeLogo}>
          <Image
            source={{ uri: transactionInfo.logo }}
            style={{ width: "150%", height: "150%" }}
          />
        </View>
        <View>
          <Text
            fontSize={textStyles.H5}
            fontFamily={fonts.MEDIUM}
            color={colors.dark}
          >
            {transactionInfo.business_name}
          </Text>
          <Text
            fontSize={textStyles.H7}
            fontFamily={fonts.REGULAR}
            color={colors.dark}
            style={{ marginTop: verticalScale(2) }}
          >
            {transactionInfo.order_details.length
              ? transactionInfo.order_details
              : "אין תיאור"}
          </Text>
          <Text
            fontSize={textStyles.H7}
            fontFamily={fonts.REGULAR}
            color={colors.grey}
            style={{ marginTop: verticalScale(2) }}
          >
            {new Date(transactionInfo.payment_date).toLocaleDateString(
              "en-GB",
              dateOptions
            )}
          </Text>
        </View>
      </View>
      <Text
        fontSize={textStyles.H5}
        fontFamily={fonts.MEDIUM}
        color={colors.dark}
      >
        {`₪${transactionInfo.payment}`}
      </Text>
    </View>
  );
};

export default TransactionItem;
