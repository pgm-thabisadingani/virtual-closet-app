import React from "react";
import { View, StyleSheet, Pressable, ImageBackground } from "react-native";
import { Card, Checkbox, Title, Paragraph, Avatar } from "react-native-paper";

function ImageInputList(props) {
  return (
    <View>
      <Pressable onPress={props.onPress}>
        <Card>
          <Card.Content style={styles.content}>
            <Checkbox status={props.status} />
            <View>
              <Title>{props.name}</Title>
            </View>
            <ImageBackground
              source={{ uri: props.value }}
              resizeMode="cover"
              style={{
                height: 150,
                width: 150,
                borderRadius: 15,
                overflow: "hidden",
              }}
            ></ImageBackground>
          </Card.Content>
        </Card>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
