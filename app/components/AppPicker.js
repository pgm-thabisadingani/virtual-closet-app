import React, { useState } from "react";
import {
  FlatList,
  Button,
  Modal,
  StyleSheet,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../config";
import { View } from "./View";
import { PickerItem } from "./PickerItem";

export const AppPicker = ({
  title,
  items,
  onSelectItem,
  numberOfColumns = 1,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "100%",
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          <Text>{title}</Text>
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.title}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={Colors.lightGray}
          />
        </View>
      </Pressable>
      <Modal visible={modalVisible} animationType="slide">
        <View>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()} // returns a number which you have to conver to string
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </View>
      </Modal>
    </>
  );
};

export default AppPicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: Colors.lightPurple,
    flex: 1,
  },
  text: {
    flex: 1,
    color: Colors.lightPurple,
  },
});
