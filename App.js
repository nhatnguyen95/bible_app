import React from "react";
import type { Node } from "react";
import { SafeAreaView, Text, useColorScheme } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import Navigation from "./src/navigation";

const App: () => Node = () => {
  const colorScheme = useColorScheme();

  const backgroundStyle = {
    backgroundColor: colorScheme === "dark" ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[{ flex: 1 }, backgroundStyle]}>
      <Navigation colorScheme={colorScheme} />
    </SafeAreaView>
  );
};

export default App;
