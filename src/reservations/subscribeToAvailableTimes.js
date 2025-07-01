import { firebaseConfig } from "../firebaseConfigFile";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const subscribeToAvailableTimes = (restaurantId, date, cb) => {
    const callback = results => {
        const dateAvailabilityDoc = results.docs[0];
        if(dateAvailabilityDoc){
            cb({
                id: dateAvailabilityDoc.id,
                availableTimes: dateAvailabilityDoc.data().availableTimes
            });
        } else {
            cb({ id: '', availableTimes: [] });
        }
    }

    const dateRefs = collection(db, "dateAvailabilities");

    const q = query(dateRefs, where("restaurantId", "==", restaurantId), where("date", "==", date));

    return onSnapshot(q, callback);
}