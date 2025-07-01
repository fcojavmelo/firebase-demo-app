import React from 'react';
import ReactDOM from 'react-dom';
//import * as firebase from 'firebase/app';
//import 'firebase/analytics';
import './index.css';
import { App, serviceWorker } from './app';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';


// Import the functions you need from the SDKs you need
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBUSwYdz1e1Piny0KAzcskYfO_OiIbmJw",
  authDomain: "fir-test-2506c.firebaseapp.com",
  databaseURL: "https://fir-test-2506c-default-rtdb.firebaseio.com",
  projectId: "fir-test-2506c",
  storageBucket: "fir-test-2506c.firebasestorage.app",
  messagingSenderId: "228190586337",
  appId: "1:228190586337:web:33c3521ca1e672723dbea0",
  measurementId: "G-V9HS8214LJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//run on local emulators:
const functions = getFunctions(app);
//connectFunctionsEmulator(functions, "127.0.0.1", 5001);

const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


// This is where the magic happens. React renders our App component
// inside the div with the id "root"
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
