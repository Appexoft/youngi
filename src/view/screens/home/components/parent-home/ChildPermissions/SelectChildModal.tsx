import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { useQuery } from "react-query";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { verticalScale } from "~/constants/metrics";
import { QueryKey } from "~/constants/query";
import { useHebrew } from "~/i18n";
import { ChildrenInteface } from "~/models/home";
import { ChildInterface } from "~/modules/home/types";
import { Parent } from "~/services/Parent";
import Modal from "~/view/components/modal";
import Text from "~/view/components/Text";
import { styles } from "./styles";

interface Props {
  showModal: boolean;
  close: () => void;
  selectChild: (child: ChildrenInteface) => void;
}

const SelectChildModal: React.FC<Props> = ({ showModal, close, selectChild }) => {
  const myChildrenList = useQuery([QueryKey.PARENT_MY_CHILDREN], () => {
    return Parent.getChildrenList();
  });

  return (
    <Modal showModal={showModal} animationType="fade">
      <TouchableOpacity style={styles.selectChildModalContainer} onPress={close}>
        <View
          style={styles.selectChildModal}
          onStartShouldSetResponder={(event) => true}
          onTouchEnd={(e) => {
            e.stopPropagation();
          }}
        >
          <Text fontSize={textStyles.H3} fontFamily={fonts.MEDIUM} color={colors.dark} style={{ marginBottom: verticalScale(20) }}>
            בחר ילד
          </Text>
          {myChildrenList.data?.map((item, index) => {
            return (
              <TouchableOpacity style={styles.selectChildModalItem} key={index} onPress={() => selectChild(item)}>
                <Text fontSize={textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.purpleLinear}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default SelectChildModal;
