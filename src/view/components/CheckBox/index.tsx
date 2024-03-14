import React, { memo, useState } from "react";
import { TouchableOpacity } from "react-native";
import CheckedIcon from "~/view/assets/icons/checked.svg";

import { styles } from "./styles";

interface Props {
  onChange?: () => void;
  style?: any;
  checked: boolean;
}

// Custom Date Input component with custom styles

const CheckBox: React.FC<Props> = ({ onChange, style, checked }) => {
  // const [checked, setChecked] = useState<boolean>(false);
  return (
    <TouchableOpacity
      style={[styles.container, checked && styles.active, style]}
      onPress={() => {
        // setChecked(!checked);
        onChange && onChange();
      }}
    >
      {checked && <CheckedIcon />}
    </TouchableOpacity>
  );
};

export default memo(CheckBox);
