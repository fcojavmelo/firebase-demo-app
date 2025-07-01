import { firebaseConfig } from "../firebaseConfigFile";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import { getRestaurant } from "../restaurants/getRestaurant";
import { mapAsync } from "../util";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const subscribeToReservations = (userId, cb) => {

    const callback = async querySnapshot => {
        const reservations = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }));

        const populatedReservations = await mapAsync(reservations, async reservation => {
            const restaurant = await getRestaurant(reservation.restaurantId);
            return {
                ...reservation,
                restaurant,
            };
        });

        cb(populatedReservations);
    }

    const q = query(collection(db, "reservations"), where("userId", "==", userId));

    return onSnapshot(q, callback);
};