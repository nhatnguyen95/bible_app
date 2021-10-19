import React from "react";
import type { Node } from "react";
import { SafeAreaView, Text, useColorScheme } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";

const App: () => Node = () => {
  const colorScheme = useColorScheme();

  const backgroundStyle = {
    backgroundColor: colorScheme === "dark" ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={[{ flex: 1 }, backgroundStyle]}>
        <Navigation colorScheme={colorScheme} />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
