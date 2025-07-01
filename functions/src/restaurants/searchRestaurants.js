import { getFirestore } from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";


export const searchRestaurants = onCall(async (request) => {
    
    const { searchString } = request.data;

    const store = getFirestore();

    const querySnapshot = await store.collection('restaurants')
        .where('name', '==', searchString)
        .get();

    const restaurants = querySnapshot.docs.map(doc => ({

        ...doc.data(),
        id: doc.id

    }));

    return restaurants;

});