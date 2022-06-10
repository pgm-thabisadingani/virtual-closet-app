import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors, FontSizes } from "../config";
import { AppCloseWindow } from "./AppCloseWindow";
import { View } from "./View";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "./Icon";

export const EmptyView = ({ message, back, marginSize = 0 }) => {
  const navigation = useNavigation();
  return (
    <>
      {back ? (
        <View isSafe style={styles.containerBack}>
          <View style={[styles.emptyWrapper, { marginTop: marginSize }]}>
            <Text style={styles.emptyTextBack}>{message}</Text>
            <Icon
              name="archive-remove-outline"
              size={100}
              color={Colors.lightGray}
            />
          </View>
        </View>
      ) : (
        <View isSafe style={styles.container}>
          <View style={[styles.emptyWrapper, { marginTop: marginSize }]}>
            <Text style={styles.emptyTextBack}>{message}</Text>
            <Icon
              name="archive-remove-outline"
              size={100}
              color={Colors.lightGray}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.white },
  containerBack: { flex: 1, backgroundColor: Colors.white },
  emptyWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  emptyTextBack: {
    alignSelf: "center",
    fontSize: FontSizes.subTitle,
    color: Colors.lightGray,
  },
});
