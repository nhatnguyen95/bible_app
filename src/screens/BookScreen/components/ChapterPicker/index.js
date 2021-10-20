import React from "react";
import { View, Text, FlatList, useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import Modal from "react-native-modal";
import BookItem from "../BookItem";
import styles from "./styles";
import Colors from "../../../../constants/Colors";

const ChapterPicker = ({ isVisible, onPressChapter, onBackdropPress }) => {
  const books = useSelector((state) => state.bookReducer.books);
  const _keyExtractor = (item, index) => {
    return `${item.title}-${index}`;
  };

  const _renderItem = ({ item }) => {
    return <BookItem item={item} onPressChapter={onPressChapter} />;
  };

  const colorScheme = useColorScheme();

  const backgroundStyle = {
    backgroundColor: Colors[colorScheme].background,
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View style={[styles.container, backgroundStyle]}>
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={books}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
        />
      </View>
    </Modal>
  );
};

export default ChapterPicker;
