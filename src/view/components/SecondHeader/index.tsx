import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./styles";

import SearchIcon from "~/view/assets/icons/search.svg";
import ArrowDownIcon from "~/view/assets/icons/arrow_down.svg";
import LogoIcon from "~/view/assets/icons/newLogo.svg";
import MenuIcon from "~/view/assets/icons/burger.svg";
import Text from "~/view/components/Text";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import MenuModal from "~/view/screens/home/components/menu-modal";
import { Child } from "~/services/Child";
import { MallInterface } from "~/models/home";
import { useDispatch } from "react-redux";
import { setActiveMall } from "~/modules/home/actions";
import { useAppSelector } from "~/store/hooks";
import { userRoles } from "~/constants/main";
import { Parent } from "~/services/Parent";
import ArrowBackIcon from "~/view/assets/icons/arrow-back.svg";
import { useNavigation } from "@react-navigation/native";
import { useIOS } from "~/helpers/useIOS";

interface Props {}

const SecondHeader: React.FC<Props> = () => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
  const [malls, setMalls] = useState<MallInterface[] | null>(null);

  const activeMall = useAppSelector((state) => state.home.activeMall);
  const userRole = useAppSelector((state) => state.user.user.role);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      await getMalls();
    })();
  }, []);

  const getMalls = async () => {
    let data;
    if (userRole === userRoles.parent) {
      data = await Parent.getMallsList();
    } else if (userRole === userRoles.child) {
      data = await Child.getMallsList();
    }

    if (data) {
      setMalls(data);
      dispatch(setActiveMall(data[0]));
    }
  };

  const handleMenuModal = (value: string) => {
    if (value === "open") {
      setIsMenuModalOpen(true);
    } else {
      setIsMenuModalOpen(false);
    }
  };

  const onButtonPress = () => {
    if (userRole === userRoles.parent) {
      navigation.goBack(-1);
    } else if (userRole === userRoles.child) {
      handleMenuModal("open");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.itemContainer,
          {
            opacity: 0,
          },
        ]}
        disabled
      >
        <SearchIcon />
      </TouchableOpacity>
      <TouchableOpacity style={styles.titleContainer} disabled>
        <Text fontSize={textStyles.H6} fontFamily={fonts.REGULAR} color={colors.purpleLinear} style={styles.titleText}>
          {activeMall?.mall}
        </Text>
        <LogoIcon />
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemContainer} onPress={() => onButtonPress()}>
        {userRole === userRoles.parent ? <ArrowBackIcon /> : <MenuIcon />}
      </TouchableOpacity>
      {isMenuModalOpen && <MenuModal showModal={isMenuModalOpen} close={() => handleMenuModal("close")} />}
    </View>
  );
};

export default SecondHeader;
