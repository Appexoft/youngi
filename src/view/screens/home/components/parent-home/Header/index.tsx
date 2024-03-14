import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

import GongIcon from "~/view/assets/icons/gong.svg";
import ParentLogo from "~/view/assets/icons/parent-logo.svg";
import MenuIcon from "~/view/assets/icons/burger.svg";
import MenuModal from "../../menu-modal";
import { useIOS } from "~/helpers/useIOS";
import { useQuery } from "react-query";
import { QueryKey } from "~/constants/query";
import { Parent } from "~/services/Parent";
import { userRoles } from "~/constants/main";

interface Props {}

const HomePageHeader: React.FC<Props> = ({}) => {
  const parentInfo = useQuery([QueryKey.PARENT_INFO], () => {
    return Parent.getParentInfo();
  });
  const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
  const isIOS = useIOS();

  const closeModal = () => {
    setIsMenuModalOpen(false);
  };

  return (
    <View style={[isIOS ? styles.container : styles.containerAndroid]}>
      <TouchableOpacity style={styles.button}>
        <GongIcon />
      </TouchableOpacity>

      <ParentLogo />

      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsMenuModalOpen(true)}
      >
        <MenuIcon />
      </TouchableOpacity>

      <MenuModal
        showModal={isMenuModalOpen}
        close={closeModal}
        name={parentInfo.data?.name}
        role={userRoles.parent}
      />
    </View>
  );
};

export default HomePageHeader;
