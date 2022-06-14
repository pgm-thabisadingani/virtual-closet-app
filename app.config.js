import "dotenv/config";
import { Colors } from "./app/config";

export default {
  expo: {
    name: "Virtual closet App",
    slug: "Virtual-closet",
    privacy: "public",
    platforms: ["ios", "android"],
    version: "1.0.0",
    orientation: "portrait",
    icon: "./app/assets/Logo.png",
    userInterfaceStyle: "automatic",
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
    android: {
      adaptiveIcon: {
        foregroundImage: "./app/assets/icon.png",
        backgroundColor: "#333333",
      },
    },

    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      apiKeyGoogleVision: process.env.API_KEY_GOOGLE_VISION,
      apiKeyOpenWeather: process.env.API_KEY_OPEN_WEATHER,
    },
  },
};
