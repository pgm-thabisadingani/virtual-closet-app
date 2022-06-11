import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Colors, FontSizes } from "../config";
import { callGoogleVisionAsync } from "../config/googleVisionHelperFunction";
import { AppCloseWindow, Icon } from "../components";

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
      setImage(data.uri);

      //convert image to base64 in expo to be read by the google cloud vision Api
      const base64 = await FileSystem.readAsStringAsync(data.uri, {
        encoding: "base64",
      });

      if (data) {
        setStatus("Loading...");
        try {
          const result = await callGoogleVisionAsync(base64);
          setStatus(result);
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

    if (!result.cancelled) {
      setImage(result.uri);
      setStatus("Loading...");
      try {
        const resultImage = await callGoogleVisionAsync(result.base64);
        setStatus(resultImage);
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
        <View style={styles.imageArea}>
          <View style={styles.imageContainer}>
            {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
          </View>
          <View isSafe style={styles.textContainer}>
            {status && <Text style={styles.mainTitle}>{status}</Text>}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
    width: 660,
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  imageArea: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 150,
    backgroundColor: Colors.darkBlack,

    alignItems: "center",
  },
  imageContainer: {
    height: 620,
  },
  textContainer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: Colors.dark,
    height: 200,
  },
  mainTitle: {
    color: Colors.white,
    fontSize: FontSizes.mainTitle,
  },
});
