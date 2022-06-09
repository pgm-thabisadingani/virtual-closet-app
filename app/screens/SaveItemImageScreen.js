import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Camera, CameraType } from "expo-camera";

import * as ImagePicker from "expo-image-picker";
import { Colors, FontSizes } from "../config";
import { AppButton, AppCloseWindow, Icon } from "../components";
import { AddClothingItem } from "../components/closet";
import { ImageStorage } from "../hooks";
import { ProfileScreen } from "./ProfileScreen";
import { EditProfileScreen } from "./EditProfileScreen";

export const SaveItemImageScreen = ({ navigation, route }) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);

  // Closet and User id
  const closetOwerUid = route.params.closetOwerId;
  const closetUid = route.params.closetId;
  const goingTo = route.params.goingTo;

  console.log(goingTo);

  // grant permissions
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  // take a pic
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      console.log(data);

      // setImage(data.uri);
      if (data) {
        // set a loading status here
        try {
          console.log(data.uri);
          let uri = data.uri;
          const result = await ImageStorage({
            uri: data.uri,
            path: goingTo,
          });
          console.log(result);
          setImage(result);
          console.log("WE ARE GOOD TO GO");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  // Pick a pic
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    console.log(result);
    if (!result.cancelled) {
      try {
        const resultImage = await ImageStorage({
          uri: result.uri,
          path: goingTo,
        });
        setImage(resultImage);
      } catch (error) {
        console.log("Error reading an image", error);
      }
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  console.log(image);
  return (
    <View style={{ flex: 1 }}>
      <AppCloseWindow onPress={() => navigation.popToTop()} paddingSize={10} />
      {!image ? (
        <>
          <View style={styles.cameraContainer}>
            <Camera
              ref={(ref) => setCamera(ref)}
              style={styles.fixedRatio}
              type={type}
              ratio={"1:1"}
            />
          </View>

          <AppButton
            title="Flip Image"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          ></AppButton>
          <AppButton title="Take Picture" onPress={() => takePicture()} />
          <AppButton
            title="Pick Image From Gallery"
            onPress={() => pickImage()}
          />
        </>
      ) : (
        <KeyboardAwareScrollView enableOnAndroid={true}>
          {goingTo == "clothing" ? (
            <>
              <View style={styles.containerPreview}>
                {image && (
                  <Image source={{ uri: image }} style={styles.image} />
                )}
              </View>
              <AddClothingItem closetUid={closetUid} imageUri={image} />
            </>
          ) : (
            <EditProfileScreen photoURL={image} />
          )}
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 1,
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  containerPreview: {
    height: 400,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
