import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Colors, FontSizes } from "../config";
import { callGoogleVisionAsync } from "../config/googleVisionHelperFunction";
import { Icon } from "../components";

export const SaveImageGoogleVisionScreen = ({ navigation }) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [status, setStatus] = useState(null);

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

  // take a pic please work
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      console.log(data);
      setImage(data.uri);

      //convert image to base64 in expo to be read by the google cloud vision Api
      const base64 = await FileSystem.readAsStringAsync(data.uri, {
        encoding: "base64",
      });

      if (data) {
        setStatus("Loading...");
        try {
          const result = await callGoogleVisionAsync(base64);
          console.log(result);
          setStatus(result);
          console.log("WE ARE GOOD TO GO");
        } catch (error) {
          setStatus(`Error: ${error.message}`);
        }
      } else {
        setImage(null);
        setStatus(null);
      }
    }
  };

  // Pick a pic
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log("I AM HERE NOW");
      setStatus("Loading...");
      try {
        const resultImage = await callGoogleVisionAsync(result.base64);
        console.log("LOOK WHO'S BACK FROM GOOGLE VISION");
        setStatus(resultImage);
        console.log("YES, WE ARE GOOD TO GO");
      } catch (e) {
        console.log(e);
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
      <View style={{ alignItems: "flex-end" }}>
        <Icon
          name="window-close"
          size={30}
          color={Colors.mediumGray}
          onPress={() => navigation.popToTop()}
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
          <Button
            title="Flip Image"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          ></Button>
          <Button title="Take Picture" onPress={() => takePicture()} />
          <Button title="Pick Image From Gallery" onPress={() => pickImage()} />
        </>
      ) : (
        <View style={styles.imageArea}>
          {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
          {status && (
            <Text style={{ fontSize: FontSizes.mainTitle }}>{status} </Text>
          )}
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
  imageArea: {
    flex: 1,
  },
});
