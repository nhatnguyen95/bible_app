import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getBooksAction,
  getVersesAction,
} from "../../redux/actions/bookAction";
import {
  setCurrentReading,
  addToFavorite,
  removeFromFavorite,
  setLoading,
} from "../../redux/actions/sharedAction";
import ChapterPicker from "./components/ChapterPicker";
import chapters from "../../json/chapters.json";
import styles from "./styles";
import Colors from "../../constants/Colors";
import { useIsFocused, useRoute } from "@react-navigation/core";

const BookScreen = () => {
  useEffect(() => {
    _getBooks();
  }, [_getBooks]);

  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const route = useRoute();
  const favoriteParam = route.params?.favoriteParam;
  const flatListRef = useRef(null);
  const isScrolled = useRef(false);
  const verses = useSelector((state) => state.bookReducer.verses);
  const favoriteVerses = useSelector(
    (state) => state.sharedReducer.favoriteVerses
  );

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    if (!isFocus) {
      isScrolled.current = false;
    }
  }, [isFocus]);

  useEffect(() => {
    if (favoriteParam) {
      _onPressChapter(favoriteParam.book, favoriteParam.chapter);
    }
  }, [favoriteParam]);

  useEffect(() => {
    if (flatListRef.current && favoriteParam && !isScrolled.current) {
      const index = verses.findIndex(
        (i) =>
          i.book_name === favoriteParam.book &&
          i.chapter === favoriteParam.chapter &&
          i.verse === favoriteParam.verse
      );
      if (index > -1) {
        flatListRef.current.scrollToIndex({ index });
      }

      isScrolled.current = true;
    }
  }, [verses]);

  const currentChapter = useSelector(
    (state) => state.sharedReducer.currentChapter
  );
  const colorScheme = useColorScheme();

  const _getBooks = () => {
    dispatch(getBooksAction());
  };

  const [modalVisible, setModalVisible] = useState(false);

  const _onPressSelectChapter = () => {
    setModalVisible(true);
  };

  const _onBackdropPress = () => {
    setModalVisible(false);
  };

  const _onPressChapter = (book, chapterIndex) => {
    const bookInfo = chapters.find(
      (i) => i.book.toLowerCase() === book.toLowerCase()
    );
    dispatch(setCurrentReading(bookInfo.book, chapterIndex));
    const chapterInfo = bookInfo.chapters[chapterIndex - 1];
    dispatch(getVersesAction(bookInfo.book, chapterIndex, chapterInfo.verses));
    setModalVisible(false);
  };

  const _onPressVerse = (verse, isFavorite) => {
    if (!isFavorite) {
      dispatch(
        addToFavorite(verse.book_name, verse.chapter, verse.verse, verse.text)
      );
    } else {
      dispatch(removeFromFavorite(verse.book_name, verse.chapter, verse.verse));
    }
  };

  const _renderVerseItem = ({ item: verseItem }) => {
    const isFavorited = favoriteVerses.find(
      (i) =>
        i.verse === verseItem.verse &&
        i.book === verseItem.book_name &&
        i.chapter === verseItem.chapter
    );
    return (
      <View
        style={{
          backgroundColor: isFavorited
            ? Colors[colorScheme].favoriteItem
            : "transparent",
        }}
      >
        <Text
          style={styles.verseText}
          onPress={() => _onPressVerse(verseItem, isFavorited)}
        >
          <Text>{verseItem.verse}. </Text>
          <Text>{verseItem.text}</Text>
        </Text>
      </View>
    );
  };

  const _renderVerses = () => {
    if (!verses.length) return null;
    return (
      <FlatList
        scrollToOverflowEnabled
        ref={flatListRef}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <Text style={styles.bookTitle}>{verses[0].book_name}</Text>
        }
        keyExtractor={(item, index) => `verse-${index}`}
        data={verses}
        renderItem={_renderVerseItem}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectAChapter}
        onPress={_onPressSelectChapter}
      >
        <Text style={styles.selectAChapterText}>
          {!currentChapter
            ? "Select a chapter"
            : `Current chapter: ${currentChapter}`}
        </Text>
      </TouchableOpacity>
      {_renderVerses()}
      <ChapterPicker
        isVisible={modalVisible}
        onPressChapter={_onPressChapter}
        onBackdropPress={_onBackdropPress}
      />
    </View>
  );
};

export default BookScreen;
