/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import "react-native-gesture-handler";
import React from "react";
import { App as MyApp } from "./view/components/App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";
import { I18nManager } from "react-native";

import { persistor, store } from "~/store";
import { QueryClient, QueryClientProvider } from "react-query";

I18nManager.forceRTL(false);
const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <MyApp />
          </SafeAreaProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
