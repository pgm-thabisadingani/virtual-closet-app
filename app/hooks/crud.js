import { query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { db } from "../config";

// Get collection
export const getCollection = (collection) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([0]);
  const getClosetAsync = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, collection));
      onSnapshot(q, (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoading(false);
      });
    } catch (error) {
      setIsError(error);
    }
  };

  useEffect(() => {
    const unsubscribe = getClosetAsync();
    return () => unsubscribe;
  }, []);

  return { data, isLoading, isError };
};

// Get collection by its id
export const getCollectionById = ({ collection, fieldId, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const getCollectionAsync = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, collection), where(fieldId, "==", id));
      onSnapshot(q, (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setData(result);
        setIsLoading(false);
      });
    } catch (error) {
      setIsError(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = getCollectionAsync();
    return () => unsubscribe;
  }, []);

  console.log(` heeeeeeeee${data}`);

  return [data, isLoading, isError];
};
