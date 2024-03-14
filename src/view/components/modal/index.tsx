import React from "react";
import { View, Modal as ModalView } from "react-native";

interface Props {
  children: React.ReactNode;
  showModal: boolean;
  animationType?: "none" | "slide" | "fade" | undefined;
  style?: any;
  transparent?: boolean;
}

const Modal: React.FC<Props> = ({
  children,
  showModal,
  animationType = "slide",
  style,
  transparent,
}) => {
  return (
    <ModalView animationType={animationType} visible={showModal} transparent>
      {children}
    </ModalView>
  );
};

export default Modal;
