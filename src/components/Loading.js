import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const Loading = () => {
  const isLoading = useSelector((state) => state.sharedReducer.isLoading);
  if (!isLoading) return null;
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
});

export default Loading;
