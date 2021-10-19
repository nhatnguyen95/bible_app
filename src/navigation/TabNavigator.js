import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import BookScreen from "../screens/BookScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import Colors from "../constants/Colors";

const BottomTab = createBottomTabNavigator();

const TabBarIcon = (props) => {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
};

const TabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="BookScreen"
      screenOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="BookScreen"
        component={BookScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="book-outline" color={color} />
          ),
          title: "Books"
        }}
      />
      <BottomTab.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bookmark-outline" color={color} />
          ),
          title: "Favorites"
        }}
      />
    </BottomTab.Navigator>
  );
};

export default TabNavigator;
