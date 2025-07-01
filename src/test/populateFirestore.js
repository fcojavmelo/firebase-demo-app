import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import { reservations, restaurants, dateAvailabilities, reviews } from './testData.js';

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
const db = getFirestore(app);

function populateCollection(collectionName, items) {
    return Promise.all(items.map(item => {
        const { id, ...data } = item;
        return setDoc(doc(db, collectionName, id), data);
                    
/*         db.collection(collectionName)
            .doc(id)
            .set(data); */
    }));
}

Promise.all([
    populateCollection('reservations', reservations),
    populateCollection('reviews', reviews),
    populateCollection('restaurants', restaurants),
    populateCollection('dateAvailabilities', dateAvailabilities)
])
    .then(() => {
        console.log('Done!');
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
    });