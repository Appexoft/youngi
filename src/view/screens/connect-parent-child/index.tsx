import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import Introdaction from "./components/Introdaction";
import Invite from "./components/Invite";

interface Props {
  goBack?: () => void;
}

const ConnectParentOrChild: React.FC<Props> = ({ goBack }) => {
  const navigation = useNavigation();
  const [isInviteScreenOpen, setIsInviteScreenOpen] = useState(false);

  const goBakcF = () => {
    if (goBack) {
      goBack();
    } else {
      navigation.navigate("HomeScreen");
    }
  };

  return <>{isInviteScreenOpen ? <Invite onPress={() => setIsInviteScreenOpen(true)} goBack={() => setIsInviteScreenOpen(false)} /> : <Introdaction />}</>;
};

export default ConnectParentOrChild;
