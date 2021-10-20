import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const favoriteVerses = useSelector(
    (state) => state.sharedReducer.favoriteVerses
  );

  const _keyExtractor = ({ book, chapter, verse }) => {
    return `${book}-${chapter}-${verse}`;
  };

  const _onPressFavoriteItem = (item) => {
    navigation.navigate("BookScreen", { favoriteParam: item });
  };

  const _renderItem = ({ item }) => {
    return (
      <Text style={styles.verseText} onPress={() => _onPressFavoriteItem(item)}>
        {`${item.book}-${item.chapter}-${item.verse}: `}
        {item.text}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatList}
        data={favoriteVerses}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default FavoriteScreen;
