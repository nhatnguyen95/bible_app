import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  UIManager,
  Platform,
  LayoutAnimation,
} from "react-native";
import Colors from "../../../constants/Colors";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const BookItem = ({ item, onPressChapter }) => {
  const [isCollapsed, setCollapsed] = useState(true);
  const colorScheme = useColorScheme();

  const textStyle = {
    color: Colors[colorScheme].text,
  };

  const _onPressTitle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsed((state) => !state);
  };

  const _onPressChapter = (chapter) => {
    onPressChapter(item.title, chapter);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={_onPressTitle}>
        <Text style={[styles.titleText, textStyle]}>{item.title}</Text>
      </TouchableOpacity>
      {!isCollapsed ? (
        <View>
          <View style={styles.listChapterContainer}>
            {item.data?.length
              ? item.data.map((it, idx) => (
                  <TouchableOpacity
                    style={styles.chapterContainer}
                    onPress={() => _onPressChapter(it)}
                  >
                    <Text>Chapter: {it}</Text>
                  </TouchableOpacity>
                ))
              : null}
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  titleText: {
    fontSize: 16,
  },
  listChapterContainer: {
    margin: 8,
  },
  chapterContainer: {
    marginVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#d9d9d9",
  },
});

export default BookItem;
