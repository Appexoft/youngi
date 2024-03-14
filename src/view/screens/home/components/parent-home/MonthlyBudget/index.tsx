import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
} from "react-native";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import Text from "~/view/components/Text";
import { styles } from "./styles";

import SmallHeader from "~/view/components/SmallHeader";
import { useNavigation } from "@react-navigation/native";
import { BluredView } from "~/view/components/BluredView";
import { useAppSelector } from "~/store/hooks";
import SmallPersonIcon from "~/view/assets/svg-components/SmallPersonIcon";
import { verticalScale } from "~/constants/metrics";
import TextInput from "~/view/components/TextInput";
import PrimaryButton from "~/view/components/PrimaryButton";
import { Parent } from "~/services/Parent";
import { useDispatch } from "react-redux";
import { setRefetchMyChildren } from "~/modules/other/actions";

interface Props {}

const budgetsArray = [100, 250, 350, 500, 750, 1000];

const height = Dimensions.get("window").height;

const MonthlyBudget: React.FC<Props> = () => {
  const [budget, setBudget] = useState<string>("");
  const activeChild = useAppSelector((state) => state.home.activeChild);

  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSetBudget = async () => {
    const limit = Number(budget);

    if (activeChild?.id && limit) {
      await Parent.setChildBudget(activeChild?.id, limit);
      dispatch(setRefetchMyChildren(true));
      navigation.goBack(-1);
    }
  };

  const goBack = () => {
    navigation.goBack(-1);
  };

  const handleSelectBudget = (item: number) => {
    setBudget(String(item));
  };

  return (
    <ImageBackground
      source={require("~/view/assets/images/backgrounds/3.1.png")}
      style={[
        styles.containerWrapper,
        {
          height,
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            height,
          },
        ]}
      >
        <SafeAreaView />
        <View style={styles.header}>
          <SmallHeader label={t("monthlyBudget:header")} onPress={goBack} />

          <BluredView styles={styles.content}>
            <View style={styles.childImage}>
              {activeChild?.image ? (
                <Image source={{ uri: activeChild.image }} />
              ) : (
                <SmallPersonIcon width={35} height={35} color={colors.white} />
              )}
            </View>

            <Text
              fontSize={textStyles.H5}
              fontFamily={fonts.MEDIUM}
              color={colors.dark}
              textAlign="left"
              style={{ marginTop: verticalScale(12) }}
            >
              {activeChild?.name as string}
            </Text>

            <Text
              fontSize={textStyles.H4}
              fontFamily={fonts.MEDIUM}
              color={colors.dark}
              textAlign="center"
              style={{ marginTop: verticalScale(28), maxWidth: 330 }}
            >
              {t("monthlyBudget:title")}
            </Text>

            <View style={styles.selectBudgetContainer}>
              {budgetsArray.map((item, index) => {
                const isBottomRow = index > 2;
                return (
                  <TouchableOpacity
                    style={[
                      styles.budgetItem,
                      isBottomRow && {
                        marginTop: verticalScale(28),
                      },
                    ]}
                    key={index}
                    onPress={() => handleSelectBudget(item)}
                  >
                    <Text
                      fontSize={textStyles.H5}
                      fontFamily={fonts.MEDIUM}
                      color={colors.purpleLinear}
                      textAlign="left"
                    >
                      {`₪${item}`}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              <View style={styles.manualBudget}>
                <TextInput
                  value={budget}
                  onChange={setBudget}
                  placeholder={t("monthlyBudget:input")}
                  color={"#F2F2FB"}
                  isBudget
                  isNumber
                />
              </View>
            </View>
          </BluredView>
        </View>

        <View style={styles.button}>
          <PrimaryButton
            title={t("monthlyBudget:button")}
            onPress={handleSetBudget}
            disabled={budget.length === 0}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default MonthlyBudget;
