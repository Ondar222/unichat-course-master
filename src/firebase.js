import firebase from "firebase/app";
import "firebase/auth";

export const auth=  firebase.initializeApp ({
    apiKey: "AIzaSyCT3ckveFp8YR8zturTkqaxJrLm4IEIHbs",
    authDomain: "unichat-42b4c.firebaseapp.com",
    projectID: "unichat-42b4c",
    storageBucket: "unichat-42b4c.appspot.com",
    messagingSenderId: "789483432307",
    appId: "1:789483432307:web:061b727a21c6637f40bd06"
  }).auth();