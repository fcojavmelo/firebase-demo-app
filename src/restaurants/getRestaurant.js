import { firebaseConfig } from "../firebaseConfigFile";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getRestaurant = async id => {

    const restaurantDoc = await getDoc(doc(db, "restaurants", id));

    const restaurant = restaurantDoc.data();

    return {
        ...restaurant,
        id
    };
};