import React from "react";
import type { Node } from "react";
import { SafeAreaView, Text, useColorScheme } from "react-native";
import { PersistGate } from "redux-persist/integration/react";

import Navigation from "./src/navigation";
import { Provider } from "react-redux";

import Colors from "./src/constants/Colors";
import Loading from "./src/components/Loading";
import store from "./src/redux/store";

const App: () => Node = () => {
  const colorScheme = useColorScheme();

  const backgroundStyle = {
    backgroundColor: Colors[colorScheme].background,
  };

  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <SafeAreaView style={[{ flex: 1 }, backgroundStyle]}>
          <Navigation colorScheme={colorScheme} />
        </SafeAreaView>
        <Loading />
      </PersistGate>
    </Provider>
  );
};

export default App;
