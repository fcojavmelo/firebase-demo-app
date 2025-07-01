import { getFirestore } from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";


export const getRecommendations = onCall(async () => {

    const store = getFirestore();

    const querySnapshot = await store.collection('restaurants')
        .limit(3)
        .get();

    const restaurants = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));

    return restaurants;

});