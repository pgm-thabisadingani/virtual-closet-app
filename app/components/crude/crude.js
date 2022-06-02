import { addDoc } from "firebase/firestore";

// QUERY document by id
useEffect(() => {
  const q = query(collection(db, "users"), where("uid", "==", userUid));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    if (snapshot.docs.length) {
      const closetDoc = snapshot.docs[0].data();
      setData((i) => ({ ...i, closetDoc }));
    }
  });

  return () => unsubscribe();
}, []);

// GETTINGS ALL Ducuments
useEffect(() => {
  const q = query(collection(db, "users"), orderBy("timestamp", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    // we looping and setting the setData array to === the data in the collection and the doc id.
  });
  return () => unsubscribe;
}, []);

//OR refectore

const setClosetAsync = async () => {
  const q = query(collection(db, "closets"));
  onSnapshot(q, (snapshot) => {
    setCloset(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });
};

useEffect(() => {
  const unsubscribe = setClosetAsync();
  return () => unsubscribe;
}, []);

// better version of setCloset

/*getting challenges by doc ID */
const getChallengeAsync = async () => {
  const q = await getDoc(doc(db, "challenges", challengeUid));

  if (q.exists()) {
    console.log("Document data:", q.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

useEffect(() => {
  const unsubscribe = getChallengeAsync();
  return () => unsubscribe;
}, []);

/*getting closet where the the closet*/

const setClotAsync = async () => {
  const q = query(
    collection(db, "closets"),
    where("closetOwerUid", "==", userUid)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    setCloset({ ...doc.data(), id: doc.id });
  });
};

//getting items where closetceator Uid == userUid
const setMoreAsync = async () => {
  const q = query(
    collection(db, "clothing"),
    where("closetOwerUid", "==", userUid)
  );

  onSnapshot(q, (snapshot) => {
    let results = [];
    snapshot.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id });
    });
    setItems(results);
  });
};

//ADDING Categories
const handleClick = ({ values }) => {
  addDoc(collection(db, "shopping-lists"), {
    name: values.title,
    timestamp: new Date(),
  }).catch((err) => console.error(err));
}; //end of handleClick

//DELETE A DOC
async function deleteDocument(id) {
  let request = await deleteDoc(doc(db, "shopping-lists", id));
  console.log(request);
  navigation.navigate("feeds");
}

//UPDATE A DOC
// stupid me one for every field
async function updateDocument(id) {
  const itemRef = doc(db, "user", id);
  let name = prompt("What would you like to update it to?");
  setDoc(itemRef, {
    name: name,
    timestamp: new Date(),
  })
    .then(() => {
      console.log("Document successfully written!");
      navigation.goBack();
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

// OR

//UPDATE A DOC
// stupid me one for every field
async function updateDocument({ id, values }) {
  const itemRef = doc(db, "user", id);
  let name = prompt("What would you like to update it to?");
  setDoc(itemRef, {
    ...userData,
    uid: user.uid,
  })
    .then(() => {
      console.log("Document successfully written!");
      navigation.goBack();
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

// I will use this for filtering or searching
// const museums = query(collectionGroup(db, 'clothing'), where('type', '==', 'museum'));
// const querySnapshot = await getDocs(museums);
// querySnapshot.forEach((doc) => {
//     console.log(doc.id, ' => ', doc.data());
// });

// Fetch all the gategories
