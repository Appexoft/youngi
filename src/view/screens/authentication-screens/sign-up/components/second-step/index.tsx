import React, { useState } from "react";
import { Dimensions, Keyboard, View } from "react-native";
import EnterCode from "./EnterCode";
import EnterPhone from "./EnterPhone";
import { styles } from "./styles";

interface Props {
  goNext: () => void;
}

const height = Dimensions.get("window").height;

const SecondStep: React.FC<Props> = ({ goNext }) => {
  const [isEnterCode, setIsEnterCode] = useState<boolean>(false);

  const goEnterCode = () => {
    setIsEnterCode(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{isEnterCode ? <EnterCode goNext={goNext} /> : <EnterPhone goEnterCode={() => goEnterCode()} />}</View>
    </View>
  );
};

export default SecondStep;
