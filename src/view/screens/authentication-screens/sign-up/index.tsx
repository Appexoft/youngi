import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ImageBackground, View, SafeAreaView } from "react-native";
import FirstStep from "./components/first-step";
import SignUpHeader from "./components/header";
import SecondStep from "./components/second-step";
import ThirdStep from "./components/third-step";
import { styles } from "./styles";
import { useTranslation } from "~/i18n";
import { useSelector } from "react-redux";
import { selectUserRole } from "~/modules/sign-up/selectors";
import FourthStepChild from "./components/fourth-step-child";

export const SignUp: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [pinIsEntered, setPinIsEntered] = useState<boolean>(false);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const userRole = useSelector(selectUserRole);

  const goNext = useCallback(() => {
    if (activeStep !== 4) {
      setActiveStep(activeStep + 1); // navigate to the next step if current step isn't the last one
    }
  }, [activeStep]);
  const setPinIsEnteredCallback = (value: boolean) => {
    setPinIsEntered(value);
  };

  const goBack = useCallback(() => {
    if (activeStep === 1) {
      navigation.navigate("InitialScreen"); // go to the initial screen
    } else if (activeStep === 4 && pinIsEntered) {
      setPinIsEnteredCallback(false);
    } else if (activeStep === 4 && !pinIsEntered) {
      setActiveStep(activeStep - 1);
    } else {
      setActiveStep(activeStep - 1); // navigate to the previous step if current step isn't the first one
    }
  }, [activeStep]);

  const renderStepBlock = (): React.ReactNode | void => {
    switch (activeStep) {
      case 1:
        return <FirstStep goNext={goNext} />;
      case 2:
        return <SecondStep goNext={goNext} />;
      case 3:
        return <ThirdStep goNext={goNext} />;
      case 4:
        return userRole === "child" ? <FourthStepChild goNext={goNext} pinIsEntered={pinIsEntered} setPinIsEntered={setPinIsEnteredCallback} /> : navigation.navigate("SuccessfulScreen");
      default:
        return null;
    }
  };

  const renderStepTitle = (): string => {
    switch (activeStep) {
      case 1:
        return t("header:firstStep");
      case 2:
        return t("header:secondStep");
      case 3:
        return t("header:thirdStep");
      case 4:
        return userRole === "child" ? t("header:fourthStepForParent") : t("header:fourthStepForChild");
      default:
        return "";
    }
  };

  return (
    <ImageBackground source={require("../../../assets/images/backgrounds/1.1.png")}>
      <View style={styles.container}>
        <SafeAreaView />
        <SignUpHeader activeStep={activeStep} goBack={goBack} title={renderStepTitle()} />
        <>{renderStepBlock()}</>
      </View>
    </ImageBackground>
  );
};
