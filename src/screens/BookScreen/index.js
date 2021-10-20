import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getBooksAction,
  getVersesAction,
} from "../../redux/actions/bookAction";
import ChapterPicker from "./components/ChapterPicker";
import chapters from "../../json/chapters.json";
import styles from "./styles";
import Colors from "../../constants/Colors";
import Loading from "../../components/Loading";

const BookScreen = () => {
  useEffect(() => {
    _getBooks();
  }, [_getBooks]);

  const dispatch = useDispatch();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentBook, setCurrentBook] = useState("");
  const verses = useSelector((state) => state.bookReducer.verses);

  const colorScheme = useColorScheme();

  const textStyle = {
    color: Colors[colorScheme].background,
  };

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
    setCurrentBook(bookInfo.book);
    setCurrentChapter(chapterIndex);
    const chapterInfo = bookInfo.chapters[chapterIndex - 1];
    dispatch(getVersesAction(bookInfo.book, chapterIndex, chapterInfo.verses));
    setModalVisible(false);
  };

  const _onPressVerse = (verse) => {
    console.log("_onPressVerse", verse);
  };

  const _renderVerses = () => {
    if (!verses.length) return null;
    return (
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.bookTitle}>{verses[0].book_name}</Text>
        {verses.map((item, index) => (
          <Text style={styles.verseText} onPress={() => _onPressVerse(item)}>
            <Text>{item.verse}. </Text>
            <Text>{item.text}</Text>
          </Text>
        ))}
      </ScrollView>
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
