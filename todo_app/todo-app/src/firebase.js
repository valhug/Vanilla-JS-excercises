// src/firebase.js
import firebase, { initializeApp } from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC58bxQoGk1-rAAoqVXFQtu3FQ60-doefQ",
  authDomain: "todo-app-c79c1.firebaseapp.com",
  projectId: "todo-app-c79c1",
  storageBucket: "todo-app-c79c1.appspot.com",
  messagingSenderId: "1043400095340",
  appId: "1:1043400095340:web:c71aa0588d8d05037cca49",
  measurementId: "G-YF0EDCNNZJ"
};

firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig)
const db = firebase.firestore();


export { db };
