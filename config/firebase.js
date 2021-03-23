import firebase from "firebase/app";
import config from "./config";

var firebaseConfig = {
  apiKey: config.firebaseConfig.apiKey,
  authDomain: "stashcash-bafd4.firebaseapp.com",
  projectId: "stashcash-bafd4",
  storageBucket: "stashcash-bafd4.appspot.com",
  messagingSenderId: "775000815627",
  appId: "1:775000815627:web:0b39144ba5118b0b67af0e",
  measurementId: "G-WG7JBQXJF3",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
