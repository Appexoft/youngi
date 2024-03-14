import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { useHebrew } from "~/i18n";
import Text from "~/view/components/Text";
import { styles } from "./styles";

import ArrowDown from "~/view/assets/icons/arrow_down.svg";
import StoreRow from "./StoreRow";
import SecondHeader from "~/view/components/SecondHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "~/models/navigation";
import { useAppSelector } from "~/store/hooks";
import { useQuery } from "react-query";
import { QueryKey } from "~/constants/query";
import { Parent } from "~/services/Parent";
import SelectChildModal from "./SelectChildModal";
import { ChildrenInteface, ShopInterface } from "~/models/home";

type Props = NativeStackScreenProps<RootStackParamList, "ChildPermissions">;

const height = Dimensions.get("window").height;

const ChildPermissions: React.FC<Props> = ({ route }) => {
  const { childId, childName } = route.params;
  const [selectedChild, setSelectedChild] = useState<ChildrenInteface | null>(
    null
  );
  const [childMallsList, setChildMallsList] = useState<ShopInterface[] | []>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>();
  const [openSelectChildModal, setOpenSelectChildModal] =
    useState<boolean>(false);
  const activeMallId = useAppSelector((state) => state.home.activeMall.id);

  const { t } = useTranslation();
  const isHebrew = useHebrew();

  useEffect(() => {
    if (childId) {
      loadChildMalls(childId);
    }
  }, [childId]);

  const loadChildMalls = async (id: number | null) => {
    setIsLoading(true);
    const childMalls = await Parent.getChildMallsList(id, activeMallId);
    setChildMallsList(childMalls);
    setIsLoading(false);
  };

  useEffect(() => {
    if (selectedChild?.id) {
      loadChildMalls(selectedChild?.id);
    }
  }, [selectedChild?.id]);

  const selectChild = useCallback(
    (child: ChildrenInteface) => {
      setSelectedChild(child);

      setOpenSelectChildModal(false);
    },
    [selectedChild]
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.containerScrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <SafeAreaView />
        <SecondHeader />

        <View
          style={[
            styles.containerWrapper,
            {
              height,
            },
          ]}
        >
          <View style={styles.topBar}>
            <Text
              fontSize={isHebrew ? textStyles.H4 : textStyles.H6}
              fontFamily={fonts.MEDIUM}
              color={colors.dark}
              style={styles.titleText}
            >
              {t("homePage:permissionManagment")}
            </Text>
            <TouchableOpacity
              style={styles.selectChildButton}
              onPress={() => setOpenSelectChildModal(true)}
            >
              <ArrowDown style={styles.selectChildArrow} />
              <Text
                fontSize={isHebrew ? textStyles.H5 : textStyles.H7}
                fontFamily={fonts.MEDIUM}
                color={colors.purpleLinear}
                style={styles.titleText}
              >
                {selectedChild?.name ?? childName}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.topRow}>
              <Text
                fontSize={isHebrew ? textStyles.H5 : textStyles.H7}
                fontFamily={fonts.MEDIUM}
                color={colors.dark}
                style={styles.titleText}
              >
                {t("homePage:permission")}
              </Text>
              <Text
                fontSize={isHebrew ? textStyles.H5 : textStyles.H7}
                fontFamily={fonts.MEDIUM}
                color={colors.dark}
                style={styles.titleText}
              >
                {t("homePage:listOfStores")}
              </Text>
            </View>

            <View style={styles.businesses}>
              {isLoading ? (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color={colors.purpleLinear} />
                </View>
              ) : (
                childMallsList.map((item) => (
                  <StoreRow
                    storeInfo={item}
                    childId={selectedChild?.id ?? null}
                    key={item.id}
                  />
                ))
              )}
            </View>
          </View>
        </View>

        {openSelectChildModal && (
          <SelectChildModal
            showModal={openSelectChildModal}
            close={() => setOpenSelectChildModal(false)}
            selectChild={selectChild}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default ChildPermissions;
