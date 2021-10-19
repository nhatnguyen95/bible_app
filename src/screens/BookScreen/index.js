import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { increaseActionAsync } from "../../redux/actions/bookAction";
import styles from "./styles";

const BookScreen = () => {
  const count = useSelector((state) => state.bookReducer.count);
  const dispatch = useDispatch();

  const _increase = () => {
    dispatch(increaseActionAsync());
  };

  return (
    <View style={styles.container}>
      <Text>BookScreen {count}</Text>
      <TouchableOpacity onPress={_increase}>
        <Text>Button</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookScreen;
