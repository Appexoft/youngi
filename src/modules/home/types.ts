import { BusinnessInterface, ShopInterface } from "./../../models/home";
import { ImageSourcePropType } from "react-native";

export interface HomeState {
  activeStore: ShopInterface | null;
  activeMall: {
    id: number | null;
    mall: string | null;
    businesses: BusinnessInterface[] | null;
  };
  activeChild: {
    id: number | null;
    image: string | null;
    name: string | null;
  } | null;
  isCardConnected: boolean;
}

export interface StoreInfo {
  [key: string]: string | ImageSourcePropType | null;
}

export interface ChildInterface {
  id: number | null;
  image: string | null;
  name: string | null;
}
