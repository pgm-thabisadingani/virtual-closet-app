import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera, CameraType } from "expo-camera";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Colors, FontSizes } from "../config";
import { callGoogleVisionAsync } from "../config/googleVisionHelperFunction";
import { AppButton } from "./AppButton";

export const AddImageManualy = () => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);

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
      setImage(data.uri);
    }
  };

  // Pick a pic
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.cancelled) setImage(result.uri);
    } catch (error) {
      console.log("Error reading an image", error);
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
        <View>
          <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container}>
              {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
          </TouchableWithoutFeedback>
          <AppButton title="Take Picture" onPress={() => takePicture()} />
        </View>
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
  container: {
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 100,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
