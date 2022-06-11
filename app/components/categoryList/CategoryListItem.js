import React from "react";
import { StyleSheet, Text, FlatList } from "react-native";
import { Colors } from "../../config";
import { Icon } from "../Icon";
import { PickerItem } from "../PickerItem";
import { View } from "../View";

export const CategoryListItem = ({ items, onPress }) => {
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id} // returns a number which you have to conver to string
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <PickerItem closet title={item} onPress={onPress} />
            </View>
          )}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 50,
  },
  icon: {},
});
