import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Modal,
  Image,
  Pressable,
  ImageBackground,
  Text,
} from "react-native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import {
  AppCloseWindow,
  Avatar,
  EmptyView,
  Error,
  LoadingIndicator,
  View,
} from "../components";
import { Colors, db, FontSizes } from "../config";

export const ResponseScreen = ({ navigation, route }) => {
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(0);
  const [challenges, setChallenges] = useState([0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const challengeUid = route.params;
  console.log(challengeUid);

  //getting items where challengeUid == challengeUid
  const getResponsesAsync = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "responses"),
        where("challengeUid", "==", challengeUid)
      );
      onSnapshot(q, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setItems(results);
        setIsLoading(false);
      });
    } catch (error) {
      setIsError(error.message);
    }
  };

  // Keep track with changes in data add or delete. Clean up!
  useEffect(() => {
    const unsubscribe = getResponsesAsync();
    return () => unsubscribe;
  }, []);

  console.log(items);

  // const dateConverter = (date) => {
  //   let newDate = date.toLocaleDateString();
  //   let endDate = Date.parse(newDate);
  //   return endDate;
  // };

  return isLoading ? (
    <LoadingIndicator />
  ) : isError || !items.length ? (
    <>
      <Error />
      <EmptyView
        message="There is currently no responses to this challenge."
        back
        marginSize={-20}
      />
    </>
  ) : (
    <View isSafe style={styles.container}>
      <AppCloseWindow onPress={() => navigation.goBack()} paddingSize={0} />
      <View style={styles.header}>
        <Text style={styles.title}>{items && items[0].eventTitle}</Text>
        <Text style={styles.title}>{items && items.length}</Text>
      </View>
      <View style={styles.card}>
        <FlatList
          data={items && items[0].chothingItems}
          keyExtractor={(item) => item.toString()} // returns a number which you have to conver to string
          numColumns={2}
          renderItem={({ item }) => (
            <Pressable onPress={() => setModalVisible(true)}>
              <ImageBackground
                source={{ uri: item }}
                resizeMode="cover"
                style={{
                  height: 150,
                  width: 150,
                  margin: 6,
                  borderRadius: 15,
                  overflow: "hidden",
                }}
              ></ImageBackground>
            </Pressable>
          )}
        />
        <View style={styles.responder}>
          <View style={styles.avatarWrapper}>
            <Avatar source={items && items[0].responderAvatar} size={50} />
            <View style={{ paddingLeft: 10 }}>
              <Text style={styles.responderName}>
                {items && items[0].responderUserName}
              </Text>
              <Text style={styles.respondeceDate}>Date</Text>
              <Text style={styles.discription}>
                {items && items[0].discription}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: FontSizes.subTitle,
    color: Colors.dark,
    fontWeight: "700",
  },
  card: {
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 8,

    overflow: "hidden",
  },
  avatarWrapper: {
    flexDirection: "row",
    padding: 10,
    borderTopColor: Colors.midLight,
    borderTopWidth: 1,
    marginTop: 10,
  },
  responderName: {
    fontSize: FontSizes.body,
    fontWeight: "600",
  },
  respondeceDate: {
    color: Colors.lightGray,
    marginBottom: 8,
    fontSize: FontSizes.smallText,
  },
  discription: {
    color: Colors.gray,
    fontSize: FontSizes.body,
    paddingRight: 42,
  },
  containerEmpty: {
    flex: 1,
  },
  emptyText: {
    flex: 1,
    marginTop: 200,
    alignSelf: "center",
    fontSize: FontSizes.subTitle,
  },
});
