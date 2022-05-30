import { ref, getDownloadURL } from "firebase/storage";
import { auth, storage } from "./firebase";

const storageRef = ref(storage, `clothing/${auth.currentUser.uid}`);

const img = await fetch(imageUri);
const blob = await img.blob();

console.log("uploading image");
const uploadTask = uploadBytesResumable(storageRef, blob);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(
  "state_changed",
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log("Upload is " + progress + "% done");
    switch (snapshot.state) {
      case "paused":
        console.log("Upload is paused");
        break;
      case "running":
        console.log("Upload is running");
        break;
    }
  },
  (error) => {
    this.setState({ isLoading: false });
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case "storage/unauthorized":
        console.log("User doesn't have permission to access the object");
        break;
      case "storage/canceled":
        console.log("User canceled the upload");
        break;
      case "storage/unknown":
        console.log("Unknown error occurred, inspect error.serverResponse");
        break;
    }
  },
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log("File available at", downloadURL);
      //perform your task
    });
  }
);
