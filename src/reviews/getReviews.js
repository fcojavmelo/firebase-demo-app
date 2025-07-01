import { firebaseConfig } from "../firebaseConfigFile";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { mapAsync } from "../util";
import { getUserInfo } from "../user";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getReviews = async restaurantId => {

    const reviewsRef = collection(db, 'reviews');
    
    const q = query(reviewsRef, where('restaurantId', '==', restaurantId));

    const querySnapshot = await getDocs(q);

    const reviews = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));

    const populatedReviews = await mapAsync(reviews, async review => {
        const author = await getUserInfo(review.userId);
        return {
            ...review,
            author
        };
    });

    return populatedReviews;
};