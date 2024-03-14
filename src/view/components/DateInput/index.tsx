import React, { memo, useState } from "react";

import { TouchableOpacity, View } from "react-native";

import { colors, fonts, textStyles } from "~/constants/designConstants";
import Text from "../Text";
import { styles } from "./styles";
import DatePicker from "react-native-date-picker";

import CalendarIcon from "~/view/assets/icons/calendar.svg";
import { useIOS } from "~/helpers/useIOS";

interface Props {
  label: string;
  style?: any;
  isRight?: boolean;
}

// Custom Date Input component with custom styles

const DateInput = ({ label, style, isRight }: Props) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const isIOS = useIOS();

  const formatDate = (date: number): string => {
    if (date < 10) {
      return String(date).padStart(2, "0");
    } else {
      return String(date);
    }
  };

  const onChange = (selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setOpen(false);
    setDate(currentDate);

    const dateToText = new Date(currentDate);
    const fDate =
      formatDate(dateToText.getDate()) +
      "/" +
      formatDate(dateToText.getMonth() + 1) +
      "/" +
      dateToText.getFullYear();
    setText(fDate);
  };

  return (
    <View style={[styles.container]}>
      <Text
        fontSize={textStyles.H5}
        fontFamily={fonts.MEDIUM}
        color={colors.dark}
      >
        {label}
      </Text>
      <View
        style={[
          styles.inputContainer,
          style,
          isIOS && styles.inputContainerRight,
        ]}
      >
        {text.length > 0 ? (
          <Text
            fontSize={textStyles.H5}
            fontFamily={fonts.LIGHT}
            color={colors.dark}
          >
            {text}
          </Text>
        ) : (
          <Text
            fontSize={textStyles.H5}
            fontFamily={fonts.LIGHT}
            color={colors.placeholderColor}
          >
            DD / MM / YYYY
          </Text>
        )}
        <TouchableOpacity
          style={isIOS ? styles.buttonHebrew : styles.button}
          onPress={() => setOpen(true)}
        >
          <CalendarIcon />
        </TouchableOpacity>
      </View>
      {open && (
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false);
            onChange(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          mode="date"
        />
      )}
    </View>
  );
};

export default memo(DateInput);
