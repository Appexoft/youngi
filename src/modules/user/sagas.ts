import { DevSettings } from "react-native";
import RNRestart from "react-native-restart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SagaIterator } from "redux-saga";
import { put, takeLatest } from "typed-redux-saga";

import { resetStore } from "~/modules/app/actions";

import { signOut } from "./actions";

function* signOutSaga(): SagaIterator {
  resetStore();
  AsyncStorage.removeItem("persist:root");
  RNRestart.restart();
}

export function* watchUser(): SagaIterator {
  yield* takeLatest(signOut, signOutSaga);
}
