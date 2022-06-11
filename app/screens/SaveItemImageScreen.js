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

      // setImage(data.uri);
      if (data) {
        // set a loading status here
        try {
          let uri = data.uri;
          const result = await ImageStorage({
            uri: data.uri,
            path: goingTo,
          });
          setImage(result);
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
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: Colors.black, marginTop: 50 }}>
        <AppCloseWindow
          onPress={() => navigation.popToTop()}
          paddingSize={10}
        />
      </View>
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
          <View isSafe style={styles.buttonContainer}>
            <Icon
              name="camera-image"
              size={50}
              color={Colors.white}
              style={styles.flip}
              onPress={() => pickImage()}
            />
            <Icon
              name="checkbox-blank-circle"
              size={80}
              color={Colors.white}
              style={styles.flip}
              onPress={() => takePicture()}
            />
            <Icon
              name="camera-flip-outline"
              size={50}
              color={Colors.white}
              style={styles.flip}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            />
          </View>
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
    width: 580,
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  containerPreview: {
    height: 500,
    backgroundColor: Colors.dark,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 150,
    backgroundColor: Colors.darkBlack,

    alignItems: "center",
  },
});
