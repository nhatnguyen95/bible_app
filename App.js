import React from "react";
import type { Node } from "react";
import { SafeAreaView, Text, useColorScheme } from "react-native";

import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import Colors from "./src/constants/Colors";
import Loading from "./src/components/Loading";

const App: () => Node = () => {
  const colorScheme = useColorScheme();

  const backgroundStyle = {
    backgroundColor: Colors[colorScheme].background,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={[{ flex: 1 }, backgroundStyle]}>
        <Navigation colorScheme={colorScheme} />
      </SafeAreaView>
      <Loading />
    </Provider>
  );
};

export default App;
