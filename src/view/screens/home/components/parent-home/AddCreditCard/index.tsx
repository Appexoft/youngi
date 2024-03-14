import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { View, SafeAreaView } from "react-native";

import { AddCreaditCatInterface } from "~/models/creditCard";
import { styles } from "./styles";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formErrors } from "~/config/validation";
import { verticalScale } from "~/constants/metrics";
import { useIOS } from "~/helpers/useIOS";
import WebView from "react-native-webview";
import AddCardResult from "./AddCardResult";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "~/models/navigation";
import { colors } from "~/constants/designConstants";

import LogoIcon from "~/view/assets/icons/parent-logo.svg";

type Props = NativeStackScreenProps<RootStackParamList, "AddCreditCard">;

const validation = yup.object({
  firstName: yup.string().required(formErrors.REQUIRED),
  lastName: yup.string().required(formErrors.REQUIRED),
  personID: yup
    .string()
    .max(9, formErrors.PERSON_ID_LENGHT)
    .required(formErrors.REQUIRED),
});

const AddCreditCard: React.FC<Props> = ({ route }) => {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [showWebView, setShowWebView] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { url } = route.params;

  const navigation = useNavigation();
  const isIOS = useIOS();
  let webViewRef = useRef() as any;

  const form = useForm<AddCreaditCatInterface>({
    defaultValues: {
      firstName: "",
      lastName: "",
      personID: "",
      cardNumber: null,
      cvc: null,
      date: null,
    },
    resolver: yupResolver(validation),
  });
  form.watch();

  const closeWebView = () => {
    setShowWebView(false);
    navigation.navigate("HomeScreen");
  };

  return (
    <View
      style={{ width: "100%", height: "100%", backgroundColor: colors.white }}
    >
      <SafeAreaView />
      {showHeader && (
        <View
          style={[
            styles.addCardHeader,
            {
              marginTop: isIOS ? verticalScale(15) : verticalScale(25),
            },
          ]}
        >
          <LogoIcon />
        </View>
      )}

      {showWebView && (
        <WebView
          ref={webViewRef}
          source={{ uri: url }}
          style={{ flex: 1 }}
          javaScriptEnabled={true}
          onNavigationStateChange={(e) => {
            if (e.url.includes("/youngi-payment")) {
              setShowHeader(false);
              setTimeout(() => {
                closeWebView();
              }, 2500);
            }
          }}
        />
      )}

      {isSuccess && (
        <AddCardResult
          showModal={isSuccess}
          close={() => setIsSuccess(false)}
        />
      )}
    </View>
  );
};

export default AddCreditCard;
