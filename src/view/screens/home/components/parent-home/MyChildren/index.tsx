import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useHebrew } from "~/i18n";

import { styles } from "../HomePageView/styles";
import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";

import NoChildrenIcon from "~/view/assets/icons/no-children.svg";
import ClampIcon from "~/view/assets/icons/clamp.svg";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import MyChildrenItem from "./MyChildrenItem";
import { useQuery } from "react-query";
import { QueryKey } from "~/constants/query";
import { Parent } from "~/services/Parent";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "~/store/hooks";
import { useDispatch } from "react-redux";
import { setRefetchMyChildren } from "~/modules/other/actions";

interface Props {}

const MyChildren: React.FC<Props> = ({}) => {
  const isHebrew = useHebrew();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const refetchMyChildren = useAppSelector(
    (state) => state.other.refetchMyChildren
  );

  const myChildrenList = useQuery([QueryKey.PARENT_MY_CHILDREN], () => {
    return Parent.getChildrenList();
  });

  useEffect(() => {
    if (refetchMyChildren) {
      myChildrenList.refetch();
      dispatch(setRefetchMyChildren(false));
    }
  }, [refetchMyChildren]);

  const addChild = () => {
    navigation.navigate("ConnectParentStack");
  };

  return (
    <>
      <View style={styles.topBar}>
        <Text
          fontSize={isHebrew ? textStyles.H4 : textStyles.H6}
          fontFamily={fonts.MEDIUM}
          color={colors.dark}
        >
          {t("homePageView:myChildren")}
        </Text>
        {myChildrenList.data?.length ? (
          <TouchableOpacity onPress={addChild}>
            <Text
              fontSize={isHebrew ? textStyles.H6 : textStyles.H7}
              fontFamily={fonts.MEDIUM}
              color={colors.purpleLinear}
            >
              {t("homePageView:addChild")}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {myChildrenList.isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.purpleLinear} />
        </View>
      ) : myChildrenList.data?.length ? (
        myChildrenList.data?.map((item, index) => (
          <MyChildrenItem
            name={item.name}
            image={item.image}
            payable={item.payable}
            id={item.id}
            key={item.id}
            second={index === 1}
            balance={item.balance}
            allowedExpences={item.total_allowed_expenses}
          />
        ))
      ) : (
        <MyChildrenEmpty />
      )}
    </>
  );
};

const MyChildrenEmpty = () => {
  const { t } = useTranslation();
  const isHebrew = useHebrew();
  const navigation = useNavigation();

  const addChild = () => {
    navigation.navigate("ConnectParentStack");
  };

  return (
    <View style={styles.myChildrenEmptyContainer}>
      <View style={styles.myChildrenEmptyIcon}>
        <NoChildrenIcon />
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
        {t("homePageView:childrenNotAdded")}
      </Text>
      <Text
        fontSize={isHebrew ? textStyles.H6 : textStyles.H7}
        fontFamily={fonts.MEDIUM}
        color={colors.grey}
        textAlign="center"
        style={{ width: 330, marginTop: verticalScale(8) }}
      >
        {t("homePageView:childrenNotAddedSubTitle")}
      </Text>

      <View
        style={{
          paddingHorizontal: horizontalScale(4),
          width: "100%",
          marginBottom: verticalScale(20),
        }}
      >
        <TouchableOpacity style={styles.emptyCardButton} onPress={addChild}>
          <Text
            fontSize={isHebrew ? textStyles.H5 : textStyles.H6}
            fontFamily={fonts.MEDIUM}
            color={colors.purpleLinear}
          >
            {t("homePageView:childrenNotAddedButton")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyChildren;
