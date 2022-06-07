import { deleteDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import {
  AppButton,
  AppCloseWindow,
  Avatar,
  Error,
  Icon,
  LoadingIndicator,
  View,
} from "../components";
import { ChallengeDetails } from "../components/challenges";
import { auth, Colors, db, FontSizes } from "../config";
import { useNavigation } from "@react-navigation/native";

export const ChallengeDetailsScreen = ({ route }) => {
  const [challenge, setChallenge] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation();
  const challengeUid = route.params;
  const userUid = auth.currentUser.uid;

  // const date = challenge.eventDate.seconds;

  /*getting challenges by doc id */
  const getChallengeAsync = async () => {
    setIsLoading(true);
    const q = await getDoc(doc(db, "challenges", challengeUid));
    if (q.exists()) {
      setChallenge(q.data());
      setIsLoading(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setIsError(true);
    }
  };

  useEffect(() => {
    const unsubscribe = getChallengeAsync();
    return () => unsubscribe;
  }, []);

  console.log(challenge);

  //remove from the list
  const asyncDeleteItem = async () => {
    console.log(challengeUid);
    setIsLoading(true);
    try {
      const request = await deleteDoc(doc(db, "challenges", challengeUid));
      console.log(request);
      navigation.popToTop();
      setIsLoading(false);
    } catch (error) {
      setIsError(error.message);
    }
  };

  return isError ? (
    <Error>{isError}</Error>
  ) : isLoading || !challenge ? (
    <LoadingIndicator />
  ) : (
    <View isSafe style={styles.container}>
      <View style={styles.header}>
        <View>
          <AppCloseWindow
            onPress={() => navigation.popToTop()}
            paddingSize={10}
          />
        </View>
        {/* <Text style={styles.titleText}> {challenge.eventTitle}</Text> */}
        {challenge.creatorUid === userUid ? (
          <View style={styles.deleteOptions}>
            {/* <Icon
              name="pencil-circle"
              size={30}
              color={Colors.lightPurple}
              onPress={() => console.log("I am update")}
              style={{ marginRight: 10 }}
            /> */}
            <Icon
              name="trash-can-outline"
              size={30}
              color={Colors.lightGray}
              onPress={asyncDeleteItem}
            />
          </View>
        ) : (
          <View></View>
        )}
      </View>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.titleText}>{challenge.eventTitle}</Text>
            <Text style={styles.smallText}>{challenge.eventLocation}</Text>
          </View>
          <Avatar size={80} source={challenge.creatorAvator} />
        </View>

        <ChallengeDetails
          city={challenge.eventLocation}
          date={challenge.eventDate}
        />
        <View style={styles.discriptionWrapper}>
          <Text style={styles.description}>{challenge.discription}</Text>
        </View>
      </View>
      {/* <Text>{challengeUid}</Text> */}
      {userUid !== challenge.creatorUid ? (
        <View style={styles.buttonWrapper}>
          <AppButton
            size={20}
            buttonWidth={200}
            textColor={Colors.white}
            title="Accept"
            onPress={() =>
              navigation.navigate("CreateResponse", {
                creatorUid: challenge.creatorUid,
                closetUid: challenge.closetUid,
                eventTitle: challenge.eventTitle,
                challengeUid: challengeUid,
              })
            }
            color={Colors.purple}
          />
        </View>
      ) : (
        <View style={styles.buttonWrapper}>
          <AppButton
            size={20}
            buttonWidth={250}
            textColor={Colors.white}
            title="View Responses"
            onPress={() => navigation.navigate("Response", challengeUid)}
            color={Colors.purple}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    marginBottom: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: FontSizes.title,
    color: Colors.dark,
    fontWeight: "bold",
  },
  deleteOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallText: {
    fontSize: FontSizes.subTitle,
    fontWeight: "400",
    color: Colors.dark,
  },
  discriptionWrapper: {
    backgroundColor: Colors.light,
    padding: 20,
    height: 160,
    marginTop: 50,
  },
  description: {
    fontSize: FontSizes.body,

    marginBottom: 30,
    color: Colors.gray,
  },
  buttonWrapper: {
    alignItems: "center",
    marginTop: 50,
  },
  card: {
    // borderRadius: 15,
    // height: 400,
    // backgroundColor: Colors.white,
    // shadowColor: Colors.dark,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 4.65,
    // elevation: 4,
    // padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
