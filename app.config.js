import "dotenv/config";
import { Colors } from "./app/config";

export default {
  expo: {
    name: "Virtual closet App",
    slug: "Virtual-closet",
    privacy: "public",
    platforms: ["ios", "android"],
    version: "0.15.0",
    orientation: "portrait",
    icon: "./app/assets/Logo.png",
    splash: {
      image: "./app/assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#333333",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
  },
};
