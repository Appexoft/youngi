import React from "react";
import { useState, useEffect } from "react";
import { Text } from "react-native";
import { styles } from "./styles";

interface Props {
  initialMinute: number;
  initialSeconds: number;
  customStyles?: any;
  onTimerEnd?: () => void;
}

const Timer: React.FC<Props> = ({
  initialMinute,
  initialSeconds,
  customStyles,
  onTimerEnd,
}) => {
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    if (minutes === 0 && seconds === 0 && onTimerEnd) {
      onTimerEnd();
    }
  }),
    [minutes, seconds];

  return (
    <>
      {minutes === 0 && seconds === 0 ? null : (
        <Text style={[styles.text, customStyles]}>
          {`0${minutes}`}:{seconds < 10 ? `0${seconds}` : seconds}
        </Text>
      )}
    </>
  );
};

export default Timer;
