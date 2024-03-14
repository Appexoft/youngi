import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { useHebrew } from "~/i18n";
import Text from "~/view/components/Text";
import { styles } from "./styles";

import ToggleSwitch from "toggle-switch-react-native";
import { ShopInterface } from "~/models/home";
import { Parent } from "~/services/Parent";

interface Props {
  storeInfo: ShopInterface;
  childId: number | null;
}

const StoreRow: React.FC<Props> = ({ storeInfo, childId }) => {
  const [toggleOn, setToggleOn] = useState<boolean>(storeInfo.allowed);
  const isHebrew = useHebrew();

  const blockChildStore = async (allowed: boolean) => {
    setToggleOn(allowed);
    const params = {
      childId,
      businessId: storeInfo.id,
      block: !allowed,
    };
    const response = await Parent.blockChildBusiness(params);
    console.log(response, "responseresponse");
  };

  return (
    <TouchableOpacity
      style={styles.storeRow}
      onPress={() => blockChildStore(!toggleOn)}
    >
      <View style={styles.storeRowInfo}>
        <View style={styles.storeRowIcon}>
          <Image
            source={{ uri: storeInfo.logo }}
            style={{ height: "150%", width: "150%" }}
          />
        </View>
        <Text
          fontSize={isHebrew ? textStyles.H5 : textStyles.H7}
          fontFamily={fonts.MEDIUM}
          color={colors.dark}
          style={styles.titleText}
        >
          {storeInfo.name}
        </Text>
      </View>
      <ToggleSwitch
        isOn={toggleOn}
        onColor={colors.purpleLinear}
        offColor={colors.lightBlue}
        size="medium"
        onToggle={(isOn) => {
          setToggleOn(isOn);
          blockChildStore(!toggleOn);
        }}
        animationSpeed={150}
      />
    </TouchableOpacity>
  );
};

export default StoreRow;
