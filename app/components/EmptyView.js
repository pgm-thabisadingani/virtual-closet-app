import React from "react";
import { StyleSheet, Text } from "react-native";
import { FontSizes } from "../config";
import { AppCloseWindow } from "./AppCloseWindow";
import { View } from "./View";

export const EmptyView = ({ title, back }) => {
  return (
    <>
      {back ? (
        <View isSafe style={styles.containerBack}>
          <AppCloseWindow onPress={() => navigation.goBack()} paddingSize={0} />
          <Text style={styles.emptyTextBack}>
            It looks like your {title} is empty.
          </Text>
        </View>
      ) : (
        <View isSafe style={styles.container}>
          <Text style={styles.emptyText}>
            It looks like your {title} is empty.
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerBack: { flex: 1 },
  emptyTextBack: {
    marginTop: 200,
    alignSelf: "center",
    fontSize: FontSizes.subTitle,
  },
  emptyText: {
    alignSelf: "center",
    fontSize: FontSizes.subTitle,
  },
});
