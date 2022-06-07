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

import { Colors, FontSizes } from "../config";
import { View } from "./View";
import { PickerItem } from "./PickerItem";
import { Icon } from "./Icon";
import { AppCloseWindow } from "./AppCloseWindow";

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
          <Text style={{ fontSize: FontSizes.body }}>{title}</Text>
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.title}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={30}
            color={Colors.white}
          />
        </View>
      </Pressable>
      <Modal visible={modalVisible} animationType="slide">
        <View>
          <AppCloseWindow
            onPress={() => setModalVisible(false)}
            paddingSize={20}
          />
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
    backgroundColor: Colors.lightGray,
    flexDirection: "row",
    padding: 15,
    marginVertical: 5,
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: Colors.white,
    flex: 1,
    fontSize: 20,
  },
  text: {
    flex: 1,
    color: Colors.white,
    fontSize: 20,
  },
});
